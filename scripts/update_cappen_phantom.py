with open('AGENT_HANDOVER_MASTER_PLAN.md', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update the table rows for Cappen (#4) and Phantom Land (#5)
old_table_part = """| **4** | **Cappen** (`cappen.com`)                      | _"konsep brutalis yang menurut gw done right, tetep keliatan sleek dan ga ganggu, but still interactive"_                                                                                  |
| **5** | **Phantom Land** (`phantom.land`)              | _"stick to the brutalist concept and just ran away with it, not to mention cara ngenalin team mereka"_                                                                                     |"""

new_table_part = """| **4** | **Cappen** (`cappen.com`)                      | _"2 website ini gila banget urusan brutalism. they did it right. looks masih clean, enak di pandang, cuma di sisi lain masih UNIQUE. untuk cappen the whole website layout, items placements dan animasi yang di pake dan lain lain itu gila. standing ovation for them."_ | Clean brutalism framework: 1px geometric hairline grid architecture, 5-decimal high-precision ticker preloader (`toFixed(5)`), magnetic inertia cursor with morphing actions, and 3D kinetic hover portals on table rows (`perspective(1000px) rotateX/Y`) (Details in §2.4). |
| **5** | **Phantom Land** (`phantom.land`)              | _"untuk phantom land itu di bagian about sama careers. itu layout mereka menurut gw bagus banget sama animasi yang mereka masukin itu subtle, tapi ngebantu ngebangun suasana yang di rasain disaat eksplor web itu. great work."_ | Brutalist atmospheric storytelling: About page holographic team grid with 256x256 WebGL depth map displacement shaders (`*-depth.webp`), department filter tabs, careers listing with shooting directional arrow microinteractions, expanding horizontal hairline separators (`scaleX(0) -> scaleX(1)`), and Web Audio API ambient hum / audio feedback (Details in §2.5). |"""

assert old_table_part in text, "Table part not found!"
text = text.replace(old_table_part, new_table_part)

# 2. Insert Section 2.4 and Section 2.5
target_insertion = """- **Component File:** `src/components/showcase/NegativeSpaceGallery.tsx`
- **Application:** Revworks selected architectural/engineering highlights (e.g. key system designs, core algorithmic models, or patent diagrams). The screen maintains 75% negative space around a central editorial title (*"the Craft of Revworks"*), with floating interactive project nodes and faint ghost bounding boxes drifting around the perimeter.

---"""

sections_to_add = target_insertion + """

### 2.4 Deep Breakdown: Cappen Brutalism Done Right — Sleek Grid, Table Portals & Precise Dynamics

Rev highlighted Cappen as the benchmark for *"brutalism done right — looks masih clean, enak di pandang, tapi UNIQUE. Layout, item placements, dan animasinya standing ovation."* Screenshot is backed up in `references_scraped/04-cappen/screenshots/cappen-brutalist-layout.png`:

```
┌────────────────────────────────────────────────────────────────────────┐
│  [ CAPPEN ]                                             [ MENU / TALK ]│
│ ────────────────────────────────────────────────────────────────────── │
│  FEATURED WORK / 01                                     [ 2026.08412 ] │
│ ────────────────────────────────────────────────────────────────────── │
│  Ask Genie              2026   [FRONT-END DEV] [AI]      [↗ DISCOVER]  │
│  ────────────────────────────────────────────────────────────────────  │
│  Elevating Iquine...    2026   [UX/UI] [WEBFLOW DEV]     [ 3D PORTAL ] │
│    ┌─────────────────────────┐                                         │
│    │  Hover 3D Perspective   │                                         │
│    │  Thumbnail Tilt         │                                         │
│    └─────────────────────────┘                                         │
│  ────────────────────────────────────────────────────────────────────  │
│  LeadEdu                2025   [WEBSITE] [CREATIVE]      [↗ DISCOVER]  │
└────────────────────────────────────────────────────────────────────────┘
```

#### 📸 Key Compositional & Motion Systems:

1. **1px Geometric Hairline Grid Architecture:**
   - Instead of thick chunky borders or retro 90s brutalism, Cappen employs an ultra-refined **1px architectural hairline grid** (`border: 1px solid rgba(255, 255, 255, 0.08)` on dark surfaces or `#161616` on light).
   - Every module (`hero`, `sub-hero`, `work__cases`, `work__list`, `about`, `talk`) snaps strictly to standard viewport percentages with zero arbitrary gaps.

2. **5-Decimal High-Precision Ticker Preloader (`toFixed(5)`):**
   - Located in `references_scraped/04-cappen/js/preloader.js`:
     ```javascript
     const formatPrecision = function(e) {
       let decimals = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
       return parseFloat(e.toFixed(decimals));
     };
     ```
   - Counter numbers tick continuously with 5 floating decimal digits (`42.18942%`), giving the impression of industrial/scientific telemetry rather than a generic website loader.

3. **3D Kinetic Hover Portals on Case Study Table Rows (`work-item`):**
   - Each project item in `work__list` acts as a condensed table row: title, release year, monospace skill pills (`FRONT-END DEV`, `MICROINTERACTIONS`), and external action.
   - On cursor hover, the thumbnail details panel (`work-item__details`) blooms into view, calculating mouse offset relative to the row's bounding box:
     ```css
     transform: perspective(1000px) rotateX(calc(var(--mouse-y) * -14deg)) rotateY(calc(var(--mouse-x) * 14deg));
     transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
     ```
   - Accompanied by a magnetic circular arrow button (`link-hover-circle`) with an internal SVG glyph (`#d-arrow`) that rotates $45^\circ$ on hover.

4. **Magnetic Inertia Cursor (`data-cursor="discover"`):**
   - Custom pointer driven by `gsap.quickTo()` with subtle spring inertia.
   - Defaults to an 8px solid dot. When entering interactive project figures (`case-card__wrapper__fig`), the cursor expands to a 48px circle and reveals the label `"DISCOVER"` or `"VIEW"`.

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/showcase/BrutalistProjectTable.tsx`
- **Application:** Revworks comprehensive project catalog / index. A clean, tabular 1px hairline brutalist layout where hovering any engineering project expands a smooth 3D tilted preview card, complete with monospace technical tags and a magnetic cursor tracker.

---

### 2.5 Deep Breakdown: Phantom Land — Atmosphere Building in About & Careers (Subtle Depth Shaders & Spatial Audio)

Rev praised Phantom Land's About and Careers sections as masterclasses in atmospheric brutalism: *"layout mereka bagus banget sama animasi yang mereka masukin itu subtle, tapi ngebantu ngebangun suasana yang di rasain disaat eksplor web itu. great work."* Screenshot backed up in `references_scraped/07-phantom-land/screenshots/phantom-team-interactive-depth.png`:

```
┌────────────────────────────────────────────────────────────────────────┐
│  PHANTOM                                                [ SOUND: ON ]  │
│ ────────────────────────────────────────────────────────────────────── │
│  ABOUT / THE AGENCY                                                    │
│  [ ALL (49) ]  [ CREATIVE (18) ]  [ TECH (12) ]  [ PARTNERSHIP (10) ]  │
│ ────────────────────────────────────────────────────────────────────── │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │ Ajay (QA)    │  │ Amelia (Lead)│  │ Andy (QA)    │  ... (49 cards)  │
│  │ [RGB Texture]│  │ [RGB Texture]│  │ [RGB Texture]│                  │
│  │ [Depth Map]  │  │ [Depth Map]  │  │ [Depth Map]  │                  │
│  │   Hover:     │  │   Hover:     │  │   Hover:     │                  │
│  │ 3D Parallax  │  │ 3D Parallax  │  │ 3D Parallax  │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│ ────────────────────────────────────────────────────────────────────── │
│  CAREERS / ROLES WE'RE ON THE LOOKOUT FOR:                             │
│  technology   Frontend Engineer (LDN)             ──────> [Shooting]   │
│  ───────────  (scaleX separator line unfolds)     ──────────────────   │
│  creative     Design Lead (LDN)                   ──────> [Shooting]   │
└────────────────────────────────────────────────────────────────────────┘
```

#### 📸 Key Compositional & Motion Systems:

1. **Holographic 3D Team Roster via WebGL Depth Map Displacement (About Section):**
   - **Data Schema (`references_scraped/07-phantom-land/team.json`):** 49 team members organized by department pills (`creative`, `technology`, `partnership`, `quality`).
   - **Dual-Texture Asset Pairing:**
     - Color Texture: `ajay-ghela-colour-256.webp` (RGB portrait).
     - Grayscale Depth Map: `ajay-ghela-depth-256.webp` (8-bit luminance representing pixel distance $z$).
   - **GLSL UV Displacement Shader:**
     As the user moves their mouse over a member's card, the shader recalculates texture coordinates:
     ```glsl
     float depth = texture2D(uDepthMap, vUv).r;
     vec2 displacement = (depth - 0.5) * uMouseOffset * uDisplacementStrength;
     vec4 finalColor = texture2D(uTexture, vUv + displacement);
     gl_FragColor = finalColor;
     ```
     This produces a true, physical **holographic tilt** where the subject's nose, ears, and shoulders move at different optical parallax depths without requiring a heavy 3D mesh!

2. **Careers Section Brutalist Rhythm & Microinteractions:**
   - **Taxonomy Hierarchy:** Monospace uppercase department labels (`typography_MonoDetail__dFwdG`) sit quietly above bold title headlines (`styles_Title__Lh6mn`).
   - **Progressive Separator Line Unfold:**
     Section dividers `<hr class="styles_Separator__rFyRk" style="transform: scaleX(0)"/>` animate from center to edges (`scaleX(0) -> scaleX(1)`) via custom easing `cubic-bezier(0.16, 1, 0.3, 1)` on scroll into view.
   - **Shooting Directional Arrow SVG:**
     Custom brutalist arrow `<svg viewBox="0 0 22 22">` with a hairline stem that elongates and shoots forward dynamically when the career role row is hovered.
   - **Embedded Ambient Video Bands:**
     Values sections ("Respected", "Trusted", "Unrivalled") feature high-framerate, desaturated looping silent video assets (`styles_Asset__lkes6`) flush-aligned against the typography grid.

3. **Subtle Sonic Atmosphere (Web Audio API):**
   - Supported by an 8-buffer audio synthesizer (`references_scraped/07-phantom-land/sounds/`).
   - A deep, almost subconscious `55Hz` sub-bass ambient hum loops quietly when sound is `[ON]`, punctuated by crisp micro-clicks on card hover, elevating the site into a tactile, cinematic experience.

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/showcase/HolographicExperienceGrid.tsx` & `src/components/showcase/BrutalistCareersList.tsx`
- **Application:** Revworks Experience & Skills section. Employs WebGL depth map displacement for interactive cards, progressive expanding hairline separators, directional shooting arrow hover states, and procedural Web Audio feedback (`src/lib/sound.ts`).

---"""

assert target_insertion in text, "Target insertion point not found!"
text = text.replace(target_insertion, sections_to_add)

with open('AGENT_HANDOVER_MASTER_PLAN.md', 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully added Cappen (§2.4) and Phantom Land (§2.5) to AGENT_HANDOVER_MASTER_PLAN.md!')
