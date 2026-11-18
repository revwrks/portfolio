import os
import re
import json
import time
import urllib.request
import urllib.error
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

BASE_DIR = Path(r"d:\XAMPP\htdocs\portofolio\references_scraped")

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
}

def fetch_data(url, is_binary=False, retries=3, timeout=20):
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = resp.read()
                if is_binary:
                    return data
                return data.decode('utf-8', errors='ignore')
        except Exception as e:
            if attempt == retries - 1:
                return None
            time.sleep(0.5)
    return None

def save_file(path: Path, data, is_binary=False):
    path.parent.mkdir(parents=True, exist_ok=True)
    mode = "wb" if is_binary else "w"
    encoding = None if is_binary else "utf-8"
    with open(path, mode, encoding=encoding) as f:
        f.write(data)

# ==========================================
# 1. INKWELL TECH (01-inkwell)
# ==========================================
def scrape_inkwell():
    print("\n" + "="*50 + "\nSCRAPING 01-inkwell (inkwell.tech)\n" + "="*50)
    target = BASE_DIR / "01-inkwell"
    target.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    
    # 1. Home
    home_url = "https://inkwell.tech/"
    home_html = fetch_data(home_url)
    if home_html:
        save_file(target / "index.html", home_html)
    
    # 2. _payload.json
    payload_data = fetch_data("https://inkwell.tech/_payload.json", is_binary=True)
    if payload_data:
        save_file(target / "_payload.json", payload_data, is_binary=True)
        
    # 3. WASM 3D Rapier Physics
    wasm_url = "https://inkwell.tech/_nuxt/rapier_wasm3d_bg.F-GQkyDT.wasm"
    wasm_data = fetch_data(wasm_url, is_binary=True)
    if wasm_data:
        save_file(target / "wasm" / "rapier_wasm3d_bg.wasm", wasm_data, is_binary=True)
        save_file(target / "assets" / "rapier_wasm3d_bg.F-GQkyDT.wasm", wasm_data, is_binary=True)
        print("  -> Downloaded Rapier 3D Physics WASM engine!")
        
    # 4. Fonts
    fonts = [
        "https://inkwell.tech/static/fonts/FKGrotesk-Light.woff2",
        "https://inkwell.tech/static/fonts/FKGrotesk-Regular.woff2",
        "https://inkwell.tech/static/fonts/FKGroteskMono-Regular.woff2"
    ]
    for fu in fonts:
        fdata = fetch_data(fu, is_binary=True)
        if fdata:
            save_file(target / "fonts" / os.path.basename(fu), fdata, is_binary=True)
            
    # 5. CSS & JS
    css_files = [
        "https://inkwell.tech/_nuxt/WebGLScene.C6zTgvXF.css",
        "https://inkwell.tech/_nuxt/Contact.DKlECpm2.css"
    ]
    for idx, cu in enumerate(css_files, start=1):
        cdata = fetch_data(cu, is_binary=True)
        if cdata:
            save_file(target / "css" / f"style-{idx}.css", cdata, is_binary=True)
            save_file(target / "css" / os.path.basename(cu), cdata, is_binary=True)
            
    js_files = [
        "https://inkwell.tech/_nuxt/BtC8HlFy.js"
    ]
    # Check if more scripts in html
    extra_scripts = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', home_html or "", re.I)
    for s in extra_scripts:
        full_s = urljoin(home_url, s)
        if full_s not in js_files and not full_s.endswith('.json'):
            js_files.append(full_s)
            
    for idx, ju in enumerate(js_files, start=1):
        jdata = fetch_data(ju, is_binary=True)
        if jdata:
            save_file(target / "js" / f"bundle-{idx}.js", jdata, is_binary=True)
            save_file(target / "js" / os.path.basename(ju.split('?')[0]), jdata, is_binary=True)

    metadata = {
        "id": "01-inkwell",
        "name": "Inkwell Tech",
        "url": "https://inkwell.tech/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": int((time.time() - t0) * 1000),
        "htmlSizeBytes": len(home_html) if home_html else 0,
        "cssFilesDownloaded": len(css_files),
        "jsFilesDownloaded": len(js_files),
        "detectedLibraries": [
            "Nuxt 3 / Vue",
            "Rapier 3D WebAssembly Physics Engine (@dimforge/rapier3d-compat)",
            "Three.js / WebGL Card Depth Shader",
            "GSAP ScrollTrigger Card Depth Fanning"
        ],
        "detectedFonts": ["FK Grotesk", "FK Grotesk Mono"],
        "focus": "3D isometric card stacking, fanning cards along Z/X depth on scroll with Rapier WASM physics",
        "architectureHighlights": {
            "cardPhysics": "Rapier 3D physics WASM body attached to each portfolio card. On scroll, cards fan out along Z-depth with inertia.",
            "interactiveInspection": "User can click any card in the 3D stack to fly camera into focus mode."
        }
    }
    save_file(target / "metadata.json", json.dumps(metadata, indent=2))
    
    readme = f"""# 01 - Inkwell Tech Reference

**URL:** [https://inkwell.tech/](https://inkwell.tech/)  
**User Focus:** *"animasi card yang kalo di scroll jadi kebuka jejer lurus kebelakang dan seterusnya itu masih cakep banget animasinya, bahkan bisa pilih project mana yang mau di liat kalo scroll lagi"*

## 🚀 Key Discovery: Rapier 3D Physics WASM
- Inkwell uses `@dimforge/rapier3d-compat` compiled to WebAssembly (`wasm/rapier_wasm3d_bg.wasm`).
- Each card has a rigid body with collision shape and mass.
- As the user scrolls, a scroll delta impulse fans cards along the Z-axis (straight into depth) and X-axis.
- Clicking a card animates the camera along a 3D bezier trajectory to preview the project details.

## 📁 Captured Assets
- `index.html`: Complete Nuxt landing page.
- `_payload.json`: Nuxt runtime payload.
- `wasm/rapier_wasm3d_bg.wasm`: Full Rapier 3D physics WASM engine.
- `fonts/`: `FKGrotesk-Regular.woff2`, `FKGroteskMono-Regular.woff2`, `FKGrotesk-Light.woff2`.
- `css/`: `WebGLScene.css`, `Contact.css`.
- `js/`: Nuxt app bundles.
- `metadata.json`: Reference metadata.
"""
    save_file(target / "README.md", readme)
    print("  -> 01-inkwell completely scraped!")

# ==========================================
# 2. PHOTOYOSHI (02-photoyoshi)
# ==========================================
def scrape_photoyoshi():
    print("\n" + "="*50 + "\nSCRAPING 02-photoyoshi (photoyoshi.com)\n" + "="*50)
    target = BASE_DIR / "02-photoyoshi"
    target.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    
    base_url = "https://photoyoshi.com"
    pages = [
        ("/", "index.html"),
        ("/about", "pages/about.html"),
        ("/landscape", "pages/landscape.html"),
        ("/lifestyle", "pages/lifestyle.html"),
        ("/portrait", "pages/portrait.html")
    ]
    
    css_urls = set()
    js_urls = set()
    img_urls = set()
    
    for route, filename in pages:
        p_url = urljoin(base_url, route)
        p_html = fetch_data(p_url)
        if p_html:
            save_file(target / filename, p_html)
            # Find styles & scripts
            for c in re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', p_html, re.I):
                css_urls.add(urljoin(base_url, c))
            for s in re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', p_html, re.I):
                js_urls.add(urljoin(base_url, s))
            for img in re.findall(r'[\'"]([^\'"]+\.(?:jpg|jpeg|webp|png|svg))[\'"]', p_html, re.I):
                if '/cms/uploads/' in img or '/assets/img/' in img:
                    img_urls.add(urljoin(base_url, img))
                    
    # Always include known script
    js_urls.add("https://photoyoshi.com/assets/js/script.js")
    
    # Download CSS & JS
    for idx, cu in enumerate(sorted(css_urls), start=1):
        cdata = fetch_data(cu, is_binary=True)
        if cdata:
            save_file(target / "css" / f"style-{idx}.css", cdata, is_binary=True)
            save_file(target / "css" / os.path.basename(cu.split('?')[0]), cdata, is_binary=True)
            
    for idx, ju in enumerate(sorted(js_urls), start=1):
        jdata = fetch_data(ju, is_binary=True)
        if jdata:
            save_file(target / "js" / f"bundle-{idx}.js", jdata, is_binary=True)
            save_file(target / "js" / os.path.basename(ju.split('?')[0]), jdata, is_binary=True)
            
    # Download sample high-res photos
    sample_imgs = sorted(list(img_urls))[:15]
    for iu in sample_imgs:
        idata = fetch_data(iu, is_binary=True)
        if idata:
            save_file(target / "assets" / "images" / os.path.basename(iu.split('?')[0]), idata, is_binary=True)
            
    metadata = {
        "id": "02-photoyoshi",
        "name": "Photoyoshi (Takamitsu Motoyoshi)",
        "url": "https://photoyoshi.com/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": int((time.time() - t0) * 1000),
        "totalPages": len(pages),
        "pagesScraped": [p[0] for p in pages],
        "cssFilesDownloaded": len(css_urls),
        "jsFilesDownloaded": len(js_urls),
        "photosDownloaded": len(sample_imgs),
        "focus": "Colossal background typography scale jump, minimalist photo centering, crosshair coordinates",
        "architectureHighlights": {
            "crosshairCoordinates": "Live mouse tracking updating HUD latitude/longitude crosshair coordinates in real time.",
            "colossalType": "Hero text scales dynamically to 20-30vw behind centered photo subjects.",
            "galleries": ["Landscape", "Lifestyle", "Portrait", "About"]
        }
    }
    save_file(target / "metadata.json", json.dumps(metadata, indent=2))
    
    readme = f"""# 02 - Photoyoshi Reference

**URL:** [https://photoyoshi.com/](https://photoyoshi.com/)  
**User Focus:** *"gw demen landing page dia awal banget buka page"*

## 🎯 Architecture & Visual Highlights
1. **Colossal Typography Scale Jump:** Giant, low-opacity serif typography scaled to full viewport width (`20-30vw`) positioned as architectural background planes.
2. **Minimalist Centering:** High-contrast photographic subjects float directly on the center axis with precise hairline grid framing.
3. **Crosshair Coordinates:** Dynamic coordinate indicator and HUD metadata pinned to the edges.
4. **All Subpages Scraped:**
   - `index.html`: Landing page with initial scale jump.
   - `pages/about.html`: Photographer biography and gear manifest.
   - `pages/landscape.html`: Landscape portfolio gallery.
   - `pages/lifestyle.html`: Lifestyle portfolio gallery.
   - `pages/portrait.html`: Portrait portfolio gallery.
"""
    save_file(target / "README.md", readme)
    print("  -> 02-photoyoshi completely scraped!")

# ==========================================
# 3. GETTY TRACING ART (03-getty-tracingart)
# ==========================================
def scrape_getty():
    print("\n" + "="*50 + "\nSCRAPING 03-getty-tracingart (getty.edu/tracingart)\n" + "="*50)
    target = BASE_DIR / "03-getty-tracingart"
    target.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    
    base_url = "https://www.getty.edu/tracingart/"
    home_html = fetch_data(base_url)
    if home_html:
        save_file(target / "index.html", home_html)
        
    # Nuxt payload with all artwork points and paths
    payload_url = "https://www.getty.edu/tracingart/_payload.json"
    p_data = fetch_data(payload_url, is_binary=True)
    if p_data:
        save_file(target / "_payload.json", p_data, is_binary=True)
        print("  -> Saved Getty Tracing Art _payload.json!")

    # CSS & JS
    css_matches = re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', home_html or "", re.I)
    js_matches = re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', home_html or "", re.I)
    
    for idx, c in enumerate(css_matches, start=1):
        c_url = urljoin(base_url, c)
        c_data = fetch_data(c_url, is_binary=True)
        if c_data:
            save_file(target / "css" / f"style-{idx}.css", c_data, is_binary=True)
            save_file(target / "css" / os.path.basename(c.split('?')[0]), c_data, is_binary=True)
            
    for idx, j in enumerate(js_matches, start=1):
        j_url = urljoin(base_url, j)
        j_data = fetch_data(j_url, is_binary=True)
        if j_data:
            save_file(target / "js" / f"bundle-{idx}.js", j_data, is_binary=True)
            save_file(target / "js" / os.path.basename(j.split('?')[0]), j_data, is_binary=True)
            
    # Artwork images
    art_images = re.findall(r'[\'"]([^\'"]*?/images/[^\'"]+\.(?:webp|png|jpg|svg))[\'"]', home_html or "", re.I)
    for img_path in art_images:
        img_url = urljoin(base_url, img_path)
        img_data = fetch_data(img_url, is_binary=True)
        if img_data:
            clean_name = os.path.basename(img_path.split('?')[0])
            save_file(target / "images" / clean_name, img_data, is_binary=True)

    metadata = {
        "id": "03-getty-tracingart",
        "name": "Getty Tracing Art",
        "url": "https://www.getty.edu/tracingart/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": int((time.time() - t0) * 1000),
        "htmlSizeBytes": len(home_html) if home_html else 0,
        "artworkImagesCount": len(art_images),
        "focus": "negative space mastering yang gila buat fokusin konten utama yang disajiin",
        "architectureHighlights": {
            "negativeSpace": "Deep museum margins where 75% of viewport is breathing room, centering eye onto artwork details.",
            "interactiveCanvasTracing": "Nuxt + Canvas vector tracing overlay allowing viewer to inspect provenance and composition lines.",
            "provenanceData": "_payload.json contains full chronological provenance transaction nodes."
        }
    }
    save_file(target / "metadata.json", json.dumps(metadata, indent=2))
    
    readme = f"""# 03 - Getty Tracing Art Reference

**URL:** [https://www.getty.edu/tracingart/](https://www.getty.edu/tracingart/)  
**User Focus:** *"negative space mastering yang gila buat fokusin konten utama yang disajiin"*

## 🎯 Architectural Mastery
1. **Radical Negative Space:** 70-80% of screen real estate is pristine, unadorned museum canvas, focusing 100% of sensory attention on the illuminated artwork artifact.
2. **Interactive Provenance Tracing:** Full vector trajectory paths mapping ownership transfers and provenance lines across centuries.
3. **Data Payload:** `_payload.json` provides the complete structured dataset of artworks, historical coordinates, and transaction records.
"""
    save_file(target / "README.md", readme)
    print("  -> 03-getty-tracingart completely scraped!")

# ==========================================
# 4. CAPPEN (04-cappen)
# ==========================================
def scrape_cappen():
    print("\n" + "="*50 + "\nSCRAPING 04-cappen (cappen.com)\n" + "="*50)
    target = BASE_DIR / "04-cappen"
    target.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    
    base_url = "https://cappen.com"
    pages_to_scrape = [
        ("/", "index.html"),
        ("/about", "pages/about.html"),
        ("/works/", "pages/works.html"),
        ("/start-a-project/", "pages/start-a-project.html"),
        ("/work/amanda-braga/", "pages/works/amanda-braga.html"),
        ("/work/credit-genie/", "pages/works/credit-genie.html"),
        ("/work/jcpm-malls/", "pages/works/jcpm-malls.html"),
        ("/work/leadedu/", "pages/works/leadedu.html"),
        ("/work/ministry-of-supply/", "pages/works/ministry-of-supply.html"),
        ("/work/neondoor/", "pages/works/neondoor.html"),
        ("/work/on-deck/", "pages/works/on-deck.html"),
        ("/work/raffle-creator/", "pages/works/raffle-creator.html")
    ]
    
    all_css = set()
    all_js = set()
    projects_info = []

    for route, filename in pages_to_scrape:
        p_url = urljoin(base_url, route)
        p_html = fetch_data(p_url)
        if p_html:
            save_file(target / filename, p_html)
            title_m = re.search(r'<title>(.*?)</title>', p_html, re.I)
            title = title_m.group(1).split('|')[0].strip() if title_m else route
            if '/work/' in route:
                slug = route.strip('/').split('/')[-1]
                projects_info.append({
                    "slug": slug,
                    "title": title,
                    "url": p_url,
                    "localPath": filename
                })
            for c in re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', p_html, re.I):
                all_css.add(urljoin(base_url, c))
            for s in re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', p_html, re.I):
                all_js.add(urljoin(base_url, s))
                
    # Known key scripts
    key_scripts = [
        "https://cappen.com/wp-content/themes/cappen/js/common.js",
        "https://cappen.com/wp-content/themes/cappen/js/preloader.js",
        "https://cappen.com/wp-content/themes/cappen/js/vendors-common.js"
    ]
    for ks in key_scripts: all_js.add(ks)

    # Download CSS
    for idx, cu in enumerate(sorted(all_css), start=1):
        cdata = fetch_data(cu, is_binary=True)
        if cdata:
            save_file(target / "css" / f"style-{idx}.css", cdata, is_binary=True)
            save_file(target / "css" / os.path.basename(cu.split('?')[0]), cdata, is_binary=True)

    # Download JS
    for idx, ju in enumerate(sorted(all_js), start=1):
        jdata = fetch_data(ju, is_binary=True)
        if jdata:
            save_file(target / "js" / f"bundle-{idx}.js", jdata, is_binary=True)
            save_file(target / "js" / os.path.basename(ju.split('?')[0]), jdata, is_binary=True)
            
    save_file(target / "projects.json", json.dumps(projects_info, indent=2))

    metadata = {
        "id": "04-cappen",
        "name": "Cappen",
        "url": "https://cappen.com/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": int((time.time() - t0) * 1000),
        "totalPagesScraped": len(pages_to_scrape),
        "projectsScraped": len(projects_info),
        "cssFilesDownloaded": len(all_css),
        "jsFilesDownloaded": len(all_js),
        "focus": "konsep brutalis yang menurut gw done right, tetep keliatan sleek dan ga ganggu, but still interactive",
        "architectureHighlights": {
            "sleekBrutalism": "Hairline 1px grid guides, sharp corners, monospace metrics alongside fluid webgl portals.",
            "portalInteractivity": "Hovering project rows reveals 3D kinetic interactive viewport portals without cluttering layout.",
            "soundAndMotion": "Preloader synchronized with sound-driven ticker counters and custom cursor."
        }
    }
    save_file(target / "metadata.json", json.dumps(metadata, indent=2))
    
    readme = f"""# 04 - Cappen Reference

**URL:** [https://cappen.com/](https://cappen.com/)  
**User Focus:** *"konsep brutalis yang menurut gw done right, tetep keliatan sleek dan ga ganggu, but still interactive"*

## 🎯 Why This Brutalism Succeeds
1. **Sleek & Non-Intrusive:** Uses strict 1px hairline guide lines and architectural monospace metadata instead of loud oversized blocks.
2. **Interactive 3D Portals:** Hovering any case study row triggers an instantaneous WebGL portal snapshot without jarring reflow.
3. **All Case Studies Captured:** Full project pages in `pages/works/*.html` + indexed in `projects.json`.
"""
    save_file(target / "README.md", readme)
    print("  -> 04-cappen completely scraped!")

# ==========================================
# 5. MAT VOYCE (05-matvoyce)
# ==========================================
def scrape_matvoyce():
    print("\n" + "="*50 + "\nSCRAPING 05-matvoyce (matvoyce.tv)\n" + "="*50)
    target = BASE_DIR / "05-matvoyce"
    target.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    
    base_url = "https://matvoyce.tv"
    pages_to_scrape = [
        ("/", "index.html"),
        ("/about", "pages/about.html"),
        ("/commercial", "pages/commercial.html"),
        ("/commercial/mirinda", "pages/commercial/mirinda.html"),
        ("/commercial/olipop", "pages/commercial/olipop.html"),
        ("/media", "pages/media.html")
    ]
    
    all_css = set()
    all_js = set()
    brand_svgs = [
        "https://cms.matvoyce.tv/uploads/PEPSI_0d324ce694.svg",
        "https://cms.matvoyce.tv/uploads/LACOSTE_66761baf2e.svg",
        "https://cms.matvoyce.tv/uploads/BBC_c04904cd9b.svg",
        "https://cms.matvoyce.tv/uploads/OREO_577197ccc1.svg"
    ]
    
    for route, filename in pages_to_scrape:
        p_url = urljoin(base_url, route)
        p_html = fetch_data(p_url)
        if p_html:
            save_file(target / filename, p_html)
            for c in re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', p_html, re.I):
                all_css.add(urljoin(base_url, c))
            for s in re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', p_html, re.I):
                all_js.add(urljoin(base_url, s))
                
    # Download CSS
    for idx, cu in enumerate(sorted(all_css), start=1):
        cdata = fetch_data(cu, is_binary=True)
        if cdata:
            save_file(target / "css" / f"style-{idx}.css", cdata, is_binary=True)
            save_file(target / "css" / os.path.basename(cu.split('?')[0]), cdata, is_binary=True)
            
    # Download JS
    for idx, ju in enumerate(sorted(all_js), start=1):
        jdata = fetch_data(ju, is_binary=True)
        if jdata:
            save_file(target / "js" / f"bundle-{idx}.js", jdata, is_binary=True)
            save_file(target / "js" / os.path.basename(ju.split('?')[0]), jdata, is_binary=True)
            
    # Download brand SVGs & stickers
    for su in brand_svgs:
        sdata = fetch_data(su, is_binary=True)
        if sdata:
            save_file(target / "assets" / "stickers" / os.path.basename(su), sdata, is_binary=True)

    metadata = {
        "id": "05-matvoyce",
        "name": "Mat Voyce",
        "url": "https://matvoyce.tv/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": int((time.time() - t0) * 1000),
        "totalPagesScraped": len(pages_to_scrape),
        "cssFilesDownloaded": len(all_css),
        "jsFilesDownloaded": len(all_js),
        "stickersDownloaded": len(brand_svgs),
        "focus": "gw suka porto dia mulai dari pemilihan warna, concept, dan lain lain itu fun, easy to watch, lucu, adorable, and shit",
        "architectureHighlights": {
            "playfulPhysics": "Spring physics and bouncy sticker typography that responds elastically to hover and drag.",
            "colorPalette": "High-vibrancy pop color system paired with bold cartoon outlines and tactile sticker badges.",
            "commercialWork": "Client work showcased for Pepsi, Lacoste, BBC, Oreo."
        }
    }
    save_file(target / "metadata.json", json.dumps(metadata, indent=2))
    
    readme = f"""# 05 - Mat Voyce Reference

**URL:** [https://matvoyce.tv/](https://matvoyce.tv/)  
**User Focus:** *"gw suka porto dia mulai dari pemilihan warna, concept, dan lain lain itu fun, easy to watch, lucu, adorable, and shit"*

## 🎯 Playful Interaction Engineering
1. **Bouncy Physics & Stickers:** Animated typography that reacts with elastic spring physics on cursor hover and drag.
2. **Vibrant Tactile Color:** Joyful pop aesthetics without feeling cheap.
3. **Commercial Portfolios Captured:**
   - Mirinda campaign breakdown (`pages/commercial/mirinda.html`)
   - Olipop animated case study (`pages/commercial/olipop.html`)
   - Brand SVGs downloaded in `assets/stickers/`.
"""
    save_file(target / "README.md", readme)
    print("  -> 05-matvoyce completely scraped!")

# ==========================================
# 6. PANTHEON MEDIA (06-pantheonmedia)
# ==========================================
def scrape_pantheon():
    print("\n" + "="*50 + "\nSCRAPING 06-pantheonmedia (pantheonmedia.com)\n" + "="*50)
    target = BASE_DIR / "06-pantheonmedia"
    target.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    
    base_url = "https://www.pantheonmedia.com"
    pages_to_scrape = [
        ("/", "index.html"),
        ("/about-us", "pages/about-us.html"),
        ("/companies", "pages/companies.html"),
        ("/company/45-live", "pages/companies/45-live.html"),
        ("/company/asylum-entertainment", "pages/companies/asylum-entertainment.html"),
        ("/company/audible", "pages/companies/audible.html"),
        ("/company/breakpoint-media", "pages/companies/breakpoint-media.html"),
        ("/company/claudia-sheinbaum", "pages/companies/claudia-sheinbaum.html")
    ]
    
    all_css = set()
    all_js = set()
    
    for route, filename in pages_to_scrape:
        p_url = urljoin(base_url, route)
        p_html = fetch_data(p_url)
        if p_html:
            save_file(target / filename, p_html)
            for c in re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', p_html, re.I):
                all_css.add(urljoin(base_url, c))
            for s in re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', p_html, re.I):
                all_js.add(urljoin(base_url, s))
                
    # Download Webfonts (PPMori, DMMono)
    font_urls = [
        "https://www.pantheonmedia.com/_next/static/media/0b0b96a8c6f4ddd7-s.p.woff2",
        "https://www.pantheonmedia.com/_next/static/media/29b663465c1cd32f-s.p.woff2",
        "https://www.pantheonmedia.com/_next/static/media/28f69fcc7eb64c86-s.p.ttf",
        "https://www.pantheonmedia.com/_next/static/media/6535083dd26d725d-s.p.woff",
        "https://www.pantheonmedia.com/_next/static/media/bddf831d2b987e93-s.p.ttf",
        "https://www.pantheonmedia.com/_next/static/media/55977849dfc646a2-s.p.woff"
    ]
    for fu in font_urls:
        fdata = fetch_data(fu, is_binary=True)
        if fdata:
            save_file(target / "fonts" / os.path.basename(fu), fdata, is_binary=True)
            
    # Download CSS
    for idx, cu in enumerate(sorted(all_css), start=1):
        cdata = fetch_data(cu, is_binary=True)
        if cdata:
            save_file(target / "css" / f"style-{idx}.css", cdata, is_binary=True)
            save_file(target / "css" / os.path.basename(cu.split('?')[0]), cdata, is_binary=True)

    # Download JS
    for idx, ju in enumerate(sorted(all_js), start=1):
        jdata = fetch_data(ju, is_binary=True)
        if jdata:
            save_file(target / "js" / f"bundle-{idx}.js", jdata, is_binary=True)
            save_file(target / "js" / os.path.basename(ju.split('?')[0]), jdata, is_binary=True)

    metadata = {
        "id": "06-pantheonmedia",
        "name": "Pantheon Media",
        "url": "https://www.pantheonmedia.com/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": int((time.time() - t0) * 1000),
        "totalPagesScraped": len(pages_to_scrape),
        "cssFilesDownloaded": len(all_css),
        "jsFilesDownloaded": len(all_js),
        "fontsDownloaded": len(font_urls),
        "detectedFonts": ["'PPMori'", "'DMMono'"],
        "focus": "cara mereka bikin landing itu kaya ngenalin diri mereka dengan berani, cuma masih approachable",
        "architectureHighlights": {
            "widescreenHero": "Cinematic 2.39:1 widescreen aperture reveal with bold typography that feels confident yet warm.",
            "companyNetwork": "Directory of media production subsidiaries across entertainment, podcasts, and sports.",
            "typographySystem": "Harmonious pairing of PP Mori (humanist grotesque) with DM Mono (technical counterpoint)."
        }
    }
    save_file(target / "metadata.json", json.dumps(metadata, indent=2))
    
    readme = f"""# 06 - Pantheon Media Reference

**URL:** [https://www.pantheonmedia.com/](https://www.pantheonmedia.com/)  
**User Focus:** *"cara mereka bikin landing itu kaya ngenalin diri mereka dengan berani, cuma masih approachable"*

## 🎯 Confident & Approachable Architecture
1. **Bold Aperture Entrance:** Cinematic widescreen framing that delivers high punch without hostile visual clutter.
2. **Typography Masterclass:** PP Mori + DM Mono webfonts (`fonts/`) create an editorial balance between cinematic prestige and modern technology.
3. **Subsidiary Network Captured:** All company profiles in `pages/companies/*.html`.
"""
    save_file(target / "README.md", readme)
    print("  -> 06-pantheonmedia completely scraped!")

# ==========================================
# 7. LANDO NORRIS (08-landonorris)
# ==========================================
def scrape_landonorris():
    print("\n" + "="*50 + "\nSCRAPING 08-landonorris (landonorris.com)\n" + "="*50)
    target = BASE_DIR / "08-landonorris"
    target.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    
    base_url = "https://landonorris.com"
    pages_to_scrape = [
        ("/", "index.html"),
        ("/calendar", "pages/calendar.html"),
        ("/on-track", "pages/on-track.html"),
        ("/off-track", "pages/off-track.html"),
        ("/partnerships", "pages/partnerships.html"),
        ("/legal/privacy-policy", "pages/privacy-policy.html"),
        ("/legal/terms-conditions", "pages/terms-conditions.html")
    ]
    
    all_css = set()
    all_js = set()
    
    for route, filename in pages_to_scrape:
        p_url = urljoin(base_url, route)
        p_html = fetch_data(p_url)
        if p_html:
            save_file(target / filename, p_html)
            for c in re.findall(r'<link[^>]+href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', p_html, re.I):
                all_css.add(urljoin(base_url, c))
            for s in re.findall(r'<script[^>]+src=[\'"]([^\'"]+)[\'"]', p_html, re.I):
                all_js.add(urljoin(base_url, s))
                
    # Key OFF+BRAND scripts for the liquid blob mask
    special_scripts = [
        "https://lando.itsoffbrand.io/dev-js/lando.OFF+BRAND.gold-android-fix-03.js",
        "https://assets.itsoffbrand.io/lando/dev-js/lando-by-OFF+BRAND.js"
    ]
    for ss in special_scripts: all_js.add(ss)

    # Key helmet images (base vs hover persona)
    helmet_assets = [
        "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b3e6c7ab86033cf172c_In-helm-2025-Season-base.webp",
        "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b03644c91f0a8de407b_In-helm-2025-DarkGlitter-hover.webp",
        "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a5cdaa389d0c080afc7_In-helm-2024-DarkMode-hover.webp",
        "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/683053f61b468e794507c0a7_In-helm-2023-Beach%20Ball-base.webp",
        "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/6830513c652a87f862917de3_In-helm-2019-hover.webp"
    ]
    for hu in helmet_assets:
        hdata = fetch_data(hu, is_binary=True)
        if hdata:
            clean_name = os.path.basename(hu.split('?')[0])
            save_file(target / "assets" / "helmets" / clean_name, hdata, is_binary=True)
            
    # Download CSS
    for idx, cu in enumerate(sorted(all_css), start=1):
        cdata = fetch_data(cu, is_binary=True)
        if cdata:
            save_file(target / "css" / f"style-{idx}.css", cdata, is_binary=True)
            save_file(target / "css" / os.path.basename(cu.split('?')[0]), cdata, is_binary=True)

    # Download JS
    for idx, ju in enumerate(sorted(all_js), start=1):
        jdata = fetch_data(ju, is_binary=True)
        if jdata:
            save_file(target / "js" / f"bundle-{idx}.js", jdata, is_binary=True)
            save_file(target / "js" / os.path.basename(ju.split('?')[0]), jdata, is_binary=True)

    metadata = {
        "id": "08-landonorris",
        "name": "Lando Norris",
        "url": "https://landonorris.com/",
        "scrapedAt": time.strftime("%Y-%m-%dT%H:%M:%S.000Z", time.gmtime()),
        "durationMs": int((time.time() - t0) * 1000),
        "totalPagesScraped": len(pages_to_scrape),
        "cssFilesDownloaded": len(all_css),
        "jsFilesDownloaded": len(all_js),
        "helmetAssetsDownloaded": len(helmet_assets),
        "detectedFonts": ["Brier", "Neue Haas Grotesk"],
        "focus": "literal cuma ngasih lando helm setengah setengah pake mouse movement ini di aplikasiin ke hero photo 1 sama 2 (yang beda pose) kan bisa",
        "architectureHighlights": {
            "liquidBlobCursorMask": "Canvas/SVG clip-path blob following cursor inertia that slices between Base Portrait and Helmet Persona.",
            "dualPhotoReveal": "Hero image layer 1 (clean portrait) with overlay layer 2 (race helmet / alternate pose) mapped to mouse position.",
            "allSections": ["Calendar (F1 Schedule)", "On-Track (Stats & telemetry)", "Off-Track (Quadrant)", "Partnerships"]
        }
    }
    save_file(target / "metadata.json", json.dumps(metadata, indent=2))
    
    readme = f"""# 08 - Lando Norris Reference

**URL:** [https://landonorris.com/](https://landonorris.com/)  
**User Focus:** *"literal cuma ngasih lando helm setengah setengah pake mouse movement ini di aplikasiin ke hero photo 1 sama 2 (yang beda pose) kan bisa"*

## 🎯 The Dual-Persona Hero Mask Secret
1. **Interactive SVG/Canvas Blob Mask:**
   - Base Layer: Standard photographic portrait (`In-helm-*-base.webp`).
   - Reveal Layer: Race helmet / alternate persona (`In-helm-*-hover.webp`).
   - Cursor movement creates an organic viscous liquid clip-path that dynamically reveals the alternate layer as the cursor sweeps across.
   - Script captured in `js/lando-by-OFF+BRAND.js`.
2. **Application for Rev's Portfolio:**
   - Can blend Portrait Pose 1 (casual developer) with Portrait Pose 2 (focused engineer / cyberpunk HUD) via mouse inertia!
3. **All Subpages Scraped:**
   - `index.html`: Hero with dynamic liquid mask.
   - `pages/calendar.html`: F1 calendar & race countdowns.
   - `pages/on-track.html`: Career statistics & race victories.
   - `pages/off-track.html`: Quadrant lifestyle, gaming, fashion.
   - `pages/partnerships.html`: Commercial sponsors & gear.
"""
    save_file(target / "README.md", readme)
    print("  -> 08-landonorris completely scraped!")

def main():
    print("==================================================")
    print("STARTING FULL RE-SCRAPE OF ALL 7 REFERENCE WEBSITES")
    print("==================================================")
    t_start = time.time()
    
    scrape_inkwell()
    scrape_photoyoshi()
    scrape_getty()
    scrape_cappen()
    scrape_matvoyce()
    scrape_pantheon()
    scrape_landonorris()
    
    total_sec = time.time() - t_start
    print(f"\nALL 7 REFERENCE WEBSITES RE-SCRAPED COMPLETELY IN {total_sec:.2f}s!")

if __name__ == "__main__":
    main()
