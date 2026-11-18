with open('AGENT_HANDOVER_MASTER_PLAN.md', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update the table rows for Photoyoshi and Getty
old_table_part = """| **2** | **Photoyoshi** (`photoyoshi.com`)              | _"gw demen landing page dia awal banget buka page"_.                                                                                                                                       |
| **3** | **Getty Tracing Art** (`getty.edu/tracingart`) | _"negative space mastering yang gila buat fokusin konten utama yang disajiin"_                                                                                                             |"""

new_table_part = """| **2** | **Photoyoshi** (`photoyoshi.com`)              | _"gw suka banget animasi landing halaman awal ini (gambar 1), ini ga sampe masuk halaman utama, CUMA LOADING AJA, cuman tatanan tulisan, foto, angka kecil itu, dan lain lain itu gw demen banget. aesthetically pleasing."_ | Minimalist editorial preloader (`.l-splash`): warm sand canvas (`#e7e5de`), colossal split typography `PHOTOYOSHI` (`top: -14vw` stagger), centered framed photo (`inset(22vh 38vw)`), bilateral crosshair reticles (`.c-scope --grid`), and bottom 3-column HUD with high-speed ticker (00 to 100 in 10ms +3 step interval) (Details in §2.2). |
| **3** | **Getty Tracing Art** (`getty.edu/tracingart`) | _"Gw suka banget cara mereka manfaatin negative space untuk menekankan point atau konten yang mau mereka sampaikan (gambar 2)"_                                                             | Negative space mastering (~75% breathing room): WebGL Instanced Sprite radial constellation with center exclusion radius (`minRadius` & `uEdgeRadius` smoothstep), italic + upright serif typography (*the World of the GPI*), ghost bounding boxes, floating interactive framed artworks with Raycast hover, vertical scroll pill, and tutorial micro-pill (Details in §2.3). |"""

assert old_table_part in text, "Table part not found!"
text = text.replace(old_table_part, new_table_part)

# 2. Add Section 2.2 and 2.3 right after Section 2.1 Technical Blueprint (before Section 3)
target_insertion = """#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/showcase/IsometricCardStack.tsx`
- **Engine:** Three.js / React Three Fiber (`@react-three/fiber`) or GSAP 3D CSS transforms with hardware-accelerated `transform-style: preserve-3d`.
- **Card Data:** Map 6–12 of Rev's top engineering projects (Garuda TopUp, Digi-Art, Chorus, Tamboer, etc.) as the 3D card entities.
- **Scroll Driver:** GSAP ScrollTrigger with `pin: true` and `scrub: 0.8` mapped to the 6-stage progression curve.
- **Interactivity:** Raycaster click + Pill click smoothly tweens camera position and elevates selected project card.

---"""

sections_to_add = target_insertion + """

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
     $$\text{angle} = a_{\text{AngleRadius}}.x, \quad r_{\text{start}} = a_{\text{AngleRadius}}.y, \quad r_{\text{min}} = a_{\text{AngleRadius}}.z$$
     $$x = \cos(\text{angle}) \cdot r, \quad y = \sin(\text{angle}) \cdot r, \quad z = \text{mix}(-0.3, 0.0, a_{\text{Random}}.x)$$
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

---"""

assert target_insertion in text, "Target insertion point not found!"
text = text.replace(target_insertion, sections_to_add)

with open('AGENT_HANDOVER_MASTER_PLAN.md', 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully updated AGENT_HANDOVER_MASTER_PLAN.md with Photoyoshi (§2.2) and Getty Tracing Art (§2.3)!')
