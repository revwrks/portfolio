# REVWORKS: "CLEAN BRUTALIST" ARCHITECTURAL REDESIGN
## Master Implementation Blueprint & Execution Roadmap

> **Author:** Claire (Senior Fullstack Architect) & Rev  
> **Target Aesthetic:** High-Precision Clean Brutalism ("Architectural Brutalism Done Right")  
> **Core Tenet:** 100% Bespoke, Cinematic, Scrollable, Tactile, Buttery-Smooth, and Zero Generic AI Slop.

---

## 1. Executive Vision & Core Paradigm

The Revworks portfolio is undergoing a total transformation. We are ditching the generic template paradigm and rebuilding the entire experience from the ground up into a **Cinematic, High-Precision Clean Brutalist Portfolio**.

It unites the finest engineering discoveries reverse-engineered from the **8 reference sites** into one cohesive, uncompromised narrative:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  REVWORKS ARCHITECTURAL SYSTEM MATRIX                                        │
├──────────────────────┬───────────────────────────────────────────────────────┤
│  Visual Framework    │  1px Hairline Geometric Grid + Monospace Telemetry    │
│  Atmospheric Tone    │  Dual Palette: Warm Architectural Sand & Matte Carbon │
│  Hero Experience     │  Lando Norris Navier-Stokes Dual-Persona Fluid Mask   │
│  Preloader Entrance  │  Photoyoshi Colossal Split-Text + 10ms Ticker HUD     │
│  Project Showcase    │  Inkwell Tech 3D Isometric Card Deck Conveyor         │
│  Focus Philosophy    │  Getty Tracing Art 75% Negative Space Constellation   │
│  Project Directory   │  Cappen 1px Tabular Index with 3D Kinetic Portals     │
│  Capabilities Roster │  Phantom Land 256x256 WebGL Depth Map Holographic Grid│
│  Page Transitions    │  Pantheon Media 7-Bar Staggered Shutter Wipes         │
│  Tactile Micro-UX    │  Mat Voyce Under-Damped Rubber Spring Physics (k=450) │
│  Sonic Feedback      │  Procedural Web Audio API DSP Synthesis (No MP3 bloat)│
│  Executive Utility   │  One-Click / @media print Pure ATS 1-Column Resume    │
└──────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 2. The 7-Act Architectural Scroll (Page Anatomy)

The entire application runs on **Lenis Smooth Scroll** locked at 60–120fps with GSAP ScrollTrigger timeline choreography:

### Act 0: The Telemetry Preloader (`AestheticPreloader.tsx`)
*Inspired by: Photoyoshi & Cappen*
- **Canvas:** Warm sand paper (`#e7e5de`) overlay spanning 100vw/100vh (`z-index: 10000`).
- **Colossal Split Title:** Teks `REVWORKS` raksasa dengan dua layer `.in` dan `.out` yang terpotong mask overflow, bergeser per karakter (*staggered*) via GSAP.
- **Bilateral Hairline Crosshairs:** Sepasang target reticle `+` (garis 1px) di kedua sisi foto fokus.
- **Centered Architectural Crop:** Foto profil Rev di dalam `clip-path: inset(22vh 38vw 22vh 38vw)`.
- **Bottom 3-Column HUD:**
  - Kiri: Badge katakana (`フルスタックエンジニア [•] REVWORKS`).
  - Tengah: Bio editorial ringkas (*"Rev — Fullstack Engineer & Creative Technologist based in Indonesia"*).
  - Kanan: Numerical counter yang dipacu `shuffleNumberCounter` tiap 10ms (+3 step) melaju dari `00` ke `100` (~330ms total time).

### Act 1: The Dual-Persona Hero & Sticky Mask (`DualPersonaFluidHero.tsx`)
*Inspired by: Lando Norris & Pantheon Media*
- **Sticky Track Viewport:** Section hero dikunci dengan `position: sticky; min-height: 100vh;` sehingga pandangan pengunjung terkunci sebelum mulai scroll.
- **Dual-Layer Compositing:**
  - **Layer 1 (Base):** Foto editorial Rev dalam balutan busana formal arsitektural (*Executive Fullstack Architect*).
  - **Layer 2 (Revealed Persona):** Foto Rev dengan sudut pose identik berbalut *Augmented Cyberpunk Terminal HUD / Visor* (*Creative Technologist / System Hacker*).
- **Navier-Stokes Fluid Dynamics Blob Mask:**
  - Kursor mouse menyeret blob cairan viskos yang memanjang elastis mengikuti vektor percepatan mouse $\vec{v} = (\Delta x, \Delta y)$.
  - Di mana pun blob itu lewat, Layer 2 tersingkap secara organik dengan tegangan permukaan (*surface tension*).
- **Scroll Expansion Transition:** Saat scroll pertama dilakukan, blob membesar secara eksponensial memenuhi layar ($100\text{vw} \times 100\text{vh}$), menyapu layar masuk ke Act 2.

### Act 2: The Negative Space Philosophy Void (`NegativeSpacePhilosophy.tsx`)
*Inspired by: Getty Tracing Art*
- **Negative Space Ratio:** 75%–80% ruang kosong putih bersih/sand, membebaskan mata dari polusi visual.
- **Dual-Style Serif Typographic Anchor:**
  - Teks tengah: *"the Craft of Revworks"* (*"the Craft"* dalam italic serif anggun, *"of Revworks"* dalam Roman serif klasik kokoh).
- **Radial Exclusion Constellation:**
  - Tiga node kartu arsitektur inti (misal: *Distributed Systems*, *Spatial WebGL*, *High-Throughput Backends*) melayang pelan di orbit radial dengan proteksi radius fragment shader (`radiusAlpha = smoothstep(...)`) agar tidak pernah menabrak tipografi tengah.
  - Ghost bounding box transparan (`rgba(0,0,0,0.03)`) disebar acak untuk memberi ritme grid arsitektural.

### Act 3: 3D Isometric Card Deck Conveyor (`IsometricCardShowcase.tsx`)
*Inspired by: Inkwell Tech*
- **3D Canvas Pipeline:** Menggunakan Three.js / React Three Fiber yang diikat ke GSAP ScrollTrigger (`pin: true, scrub: 0.8`).
- **6-Stage Progression Curve:**
  1. *Step 1:* Kartu tunggal frontal di tengah layar.
  2. *Step 2:* Kemiringan isometrik (pitch $35.26^\circ$, yaw $45^\circ$), memperlihatkan ketebalan fisik tumpukan 6–12 kartu project.
  3. *Step 3:* Fanning diagonal ke belakang sepanjang sumbu $Z/X/Y$:
     $$\vec{P}_i(s) = \vec{P}_0 + i \cdot s \cdot [\Delta x, \Delta y, -\Delta z]^T$$
  4. *Step 4:* Gliding kamera melintasi rel konveyor diagonal.
  5. *Step 5:* Array penuh memanjang dengan stage selector HUD (`Architecture [ 09 ] [ Garuda TopUp ]`).
  6. *Step 6:* Interaksi Raycaster—klik kartu atau klik pill mengangkat kartu aktif ($\Delta y = +0.5$, scale $1.05\times$) dan meredupkan kartu lainnya ke 70% opacity.

### Act 4: High-Density Brutalist Project Directory (`BrutalistProjectTable.tsx`)
*Inspired by: Cappen*
- **1px Hairline Tabular Grid:** Seluruh katalog proyek (Garuda TopUp, Digi-Art, Chorus, Tamboer, dll.) disusun dalam baris tabel brutalist hairline 1px.
- **Monospace Taxonomy Header:** Kolom terstruktur rapi: `[ID]`, `[PROJECT NAME]`, `[RELEASE YEAR]`, `[CORE CAPABILITIES]`, `[METRICS]`, `[ACTION]`.
- **3D Kinetic Hover Portals:**
  - Tiap baris yang disentuh kursor memekarkan thumbnail portal floating dengan kemiringan 3D interaktif:
    ```css
    transform: perspective(1000px) rotateX(calc(var(--mouse-y) * -14deg)) rotateY(calc(var(--mouse-x) * 14deg));
    ```
- **Magnetic Action Indicator:** Tombol link lingkaran magnetis dengan ikon panah diagonal (`#d-arrow`) berotasi $45^\circ$.

### Act 5: Holographic Capabilities Roster & Dispersal Matrix (`HolographicCapabilitiesGrid.tsx`)
*Inspired by: Phantom Land & Pantheon Media*
- **20x20 WebGL Pixel Dispersal Background:** Di belakang grid skill/pengalaman, shader WebGL merespons mouse dengan riak kotak-kotak piksel kinetik yang berpencar (*disperse*) dan memudar real-time.
- **Holographic 3D Cards via Depth Map Displacement:**
  - Kartu arsitektur inti dipasangkan dengan grayscale depth map 256x256.
  - Pergerakan kursor menggeser UV texture berdasarkan kedalaman $z$, menghasilkan ilusi paralaks 3D fotorealistis tanpa poligon berat.
- **Directional Shooting Arrows & Expanding Hairlines:**
  - Pemisah section `<hr class="separator" style="transform: scaleX(0)"/>` memanjang horizontal (`scaleX(0) -> scaleX(1)`) via `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Ikon panah brutalist yang tangkainya memanjang dan menembak maju saat di-hover.

### Act 6: Tactile Sandbox & Engineering Easter Eggs (`TactileSandbox.tsx`)
*Inspired by: Mat Voyce*
- **Tactile Brutalism Playground:** Di dalam frame hairline 1px, kumpulan badge teknologi Rev (`[Next.js]`, `[TypeScript]`, `[Three.js]`, `[WASM]`, `[Docker]`, `[Rapier]`) dapat **di-drag dan dilempar secara fisik**!
- **Under-Damped Rubber Spring Physics:**
  $$m \frac{d^2 x}{dt^2} + c \frac{dx}{dt} + k x = 0 \quad (m=0.8, c=22, k=450)$$
  - Badge membal di dinding batas grid lalu kembali ke posisinya dengan momentum elastis.
- **Tactile Squish Controls:** Tombol-tombol kontrol (Sound Switch, Theme Toggle, ATS Mode) mengalami kompresi fisik sesaat (`scale(0.94, 1.06)`) disertai klik sintetis mechanical switch dari Web Audio API.

### Act 7: The Colophon & Pure ATS Resume Modal (`AtsResumeModule.tsx`)
*Inspired by: Executive Engineering Standards*
- **One-Click ATS Mode:** Tombol `PRINT / EXPORT ATS RESUME` yang mentransformasikan seluruh visual WebGL menjadi resume teks monokrom 1 kolom berstandar Harvard/FAANG ATS (`@media print`).
- **Terminal System Status:** Telemetri live build, git commit hash, uptime, dan latency clock.

---

## 3. Global Motion & Transition Infrastructure

### 1. 7-Bar Cinematic Shutter Page Transition (`ShutterTransition.tsx`)
*Decompiled from Pantheon Media (`layout-ae05fae713302377.js`)*
- Menggunakan overlay 7 bar horizontal (`scaleX(0)` dengan transform origin di tengah).
- **Exit:** GSAP timeline memanjangkan 7 bar dari tengah ke luar (`stagger: { from: 'center' }`).
- **Enter:** Saat route berganti, 7 bar runtuh menyusut dari pinggir ke tengah (`stagger: { from: 'edges' }`).

### 2. Dual-State Sound Design Engine (`src/lib/sound.ts`)
*Decompiled from Phantom Land & Mat Voyce*
- Zero MP3 bandwidth bloat. Seluruh audio disintesis secara algoritmik menggunakan Web Audio API:
  - **Sub-Bass Drone (55Hz sine wave):** Memberi kesan berat, tenang, dan sinematik saat audio `[ON]`.
  - **Mechanical Click (1200Hz sine chirp with exponential decay):** Memberi feedback fisik saat tombol ditekan.
  - **Hover Blip (800Hz gentle high-pass pop):** Feedback mikro saat navigasi disentuh.

---

## 4. Asset Generation & Visual Processing Plan

Untuk memenuhi instruksi Rev (*"manfaatin image-generation buat bikin asset asset yang lu butuh dan mungkin buat bikin gambar hero versi background yang udah di ilangin"*):

1. **Hero Dual-Persona Cutouts:**
   - Ambil foto resolusi tinggi `public/rev.jpg` (2000x3000) dan `public/rev2.JPG` (4000x6000).
   - Ekstrak subjek Rev tanpa background menjadi PNG transparan (`rev-clean-cutout.png`).
   - Buat companion mask layer: Versi Rev dengan *cyberpunk engineering terminal visor* / refleksi kode matriks fotorealistis menggunakan subagent `image-generator` agar cocok untuk efek Lando Norris reveal!
2. **Depth Maps untuk WebGL Parallax:**
   - Generate 256x256 grayscale depth map WebP untuk kartu arsitektur utama agar shader UV displacement Phantom Land berjalan mulus.
3. **SVG Glyph & Technical Reticles:**
   - Ikon-ikon bidikan optik (`.c-scope`), panah tembak brutalist, dan katakana badges.

---

## 5. Implementation Phasing & Milestones

```
PHASE 1: FOUNDATION & DESIGN TOKENS
├── 1. Install missing core packages: `gsap`, `@gsap/react`, `three`, `@types/three`, `lenis`
├── 2. Configure Tailwind CSS v4 Clean Brutalist theme tokens (hairline borders, sand/carbon palette)
└── 3. Setup Lenis smooth-scroll provider & GSAP ticker sync

PHASE 2: GLOBAL TRANSITIONS & AUDIO ENGINE
├── 1. Build 7-Bar Horizontal Shutter Page Transition (`ShutterTransition.tsx`)
├── 2. Implement Web Audio API procedural DSP sound synthesizer (`src/lib/sound.ts`)
└── 3. Build Photoyoshi/Cappen Aesthetic Preloader (`AestheticPreloader.tsx`)

PHASE 3: HERO SECTION & DUAL-PERSONA FLUID MASK
├── 1. Process & generate Rev dual-persona portrait assets (Executive vs Cyber-Visor)
├── 2. Build Navier-Stokes fluid velocity solver on FBO / Spring Blob Canvas
└── 3. Assemble `DualPersonaFluidHero.tsx` with sticky viewport pinning

PHASE 4: 3D SHOWCASE & NEGATIVE SPACE VOID
├── 1. Implement Getty Tracing Art 75% Negative Space Constellation (`NegativeSpacePhilosophy.tsx`)
├── 2. Build Inkwell Tech 3D Isometric Card Deck Conveyor (`IsometricCardShowcase.tsx`)
└── 3. Wire Raycaster interaction & stage selector HUD pills

PHASE 5: BRUTALIST DIRECTORY & HOLOGRAPHIC GRID
├── 1. Build Cappen 1px Tabular Project Index with 3D Hover Portals (`BrutalistProjectTable.tsx`)
├── 2. Implement Phantom Land WebGL Depth Map displacement cards (`HolographicCapabilitiesGrid.tsx`)
└── 3. Integrate Pantheon 20x20 kinetic square dispersal background shader

PHASE 6: TACTILE PLAYGROUND, ATS ISOLATION & AUDIT
├── 1. Build Mat Voyce Draggable Physics Tech Badges Sandbox (`TactileSandbox.tsx`)
├── 2. Create One-Click Harvard ATS Resume modal & `@media print` stylesheet
├── 3. Full 60fps performance profiling, mobile responsiveness QA, and anti-slop audit
```

---

*Handover document ready for execution upon user confirmation.*
