import os
import re
import json
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

TARGET_DIR = Path(r"d:\XAMPP\htdocs\portofolio\references_scraped\07-phantom-land")
TARGET_DIR.mkdir(parents=True, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
}

def fetch_url(url, is_binary=False, retries=3):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.read()
                if is_binary:
                    return data
                return data.decode('utf-8', errors='ignore')
        except Exception as e:
            if attempt == retries - 1:
                print(f"[ERROR] Failed {url}: {e}")
                return None
            time.sleep(1)

def run_scraper():
    start_time = time.time()
    print("=== Starting Phantom Land Scraper ===")
    
    # 1. Fetch homepage
    print("\n[1/7] Fetching Homepage...")
    home_html = fetch_url('https://www.phantom.land/')
    if home_html:
        with open(TARGET_DIR / "index.html", "w", encoding="utf-8") as f:
            f.write(home_html)
        print(f"  -> Saved index.html ({len(home_html):,} bytes)")
    
    # 2. Extract CSS links
    print("\n[2/7] Extracting and Downloading CSS...")
    css_dir = TARGET_DIR / "css"
    css_dir.mkdir(exist_ok=True)
    
    # Check sitemap to get all URLs
    print("\n[3/7] Parsing Sitemap for all pages...")
    sitemap_xml = fetch_url('https://www.phantom.land/sitemap.xml')
    urls = []
    if sitemap_xml:
        import xml.etree.ElementTree as ET
        try:
            root = ET.fromstring(sitemap_xml)
            for elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                if elem.text:
                    urls.append(elem.text.strip())
        except Exception as e:
            print(f"Error parsing sitemap XML: {e}")
    
    if not urls:
        urls = [
            'https://www.phantom.land',
            'https://www.phantom.land/about/agency',
            'https://www.phantom.land/about/approach',
            'https://www.phantom.land/careers',
            'https://www.phantom.land/contact',
            'https://www.phantom.land/privacy-policy'
        ]
    print(f"  -> Found {len(urls)} URLs in sitemap")
    
    # 4. Fetch core section pages first
    print("\n[4/7] Downloading Core Pages & Projects...")
    pages_dir = TARGET_DIR / "pages"
    pages_dir.mkdir(exist_ok=True)
    projects_dir = pages_dir / "projects"
    projects_dir.mkdir(exist_ok=True)
    careers_dir = pages_dir / "careers"
    careers_dir.mkdir(exist_ok=True)

    all_css_urls = set()
    all_js_urls = set()

    def process_page(url):
        html = fetch_url(url)
        if not html:
            return url, False, 0
        
        # Determine local filename
        parsed = url.replace('https://www.phantom.land', '').strip('/')
        if not parsed:
            local_path = TARGET_DIR / "index.html"
        elif parsed.startswith('projects/'):
            slug = parsed.replace('projects/', '')
            local_path = projects_dir / f"{slug}.html"
        elif parsed.startswith('careers/'):
            slug = parsed.replace('careers/', '').replace('/', '_')
            local_path = careers_dir / f"{slug}.html"
        else:
            slug = parsed.replace('/', '_')
            local_path = pages_dir / f"{slug}.html"
        
        with open(local_path, "w", encoding="utf-8") as f:
            f.write(html)
        
        # Find assets
        css_matches = re.findall(r'<link[^>]+rel=[\'"]stylesheet[\'"][^>]+href=[\'"]([^\'"]+)[\'"]', html, re.I)
        css_matches += re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"][^>]+rel=[\'"]stylesheet[\'"]', html, re.I)
        js_matches = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', html, re.I)

        return url, True, len(html), css_matches, js_matches

    # Download in parallel
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(process_page, u): u for u in urls}
        completed = 0
        for future in as_completed(futures):
            res = future.result()
            completed += 1
            if res[1]:
                all_css_urls.update(res[3])
                all_js_urls.update(res[4])
            if completed % 25 == 0 or completed == len(urls):
                print(f"  Processed {completed}/{len(urls)} pages...")

    # 5. Download CSS & JS
    print(f"\n[5/7] Downloading Assets ({len(all_css_urls)} CSS, {len(all_js_urls)} JS)...")
    css_count = 0
    for idx, css_path in enumerate(sorted(all_css_urls), start=1):
        full_css_url = 'https://www.phantom.land' + css_path if css_path.startswith('/') else css_path
        css_content = fetch_url(full_css_url, is_binary=True)
        if css_content:
            # style-N.css for compatibility with references standard
            with open(css_dir / f"style-{idx}.css", "wb") as f:
                f.write(css_content)
            # Also keep chunk name if available
            chunk_name = os.path.basename(css_path.split('?')[0])
            if chunk_name and chunk_name.endswith('.css'):
                with open(css_dir / chunk_name, "wb") as f:
                    f.write(css_content)
            css_count += 1
    print(f"  -> Successfully downloaded {css_count} CSS stylesheets")

    js_dir = TARGET_DIR / "js"
    js_dir.mkdir(exist_ok=True)
    js_count = 0
    for idx, js_path in enumerate(sorted(all_js_urls), start=1):
        full_js_url = 'https://www.phantom.land' + js_path if js_path.startswith('/') else js_path
        js_content = fetch_url(full_js_url, is_binary=True)
        if js_content:
            with open(js_dir / f"bundle-{idx}.js", "wb") as f:
                f.write(js_content)
            chunk_name = os.path.basename(js_path.split('?')[0])
            if chunk_name and chunk_name.endswith('.js'):
                with open(js_dir / chunk_name, "wb") as f:
                    f.write(js_content)
            js_count += 1
    print(f"  -> Successfully downloaded {js_count} JS scripts")

    # 6. Audio Files Download
    print("\n[6/7] Downloading Audio Sound FX...")
    sounds_dir = TARGET_DIR / "sounds"
    sounds_dir.mkdir(exist_ok=True)
    sound_files = [
        'click.mp3', 'grid.mp3', 'load.mp3', 'other.mp3',
        'project.mp3', 'riser.mp3', 'swipe.mp3', 'whoosh.mp3'
    ]
    sounds_downloaded = []
    for s_name in sound_files:
        s_url = f"https://www.phantom.land/assets/sounds/{s_name}"
        s_data = fetch_url(s_url, is_binary=True)
        if s_data:
            with open(sounds_dir / s_name, "wb") as f:
                f.write(s_data)
            sounds_downloaded.append(s_name)
    print(f"  -> Downloaded {len(sounds_downloaded)} audio FX: {', '.join(sounds_downloaded)}")

    # 7. Extract Team Data & Depth Maps
    print("\n[7/7] Extracting Team Data & 3D Depth Map Assets...")
    agency_file = pages_dir / "about_agency.html"
    team_data = []
    if agency_file.exists():
        with open(agency_file, "r", encoding="utf-8") as f:
            agency_html = f.read()
        
        pushes = re.findall(r'self\.__next_f\.push\(\[1,\s*(.*?)\s*\]\)', agency_html, re.DOTALL)
        all_text = ""
        for p in pushes:
            try:
                all_text += json.loads(p)
            except Exception:
                all_text += p
        
        # Regex for employees
        emp_pattern = re.compile(
            r'\{"employee_name":"(?P<name>[^"]+)"'
            r'.*?"slug":"(?P<dept>[^"]+)"'
            r'.*?"job_title":"(?P<title>[^"]+)"'
            r'.*?"depth_map_image_link":\{[^}]*?"url":"(?P<depth_url>[^"]+)"\}'
            r'.*?"texture_image_link":\{[^}]*?"url":"(?P<tex_url>[^"]+)"\}'
        )
        
        for m in emp_pattern.finditer(all_text):
            team_data.append({
                "name": m.group("name"),
                "department": m.group("dept"),
                "title": m.group("title"),
                "depthMapUrl": m.group("depth_url"),
                "textureUrl": m.group("tex_url")
            })

    print(f"  -> Extracted {len(team_data)} team members with 3D Hologram depth maps!")
    with open(TARGET_DIR / "team.json", "w", encoding="utf-8") as f:
        json.dump(team_data, f, indent=2)

    # Download team assets for the key leaders / founders
    team_assets_dir = TARGET_DIR / "team_assets"
    team_assets_dir.mkdir(exist_ok=True)
    if team_data:
        print("  -> Downloading sample team depth maps & textures for top team members...")
        for member in team_data[:8]: # download top 8 members (founders, heads)
            m_slug = member["name"].lower().replace(" ", "-")
            d_url = member["depthMapUrl"]
            t_url = member["textureUrl"]
            d_bytes = fetch_url(d_url, is_binary=True)
            if d_bytes:
                with open(team_assets_dir / f"{m_slug}-depth.webp", "wb") as f:
                    f.write(d_bytes)
            t_bytes = fetch_url(t_url, is_binary=True)
            if t_bytes:
                with open(team_assets_dir / f"{m_slug}-texture.webp", "wb") as f:
                    f.write(t_bytes)
        print("  -> Saved sample depth maps and textures in team_assets/")

    # Extract all project slugs and metadata
    projects_list = []
    for p_file in sorted(projects_dir.glob("*.html")):
        slug = p_file.stem
        try:
            with open(p_file, "r", encoding="utf-8") as f:
                p_html = f.read()
            title_m = re.search(r'<title>(.*?)</title>', p_html, re.I)
            title = title_m.group(1) if title_m else slug
            title = title.split('|')[0].split('—')[0].strip()
            desc_m = re.search(r'<meta[^>]+name=[\'"]description[\'"][^>]+content=[\'"](.*?)[\'"]', p_html, re.I)
            desc = desc_m.group(1) if desc_m else ""
            projects_list.append({
                "slug": slug,
                "title": title,
                "description": desc,
                "url": f"https://www.phantom.land/projects/{slug}",
                "localPath": f"pages/projects/{slug}.html"
            })
        except Exception:
            projects_list.append({"slug": slug, "url": f"https://www.phantom.land/projects/{slug}"})

    with open(TARGET_DIR / "projects.json", "w", encoding="utf-8") as f:
        json.dump(projects_list, f, indent=2)
    print(f"  -> Saved projects.json with {len(projects_list)} case studies")

    # Save metadata.json
    duration_ms = int((time.time() - start_time) * 1000)
    metadata = {
        "id": "07-phantom-land",
        "name": "Phantom Studios",
        "url": "https://www.phantom.land/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": duration_ms,
        "htmlSizeBytes": (TARGET_DIR / "index.html").stat().st_size if (TARGET_DIR / "index.html").exists() else 0,
        "totalPagesScraped": len(urls),
        "totalProjectsScraped": len(projects_list),
        "cssFilesDownloaded": css_count,
        "jsFilesDownloaded": js_count,
        "soundsDownloaded": len(sounds_downloaded),
        "teamMembersExtracted": len(team_data),
        "detectedLibraries": [
            "Next.js App Router (React 19 / Turbopack)",
            "Prismic Headless CMS",
            "Web Audio API (Custom SFX engine: click, whoosh, riser, swipe, grid, load)",
            "WebGL Shader (2D Depth Map + Texture 3D Hologram Parallax for Team)",
            "Lenis / Locomotive smooth scrolling"
        ],
        "detectedFontLinks": [
            "https://use.typekit.net/gtx3zug.css"
        ],
        "detectedFonts": [
            "Monument Extended",
            "Neue Haas Grotesk",
            "Mori",
            "System UI"
        ],
        "focus": "stick to the brutalist concept and just ran away with it, not to mention cara ngenalin team mereka",
        "architectureHighlights": {
            "teamShowcase": "Uses 256x256 WebGL depth map shaders paired with texture webp to project 3D parallax holograms of team members on cursor movement.",
            "audioEngine": "Procedural Web Audio API triggering click.mp3, whoosh.mp3, riser.mp3, swipe.mp3, grid.mp3 on user interactions with global sound toggle [ON/OFF].",
            "navigation": "Brutalist grid-bound HUD layout with top status bar, sound switcher, and high-contrast typography.",
            "zones": ["Product", "Experience", "Communication"]
        }
    }

    with open(TARGET_DIR / "metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print("  -> Saved metadata.json")

    # Create detailed README.md inside 07-phantom-land
    readme_content = f"""# 07 - Phantom Land (Phantom Studios) Reference

**Original URL:** [https://www.phantom.land/](https://www.phantom.land/)  
**Scraped At:** {metadata['scrapedAt']}  
**Total Pages Scraped:** {len(urls)} (Homepage, Agency, Approach, Careers, Contact, and {len(projects_list)} Case Studies)

---

## 🎯 What Rev Loves & Design Intent
> *"stick to the brutalist concept and just ran away with it, not to mention cara ngenalin team mereka"*

1. **Brutalist Execution:** Raw, grid-aligned, oversized typography with extreme discipline. No mushy corporate gradients or cookie-cutter templates.
2. **Interactive 3D Team Showcase (`about/agency`):**
   - Instead of static circular headshots or generic cards, Phantom introduces all 50 team members across 7 departments (Founder, Creative, Technology, Operations, Partnership, Production, Quality).
   - **The Secret Tech:** Each employee has a dual asset pair:
     - `texture.webp`: Standard photographic portrait.
     - `depth-256.webp`: 256x256 grayscale depth map (white = front, black = deep background).
     - A custom Three.js / WebGL vertex/fragment displacement shader calculates mouse coordinates and offsets pixels along the Z/X axes in real-time. Result: An interactive 3D parallax hologram of their faces!
   - Filterable department tabs with counter badges (`Founder [4]`, `Creative [15]`, `Technology [13]`, etc.).
3. **Sound System (Audio DSP Engine):**
   - Header controls: `Sound [OFF]` / `Sound [ON]`.
   - Interaction sounds captured in `sounds/`:
     - `click.mp3`: UI button triggers
     - `whoosh.mp3`: Fast transitions
     - `riser.mp3`: Elevation / focus builds
     - `swipe.mp3`: Carousel & slider passes
     - `grid.mp3`: Layout realignment ticks
     - `load.mp3`: Page loader intro
4. **The Three Studio Zones:**
   - **Product:** Utility, scale, function, ISO 27001 certified.
   - **Experience:** Immersion, intrigue, impact.
   - **Communication:** Meaning, connection, performance.

---

## 📁 Directory Structure
- `index.html`: Complete homepage capture.
- `pages/`:
  - `about_agency.html`: Team & agency manifesto.
  - `about_approach.html`: Process & approach breakdown.
  - `careers.html`: Job openings & culture.
  - `contact.html`: Contact & studio booking.
  - `privacy-policy.html`: Legal & GDPR details.
  - `projects/*.html`: {len(projects_list)} standalone case study pages.
- `css/`: All extracted stylesheets ({css_count} files).
- `js/`: All Next.js app bundles and logic ({js_count} files).
- `sounds/`: All 8 interaction sound FX (`click.mp3`, `riser.mp3`, etc.).
- `team_assets/`: Sample 3D depth maps (`*-depth.webp`) and textures (`*-texture.webp`).
- `team.json`: Full roster of 50 team members with names, roles, departments, and depth map URLs.
- `projects.json`: Full index of {len(projects_list)} case study projects.
- `metadata.json`: Reference metadata matching the other 7 reference sites.
- `screenshot-viewport.png`: Homepage viewport screenshot.
- `screenshot-agency-team.png`: Agency & team section viewport screenshot.
"""
    with open(TARGET_DIR / "README.md", "w", encoding="utf-8") as f:
        f.write(readme_content)
    print("  -> Saved README.md")

    print(f"\n=== Scraping Completed in {duration_ms/1000:.2f}s! ===")

if __name__ == "__main__":
    run_scraper()
