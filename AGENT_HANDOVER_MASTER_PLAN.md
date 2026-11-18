# REVWORKS

## 1. Executive Vision & Core Paradigm

The portfolio is transitioning from an outdated parchment blueprint box model into.... Undecided. :

- **ATS Resume Isolation:** The digital portfolio transforms into a pure single-column, black-and-white executive ATS resume under `@media print` or via the `PRINT CV` button.

---

## 2. The 8 Reference Websites: What Rev Loves & How They Are Mapped

Rev scraped and analyzed 8 reference sites in `references_scraped/`. Here is the exact feature mapping:

| #     | Reference Website                              | What Rev Loves (Direct User Quote)                                                                                                                                                         | Implementation Architecture |
| ----- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| **1** | **Inkwell Tech** (`inkwell.tech`)              | _"animasi card yang kalo di scroll jadi kebuka jejer lurus kebelakang dan seterusnya itu masih cakep banget animasinya, bahkan bisa pilih project mana yang mau di liat kalo scroll lagi"_ | Three.js + Rapier WASM Physics card deck fanning along 3D diagonal conveyor track ($Z/X/Y$ isometric line) with camera spline gliding and interactive card selection elevation (Details in §2.1). |
| **2** | **Photoyoshi** (`photoyoshi.com`)              | _"gw suka banget animasi landing halaman awal ini (gambar 1), ini ga sampe masuk halaman utama, CUMA LOADING AJA, cuman tatanan tulisan, foto, angka kecil itu, dan lain lain itu gw demen banget. aesthetically pleasing."_ | Minimalist editorial preloader (`.l-splash`): warm sand canvas (`#e7e5de`), colossal split typography `PHOTOYOSHI` (`top: -14vw` stagger), centered framed photo (`inset(22vh 38vw)`), bilateral crosshair reticles (`.c-scope --grid`), and bottom 3-column HUD with high-speed ticker (00 to 100 in 10ms +3 step interval) (Details in §2.2). |
| **3** | **Getty Tracing Art** (`getty.edu/tracingart`) | _"Gw suka banget cara mereka manfaatin negative space untuk menekankan point atau konten yang mau mereka sampaikan (gambar 2)"_                                                             | Negative space mastering (~75% breathing room): WebGL Instanced Sprite radial constellation with center exclusion radius (`minRadius` & `uEdgeRadius` smoothstep), italic + upright serif typography (*the World of the GPI*), ghost bounding boxes, floating interactive framed artworks with Raycast hover, vertical scroll pill, and tutorial micro-pill (Details in §2.3). |
| **4** | **Cappen** (`cappen.com`)                      | _"2 website ini gila banget urusan brutalism. they did it right. looks masih clean, enak di pandang, cuma di sisi lain masih UNIQUE. untuk cappen the whole website layout, items placements dan animasi yang di pake dan lain lain itu gila. standing ovation for them."_ | Clean brutalism framework: 1px geometric hairline grid architecture, 5-decimal high-precision ticker preloader (`toFixed(5)`), magnetic inertia cursor with morphing actions, and 3D kinetic hover portals on table rows (`perspective(1000px) rotateX/Y`) (Details in §2.4). |
| **5** | **Phantom Land** (`phantom.land`)              | _"untuk phantom land itu di bagian about sama careers. itu layout mereka menurut gw bagus banget sama animasi yang mereka masukin itu subtle, tapi ngebantu ngebangun suasana yang di rasain disaat eksplor web itu. great work."_ | Brutalist atmospheric storytelling: About page holographic team grid with 256x256 WebGL depth map displacement shaders (`*-depth.webp`), department filter tabs, careers listing with shooting directional arrow microinteractions, expanding horizontal hairline separators (`scaleX(0) -> scaleX(1)`), and Web Audio API ambient hum / audio feedback (Details in §2.5). |
| **6** | **Mat Voyce** (`matvoyce.tv`)                  | _"Ini web designnya gila, fun banget. the layout, animations, pilihan asset, SEMUANYAA FUN ABISSS. JATUH CINTA GW SAMA INI WEB AKH, saran gw sih jangan di masukin ke the grand plan, cuma kalo ada yang bisa di masukin ke konsep brutalis masukin juga gapapa"_ | Tactile Brutalism & Engineered Playfulness: Rubber-band spring physics ($k=450, c=22, m=0.8$) on buttons/tags, draggable physics badge sandbox, and tactile squish feedback applied seamlessly over the sleek 1px hairline grid without diluting the executive architectural tone (Details in §2.6). |
| **7** | **Pantheon Media** (`pantheonmedia.com`)       | _"Ini web jujur naksir banget animasi transisi per page, transisi ke menu, layout mereka, di about bagian team itu ada interactive pake mouse yang cuma bisa di akses di situ doang, bikin ga boring. smooth as fuck."_ | Cinematic Editorial Transitions & WebGL Interactive Team Grid: 7-bar staggered horizontal shutter page transition (from center to edges), kinetic menu toggle drawer, and About page WebGL pixel-square mouse dispersal shader (`uMouse`, `uVelocity`, 20x20 block matrix) (Details in §2.7). |
| **8** | **Lando Norris** (`landonorris.com`)           | _"jujur gw ga suka sama personality orangnya, CUMA gw demen banget sama design websitenya. itu di halaman awal (bagian yang ada foto lando gede banget) itu bisa di mainin pake mouse, blob yang di bawa mouse ini tadi bisa ubah lando jadi pake helm signature dia. itu eye catching banget, BAHKAN SAMPE GW GA SADAR KALO PAGENYA BISA DI SCROLL. Great work jujur buat team dibelakang web ini."_ | Dual-Persona Fluid Viscous Mask: Navier-Stokes fluid velocity solver & spring-deformed liquid blob mask on mouse movement, compositing Base Hero Portrait vs Alternate Cyberpunk/Architect Persona (`mix-blend-mode` / WebGL FBO mask) (Details in §2.8). |

---

### 2.1 Deep Breakdown: Inkwell Tech 3D Card Stack & Fanning Sequence (Screenshots 1–6 Analysis)

Rev uploaded 6 sequential screenshots documenting the exact animation progression from `inkwell.tech`'s Architecture section. All images are backed up in `references_scraped/01-inkwell/screenshots/`:

```
[Gambar 1: Single Card] ──scroll──> [Gambar 2: Isometric Tilt] ──scroll──> [Gambar 3: Z/X Fanning]
         │                                                                             │
         └─────────────scroll──────────> [Gambar 4: Conveyor Glide]                   │
                                                    │                                  │
                                                    ▼                                  ▼
[Gambar 6: Active Selection Step 13] <──click/scrub── [Gambar 5: Full 24-Stage Array Step 9]
```

#### 📸 The 6-Stage Progression:

1. **Step 1 — Single Frontal Focal Card (`step-1-single-card.png`):**
   - **Visual State:** A single card sits centered on a clean white canvas. The text reads: *"AI is changing the way we approach Architecture"*.
   - **3D Mechanics:** The lead card ($i = 0$) faces the camera orthogonally ($R_x = 0, R_y = 0$). All subsequent 23 cards are tightly compressed behind it at micro-depth offsets ($z_i = -i \times 0.002$), remaining completely invisible to the user.

2. **Step 2 — Isometric Perspective Tilt & Deck Thickness Reveal (`step-2-isometric-tilt-compressed-deck.png`):**
   - **Visual State:** As the user scrolls into the section, the card deck tilts into a clean 3D isometric view. The multi-layered physical thickness of all 24 cards becomes visible along the edge.
   - **3D Mechanics:** Camera rotates from frontal view $[0, 0, 5]$ to isometric angle (pitch $\sim 35.26^\circ$, yaw $\sim 45^\circ$). Cards remain clamped in a compact deck.

3. **Step 3 — Z/X Diagonal Depth Fanning (`step-3-fanning-backward-along-z.jpg`):**
   - **Visual State:** With further scroll, the deck smoothly fans open backwards along an isometric diagonal line into the depth of the screen. Subtitle updates: *"AI transforms the 24-step, years-long building process into a parallel, real-time system."*
   - **3D Mechanics:** Spacing between cards expands proportionally to scroll progress. Card $i$ follows the linear vector:
     $$\vec{P}_i(s) = \vec{P}_0 + i \cdot s \cdot \begin{bmatrix} \Delta x \\ \Delta y \\ -\Delta z \end{bmatrix}$$
     Where $\Delta x > 0$, $\Delta y > 0$, and $\Delta z > 0$ creates a receding diagonal trajectory toward the upper-right background.

4. **Step 4 — Conveyor Track Camera Glide (`step-4-camera-translation-along-track.jpg`):**
   - **Visual State:** Continued scrolling drives the camera along the conveyor track. Cards 1–4 glide past the front view while cards 5–8 move into focal perspective.
   - **3D Mechanics:** The camera look-at target interpolates smoothly along the diagonal card spine:
     $$\vec{C}_{\text{target}}(s) = \text{lerp}(\vec{C}_{\text{start}}, \vec{C}_{\text{end}}, s)$$

5. **Step 5 — Full 24-Stage Isometric Array & Active Focus (`step-5-full-24-card-isometric-train-step-9.jpg`):**
   - **Visual State:** All 24 cards are stretched across the full screen in a continuous isometric queue from bottom-left to top-right. Below the cards, a stage indicator HUD displays:
     - Active pill: `Architecture [ 9 ] [ Materials & 3D ]`
     - Flanked by inactive adjacent stages: `Design Refinement`, `Design Development`
     - Bottom impact copy: *"This compresses timelines, eliminates waste, and drives massive cost savings."*
   - **3D Mechanics:** Card #9 is positioned in the optical center of the viewport, lifted slightly above the queue line ($\Delta y \approx +0.3$) with enhanced contrast.

6. **Step 6 — Interactive Card Selection & Elevation (`step-6-interactive-selection-step-13.jpg`):**
   - **Visual State:** The user clicks Card #13 (or clicks the HUD pill `[ 13 ] [ Documentation & Permitting ]`).
   - **3D Mechanics:** 
     - Raycasting detects the pointer intersection with Card #13.
     - The camera slides along the spline to align Card #13 to the focal center.
     - Card #13 elevates upward ($\Delta y_{\text{active}} = +0.5$) with a subtle scale pop ($1.05\times$).
     - The surrounding cards dim slightly to $70\%$ opacity, preserving the full diagonal train context.
     - The stage indicator smoothly increments: `Architecture [ 13 ] [ Documentation & Permitting ]` with adjacent pills `Specifications & Coordination` and `Compliance & Submission`.

---

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/showcase/IsometricCardStack.tsx`
- **Engine:** Three.js / React Three Fiber (`@react-three/fiber`) or GSAP 3D CSS transforms with hardware-accelerated `transform-style: preserve-3d`.
- **Card Data:** Map 6–12 of Rev's top engineering projects (Garuda TopUp, Digi-Art, Chorus, Tamboer, etc.) as the 3D card entities.
- **Scroll Driver:** GSAP ScrollTrigger with `pin: true` and `scrub: 0.8` mapped to the 6-stage progression curve.
- **Interactivity:** Raycaster click + Pill click smoothly tweens camera position and elevates selected project card.

---

### 2.2 Deep Breakdown: Photoyoshi Aesthetic Loading & Minimalist Composition (User Screenshot Analysis)

Rev uploaded Screenshot #1 capturing the preloader state (`.l-splash`) of `photoyoshi.com`. All images are backed up in `references_scraped/02-photoyoshi/screenshots/preloader-aesthetic-counter-layout.jpg`:

```
┌────────────────────────────────────────────────────────────────────────┐
│  P H O T O Y O S H I   (Colossal split typography overflowing canvas)   │
│                                                                        │
│                      ┌──────────────────────┐                          │
│                      │                      │                          │
│        +             │   Centered Framed    │            +             │
│   (Hairline Scope)   │     Photography      │    (Hairline Scope)      │
│                      │                      │                          │
│                      └──────────────────────┘                          │
│                                                                        │
│ [フォトグラファー [•]]   Takamitsu Motoyoshi is a...            [ 100 ]   │
│ (Japanese Tag Left)    (Centered Editorial Bio)          (Ticker 100)  │
└────────────────────────────────────────────────────────────────────────┘
```

#### 📸 Key Compositional & Motion Systems:

1. **Warm Sand Monochrome Atmosphere:**
   - **Color Tone:** Minimalist off-white/warm sand paper background (`#e7e5de`) with charcoal ink typography (`#252726`).
   - **Container:** Full viewport overlay (`height: calc(var(--vh) * 100); width: 100vw; z-index: 10000; overflow: hidden;`).

2. **Colossal Dual-Layer Split Typography (`.l-splash__title`):**
   - **Layout:** Colossal `fs-xxl u-upper` typography spanning the entire upper third of the viewport with negative line-height (`line-height: .7; overflow: hidden;`).
   - **Split Animation Engine:** Built with two synchronized layers: `.in` (top exit) and `.out` (bottom entrance).
     ```javascript
     const t = gsap.timeline();
     // Outgoing letters slide up into overflow mask
     t.to(".l-splash .l-splash__title .in span", 0.5, {
       ease: "power1.in",
       top: "-14vw",
       stagger: 0.05
     });
     // Incoming letters slide into place from below
     t.to(".l-splash .l-splash__title .out span", 0.9, {
       ease: "power3.out",
       top: "0vh",
       stagger: 0.05
     }, "< 0.2");
     // Full title lifts smoothly as page settles
     t.to(".l-splash h1", 2.0, {
       ease: "power4.inOut",
       marginTop: "-30vh"
     }, "< 0.2");
     ```

3. **Centered Editorial Photograph with Architectural Clip-Path:**
   - **Aspect Ratio:** Exact portrait ratio `aspect-ratio: 576/746; width: calc(var(--grid) * 14);`.
   - **Spatial Mask:** Framed inside `.l-splash__front-wrap` using a geometric viewport inset:
     ```css
     clip-path: inset(22vh 38vw 22vh 38vw);
     will-change: clip-path, width;
     ```
   - **Entrance Motion:** Fades in with gentle stagger: `gsap.to(".l-splash__front", 0.3, { opacity: 1, delay: 0.1 });`.

4. **Bilateral Hairline Crosshairs (`.c-scope --grid`):**
   - Positioned on both flanks of the center photograph (`.l-splash__middle { width: calc(100vw - var(--grid) * 20); }`).
   - Four 1px hairline strokes (`.l1`, `.l2`, `.l3`, `.l4`) create technical photography reticles, imparting high-end precision.

5. **Bottom 3-Column Micro-Typography HUD (`.l-splash__bottom`):**
   - **Structure:** `display: flex; justify-content: space-between; align-items: flex-end;` spanning `calc(100vw - var(--grid) * 2)`.
   - **Column 1 (Left - 33.3%):** Japanese Katakana photographer badge (`<div class="l-splash__tag"><img src="tag.svg"></div>` reading `フォトグラファー [•] モトヨシタカミツ`).
   - **Column 2 (Center - 33.3%):** Low-contrast editorial bio copy (`.l-splash__text.fs-s`).
   - **Column 3 (Right - 33.3%):** High-speed numerical ticker `<span class="l-splash__num">100</span>` with tight line-height (`line-height: .7; text-align: right;`).
   - **Ticker Engine (`shuffleNumberCounter`):**
     ```javascript
     let n = 0;
     const interval = setInterval(() => {
       if (n < 99) {
         n += 3;
         document.querySelector(".l-splash__num").innerHTML = n;
       } else {
         clearInterval(interval);
         document.querySelector(".l-splash__num").innerHTML = "100";
       }
     }, 10.101); // 10ms tick cadence = ~330ms total loader sequence
     ```

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/showcase/AestheticPreloader.tsx`
- **Application:** Initial page load screen / transition splash. Displays Revworks logo, focal project snapshot, hairline viewfinder reticles, Indonesian / English engineering badge (`フルスタックエンジニア [•] REVWORKS`), and numeric progress counter (00 → 100).

---

### 2.3 Deep Breakdown: Getty Tracing Art Negative Space Mastering & Floating Artworks (User Screenshot Analysis)

Rev uploaded Screenshot #2 capturing the Chapter 2 opening state (*"the World of the GPI"*) of `getty.edu/tracingart`. All images are backed up in `references_scraped/03-getty-tracingart/screenshots/negative-space-artwork-grid.jpg`:

```
┌────────────────────────────────────────────────────────────────────────┐
│  Getty                                                            [ = ]│
│                                                                        │
│       ┌─────────┐                                                      │
│       │ Cézanne │                                                      │
│       │ Apples  │                                                      │
│       └─────────┘                 the World                            │
│                                     of the GPI            ┌─────────┐  │
│                ┌─────────┐                                │ Christus│  │
│                │ Moretto │                                │ Monk    │ █│
│                │ Man     │                                └─────────┘ ││
│                └─────────┘                     ┌─────────┐            ││
│       ░░░░░░░░░░░                              │Van Gogh │            ││
│       (Ghost Box)                              │Oleanders│            ││
│                                                └─────────┘            ││
│                                              [Click on an artwork...]  │
└────────────────────────────────────────────────────────────────────────┘
```

#### 📸 Key Compositional & Motion Systems:

1. **Extreme Negative Space Ratio (~75% Visual Emptiness):**
   - The canvas deliberately avoids wallpaper grids or busy cards.
   - 75–80% of the screen is pure luminous white, forcing the user's eye directly to the central typography and the sparse, highly curated floating artworks.

2. **Dual-Style Serif Typographic Anchor:**
   - Center headline uses two contrasting serif voices:
     - *"the World"* — rendered in high-elegance italic serif (`font-style: italic; font-weight: 300`).
     - *"of the GPI"* — rendered in structured Roman classical serif (`font-style: normal; font-weight: 400`).
   - Pinned at the exact viewport center (`left: 50%; top: 50%; transform: translate(-50%, -50%); pointer-events: none;`).

3. **WebGL Instanced Radial Constellation Shader (`BBSPXiNi.js`):**
   - Rather than relying on rigid CSS grids, the paintings and translucent ghost placeholder boxes are managed by a custom WebGL Instanced Sprite system using polar coordinates:
     $$	ext{angle} = a_{	ext{AngleRadius}}.x, \quad r_{	ext{start}} = a_{	ext{AngleRadius}}.y, \quad r_{	ext{min}} = a_{	ext{AngleRadius}}.z$$
     $$x = \cos(	ext{angle}) \cdot r, \quad y = \sin(	ext{angle}) \cdot r, \quad z = 	ext{mix}(-0.3, 0.0, a_{	ext{Random}}.x)$$
   - **Central Negative Space Protection Boundary:**
     To prevent floating paintings from colliding with the central headline *"the World of the GPI"*, the fragment shader applies an active exclusion threshold:
     ```glsl
     // Smoothly dissolves any artwork or tile that enters the central reading zone
     float radiusAlpha = smoothstep(uEdgeRadius * 0.1, uEdgeRadius * 0.5, vRadius);
     float alpha = sprite.a * radiusAlpha * vAlpha * vLoopAlpha;
     ```
   - **Subtle Drift & Orbit:**
     As the user scrolls or idles, particles drift slowly in depth:
     ```glsl
     float timeOffsetRamp = map(uEdgeRadius - minRadius, 0.2, 0.8, 20.0, 3.0, true);
     float startFalling = (minRadius - radius) * timeOffsetRamp;
     float time = startFalling + uTime * 0.08 + 100.0 + uFallingSpeed;
     ```

4. **Ghost Bounding Boxes for Rhythmic Spatial Anchoring:**
   - Scattered throughout the negative space are faint translucent rectangles (`rgba(0, 0, 0, 0.03)` to `0.06`).
   - They suggest an underlying archival catalog grid without creating visual clutter, giving structural purpose to the void.

5. **Curated Classical Oil Paintings in Jet-Black Frames:**
   - 4 prominent artworks visible in the user's screenshot:
     1. **Top-Left:** *Still Life with Apples and Pears* — Paul Cézanne (ca. 1891–92).
     2. **Bottom-Left:** *Portrait of a Man* — Moretto da Brescia (ca. 1520–25).
     3. **Mid-Right:** *Portrait of a Carthusian* — Petrus Christus (1446).
     4. **Bottom-Right:** *Oleanders* — Vincent van Gogh (1888).
   - Each painting is enclosed in a minimal black frame with physical depth shadow.

6. **Interactive Raycast Hover & Micro-UI Affordances:**
   - **Screen-Space Raycasting:** Hovering an artwork highlights its frame and triggers a subtle upward drift ($z$-elevation).
   - **Modal Popover:** Clicking an artwork opens its provenance ledger and high-resolution inspection view.
   - **Scroll Progress Slider:** Right-hand floating slider pill (`.timelineBar`) with circular thumb dot tracking scroll progress.
   - **Tutorial Micro-Pill:** Bottom-right floating pill (`creditsPopup`) reading *"Click on an artwork to learn more."* (`textLabelS`).

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/showcase/NegativeSpaceGallery.tsx`
- **Application:** Revworks selected architectural/engineering highlights (e.g. key system designs, core algorithmic models, or patent diagrams). The screen maintains 75% negative space around a central editorial title (*"the Craft of Revworks"*), with floating interactive project nodes and faint ghost bounding boxes drifting around the perimeter.

---

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

---

### 2.6 Deep Breakdown: Mat Voyce — Engineered Playfulness & Tactile Spring Dynamics in a Clean Brutalist World

Rev fell in love with Mat Voyce's boundless kinetic energy: *"Ini web designnya gila, fun banget. the layout, animations, pilihan asset, SEMUANYAA FUN ABISSS. JATUH CINTA GW SAMA INI WEB AKH, saran gw sih jangan di masukin ke the grand plan [sebagai tema dasar], cuma kalo ada yang bisa di masukin ke konsep brutalis masukin juga gapapa"*.

Rev is strategically spot-on: **The core visual architecture remains pristine, executive Clean Brutalism** (so Revworks presents as a senior-level $200k+ fullstack engineer, not a cartoon sandbox). However, Mat Voyce's kinetic joy is harvested as an **"Engineered Playfulness" Easter Egg & Microinteraction Layer**—making the portfolio tactile, responsive, and ridiculously fun to interact with.

```
┌────────────────────────────────────────────────────────────────────────┐
│  CLEAN BRUTALIST 1px HAIRLINE GRID CHASSIS                             │
│  ────────────────────────────────────────────────────────────────────  │
│  ENGINEERING ARTIFACTS / PLAYGROUND                                    │
│                                                                        │
│    ┌──────────────┐          ┌──────────────┐          ┌──────────────┐│
│    │ [ Next.js ]  │          │ [ Three.js ] │          │ [ Rapier ]   ││
│    │  (Draggable) │          │  (Draggable) │          │  (Draggable) ││
│    │  Spring Toss ↺          │  Bounces off │          │  Squish & Pop││
│    └──────────────┘          └──────────────┘          └──────────────┘│
│                                                                        │
│  STATUS: [● AVAILABLE] ──(hover)──> [Overshoot Bounce: 1.18x Pop!]     │
│  BUTTONS: ──(mousedown)──> [Tactile Squish: scale(0.92, 1.08) + Click] │
└────────────────────────────────────────────────────────────────────────┘
```

#### 📸 Key Kinetic Systems & Math Deconstruction:

1. **Under-Damped Rubber-Band Spring Hover Physics:**
   - Standard brutalism often suffers from stiff, mechanical linear transitions. Mat Voyce fixes this by using an under-damped harmonic oscillator for every interactive element:
     $$m rac{d^2 x}{dt^2} + c rac{dx}{dt} + k x = 0$$
     Where mass $m = 0.8$, damping coefficient $c = 22$, and spring constant $k = 450$.
   - **Scale Trajectory on Hover:**
     $$	ext{Scale: } 1.0 	o 1.18 	o 0.95 	o 1.04 	o 1.0$$
     Every tag, button, or navigation pill pops with elastic satisfaction.

2. **Draggable Physics Badges & Stickers (Framer Motion Elastic Drag):**
   - Decompiled from `references_scraped/05-matvoyce/js/fd9d1056-75e3018b4cca23a1.js`:
     ```typescript
     <motion.div
       drag
       dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
       dragElastic={0.2}
       dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
       whileHover={{ scale: 1.15, rotate: (Math.random() - 0.5) * 12 }}
       whileTap={{ scale: 0.9, rotate: 0 }}
     />
     ```
   - In Revworks, this is applied to a dedicated "Lab / Tech Stack Badges" module: visitors can physically drag and toss Rev's core stack chips (Next.js, Three.js, WebAssembly, TypeScript, Tailwind) inside the modular brutalist frame!

3. **Tactile Squish & Morphing on Action Triggers:**
   - On `mousedown` or `pointerdown`, interactive switches (Sound ON/OFF, Theme Switcher, ATS Print Button) momentarily deform along their velocity axis:
     ```css
     transform: scale(0.94, 1.06);
     transition: transform 0.08s cubic-bezier(0.2, 0, 0, 1);
     ```
   - Coupled with procedural audio synthesis in `src/lib/sound.ts` (a crisp 1200Hz sine chirp with rapid exponential decay), giving the feeling of a high-end physical clicky mechanical keyboard switch.

4. **Pulsating Live Status Indicator:**
   - A playful, organic status pill in the header:
     - `● AVAILABLE FOR Q2/Q3` — the green dot has an asynchronous breathing ripple (`scale: 1.0 -> 1.4 -> 1.0` with `opacity: 0.8 -> 0 -> 0.8`), proving the engineer is active and shipping.

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/showcase/TactileSandbox.tsx` & spring utility hooks in `src/hooks/useSpringInteraction.ts`.
- **Application:** Embedded within the Skills / Toolbox section as an interactive easter egg. Visitors can play with Rev's tech badges using real spring physics while preserving the razor-sharp 1px architectural grid of the overall portfolio.

---

### 2.7 Deep Breakdown: Pantheon Media — 7-Bar Shutter Page Transitions & WebGL Interactive Team Grid

Rev singled out Pantheon Media for its sublime motion fluidity: *"Ini web jujur naksir banget animasi transisi per page, transisi ke menu, layout mereka, di about bagian team itu ada interactive pake mouse yang cuma bisa di akses di situ doang, bikin ga boring. smooth as fuck."* Screenshot backed up in `references_scraped/06-pantheonmedia/screenshots/pantheon-viewport.png`:

```
┌────────────────────────────────────────────────────────────────────────┐
│  PANTHEON MEDIA GROUP                                  [ MENU ──> ✕ ]  │
│ ────────────────────────────────────────────────────────────────────── │
│  PAGE TRANSITION: 7-BAR SHUTTER WIPE                                   │
│  ══════════════════════════════════════════════════ (Row 1: scaleX 1)  │
│  ══════════════════════════════════════════════════ (Row 2: scaleX 1)  │
│  ══════════════════════════════════════════════════ (Row 3: scaleX 1)  │
│  ════════════════════ [ CENTER LOGO POP ] ═════════ (Row 4: Center)    │
│  ══════════════════════════════════════════════════ (Row 5: scaleX 1)  │
│  ══════════════════════════════════════════════════ (Row 6: scaleX 1)  │
│  ══════════════════════════════════════════════════ (Row 7: scaleX 1)  │
│  (Exit: scaleX 0->1 from center. Enter: scaleX 1->0 from outer edges)  │
│ ────────────────────────────────────────────────────────────────────── │
│  ABOUT / TEAM SECTION: WEBGL PIXEL DISPERSAL GRID                      │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│    │ Steve (CEO)  │  │ Team Member  │  │ Team Member  │                │
│    │  ░░ ░░ ░░    │  │   ░░ ░░      │  │     ░░ ░░ ░░ │                │
│    │  (20x20 WebGL kinetic square blocks disperse on mouse move)       │
│    └──────────────┘  └──────────────┘  └──────────────┘                │
└────────────────────────────────────────────────────────────────────────┘
```

#### 📸 Key Compositional & Motion Systems:

1. **7-Bar Cinematic Shutter Page Transition (`TransitionMaskGrid` & `TransitionMaskBlock`):**
   - Decompiled directly from `references_scraped/06-pantheonmedia/js/layout-ae05fae713302377.js`:
     The transition uses an overlay container (`f.f.pageTransitionMask`) composed of **7 horizontal full-width bars**:
     ```javascript
     Array.from({ length: 7 }, (e, t) => (
       <TransitionMaskBlock
         ref={el => blocks.current[t] = el}
         $color={theme.white}
       />
     ));
     ```
     Each bar has `transform-origin: 50% 50%` and `transform: scaleX(0)`.
   - **Page Exit Sequence (Leaving Current Page):**
     GSAP timeline expands all 7 bars outwards from the screen center:
     ```javascript
     timeline.fromTo(blocks.current, 
       { scaleX: 0 }, 
       {
         scaleX: 1,
         duration: 0.65,
         ease: "power2.inOut",
         stagger: { amount: 0.35, from: "center" }
       }
     );
     ```
     As the bars converge, a center brand icon (`TransitionMaskIcon`) animates in with a 7-step path scale delay.
   - **Page Entrance Sequence (Arriving on New Page):**
     Once the next route's DOM is mounted, the shutter bars collapse towards the outer margins:
     ```javascript
     timeline.to(blocks.current, {
       scaleX: 0,
       duration: 0.65,
       ease: "power2.inOut",
       stagger: { amount: 0.35, from: "edges" },
       onComplete: () => endPageTransition()
     }, 0.3);
     ```
     This produces that legendary "smooth as fuck" editorial wipe without jarring layout jumps.

2. **Kinetic Menu Drawer Transition (`MenuToggle` & `HeaderMenu`):**
   - Animated SVG icon switches between parallel horizontal strokes and a diagonal cross with split-text swap (`[MENU]` / `[CLOSE]`).
   - The drawer reveals child navigation links via staggered vertical translateY mask animations (`y: 110% -> 0%`), backed by fixed hairline gridline overlays (`GridlinesMain` & `GridlinesColumn`).

3. **Context-Exclusive WebGL Pixel Dispersal Grid (`SquaresMain`):**
   - Decompiled from `references_scraped/06-pantheonmedia/js/5630-3c51532c0eb1982e.js`:
     Inside `data-section="team"`, a dedicated WebGL `<canvas>` is mounted behind the team cards.
   - **GLSL Shader Architecture:**
     Divides the background into a mathematical matrix of $20 	imes 20$ blocks:
     ```glsl
     const float blockCount = 20.0;
     const float sizePerBlock = 1.0 / blockCount;

     vec2 getBlock(vec2 _uv) {
       _uv.y = (_uv.y - 0.5) * uAspectRatio + 0.5;
       return floor(_uv / sizePerBlock);
     }

     float getBlockDistance(vec2 _uv, vec2 _mouse) {
       vec2 uvBlock = getBlock(_uv);
       vec2 mouseBlock = getBlock(_mouse);
       return distance(uvBlock, mouseBlock);
     }
     ```
   - **Pointer Interaction:**
     As the user hovers over the team section, `uMouse`, `uVelocity`, and `uDirection` calculate the cursor's ripple radius. Kinetic square pixels disperse, brighten, and dissolve under the pointer in real-time, creating a mesmerizing, reactive digital topography.
   - **Why Rev Loves It:** It is **exclusive to that specific section**—it does not repeat everywhere, making discovering it feel like uncovering a bespoke interactive gem.

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/transitions/ShutterPageTransition.tsx` & `src/components/showcase/InteractiveMatrixGrid.tsx`.
- **Application:**
  - `ShutterPageTransition`: Wraps Next.js App Router layout transitions (`template.tsx` or route transitions) using 7 horizontal shutter bars staggered from center to edges.
  - `InteractiveMatrixGrid`: Embedded as the interactive backdrop for Revworks Experience / Team / Contact section, featuring the $20 	imes 20$ GLSL square dispersal shader responsive to mouse velocity.

---

### 2.8 Deep Breakdown: Lando Norris — Dual-Persona Fluid Blob Mask & Hypnotic Hero Immersion

Rev gave high praise to Lando Norris's hero interaction: *"jujur gw ga suka sama personality orangnya, CUMA gw demen banget sama design websitenya. itu di halaman awal (bagian yang ada foto lando gede banget) itu bisa di mainin pake mouse, blob yang di bawa mouse ini tadi bisa ubah lando jadi pake helm signature dia. itu eye catching banget, BAHKAN SAMPE GW GA SADAR KALO PAGENYA BISA DI SCROLL. Great work jujur buat team dibelakang web ini."* Screenshot backed up in `references_scraped/08-landonorris/screenshots/lando-hero-blob-reveal.png`:

```
┌────────────────────────────────────────────────────────────────────────┐
│  LN 04                                                   [ ON / OFF ]  │
│ ────────────────────────────────────────────────────────────────────── │
│                                                                        │
│            ┌──────────────────────────────────────────┐                │
│            │  LAYER 1: Base Portrait Photo            │                │
│            │  (Casual / Executive Mode)               │                │
│            │                                          │                │
│            │            ╭────────────╮                │                │
│            │         ╭──╯            ╰──╮             │                │
│            │        │  LAYER 2: HELMET   │ <── Pointer│                │
│            │        │  CYBER VISOR MASK  │     Fluid  │                │
│            │         ╰──╮            ╭──╯      Blob   │                │
│            │            ╰────────────╯         Drag   │                │
│            │                                          │                │
│            └──────────────────────────────────────────┘                │
│                                                                        │
│  "BAHKAN SAMPE GW GA SADAR KALO PAGENYA BISA DI SCROLL"                │
│  (Sticky viewport track locks user attention into tactile engagement)  │
└────────────────────────────────────────────────────────────────────────┘
```

#### 📸 Key Compositional & Motion Systems:

1. **Dual-Layer Persona Compositing:**
   - **Layer 1 (Underlying Base):** High-resolution monochrome/editorial portrait of Rev (Executive Fullstack Software Engineer mode).
   - **Layer 2 (Revealed Persona):** The exact-aligned alternate persona (Creative Technologist / Hacker mode with futuristic cyber-visor or neon terminal reflection).
   - Both layers occupy identical absolute bounding boxes (`position: absolute; inset: 0; object-fit: cover;`).

2. **Navier-Stokes Fluid Dynamics Viscous Simulation (`class rX` in `lando-by-OFF+BRAND.js`):**
   - Decompiled from `references_scraped/08-landonorris/js/lando-by-OFF+BRAND.js`:
     The reveal aperture is not a simple static circle; it is driven by a real-time **fluid velocity solver**:
     ```javascript
     class FluidSimulation {
       constructor() {
         this.options = {
           iterations_poisson: 4,    // Pressure projection iterations
           iterations_viscous: 4,    // Viscosity diffusion passes
           dissipation: 0.96,        // Fluid momentum decay
           mouse_force: 50,          // Injection impulse from pointer
           cursor_size: 18,          // Dynamic blob radius
           viscous: 30,              // Fluid thickness/stickiness
           dt: 0.014,                // Delta time step (~60-120fps)
           BFECC: true               // Back and Forth Error Compensation
         };
         this.fbos = {
           vel_0: null, vel_1: null,
           pressure_0: null, pressure_1: null,
           div: null
         };
       }
     }
     ```
   - **Liquid Trail Deform:** When the pointer moves rapidly, the blob stretches into an organic viscous droplet along the velocity vector $ec{v} = (\Delta x, \Delta y)$, lagging slightly behind the cursor with elastic surface tension before snapping back to a smooth circle when idle.

3. **Hypnotic Sticky Viewport Architecture (`home-hero`):**
   - In `references_scraped/08-landonorris/index.html`:
     ```css
     .c.home-hero {
       min-height: 100vh !important;
     }
     ```
   - The hero section is pinned with GSAP ScrollTrigger (`pin: true, scrub: 1`).
   - Because the fluid interaction feels so organic and tactile, users naturally play with the cursor for 5–10 seconds before initiating their first scroll gesture.
   - When the user finally scrolls, the blob expands to $100	ext{vw} 	imes 100	ext{vh}$, transitioning the page cleanly into the next chapter.

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/hero/DualPersonaFluidMask.tsx`
- **Application:** Revworks Hero Section.
  - **Base Layer:** Rev in clean executive editorial attire.
  - **Fluid Mask Reveal:** Dragging the mouse creates a viscous liquid portal revealing Rev with an augmented engineering HUD / terminal code reflection.
  - **Mobile / Low-Power Optimization:** Uses a lightweight 12-vertex Spring Curve on `<canvas>` or SVG `<clipPath>` for silky 60fps performance across all mobile devices.

---

## 3. Installed Skills & Tool Ecosystem

All skills are installed globally on Rev's machine and ready to be used:

- **Base Skills Directory:** `C:\Users\Rev\.gemini\config\skills\`

### Key Installed Skill Repositories:

1. **`taste-skill` (`C:\Users\Rev\.gemini\config\skills\taste-skill`)**:
   - Enforces design purity: 1 design system, 1 primary action per screen, 1 visual metaphor, maximum contrast, zero generic AI tropes.
2. **`emilkowalski-skills` (`C:\Users\Rev\.gemini\config\skills\`)**:
   - 20 interaction engineering skills: `animate`, `choreograph`, `emil-design-eng`, `animation-performance`, `find-animation-opportunities`, `learn-taste`, `gestures`, `improve-animations`, `prototype`, `remove-animations`, `review-animations`, `break-ui`, `pick-ui-library`, `apple-design`, `animation-vocabulary`.
   - Focus: Spring physics (`stiffness: 400, damping: 30`), layout projection, composite-only GPU pipelines.
3. **`impeccable` (`C:\Users\Rev\.gemini\config\skills\impeccable`)**:
   - Ruthless anti-slop guidelines: Banishes generic purple gradients, card-inside-a-card syndrome, hollow AI copy, and timid font sizes.
4. **`mengto-skills` (`C:\Users\Rev\.gemini\config\skills\mengto-skills`)**

### Tech Stack & Libraries:

- **Framework:** Next.js 16.4.6 with Turbopack, React 19.
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";` with `@theme inline` in `src/app/globals.css`).
- **Motion:** GSAP 3.12, ScrollTrigger, `@gsap/react` `useGSAP()`.
- **Smooth Scroll:** Lenis (`lenis/react`).
- **Audio DSP Engine:** Native Web Audio API (`src/lib/sound.ts`) synthesizing procedural clicks, ticks, whooshes, and harmonic chimes without external MP3s.
- **Icons:** `lucide-react`.

```

```
