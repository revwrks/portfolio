with open('AGENT_HANDOVER_MASTER_PLAN.md', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update table row 8 for Lando Norris
old_table_part = """| **8** | **Lando Norris** (`landonorris.com`)           | _"literal cuma ngasih lando helm setengah setengah pake mouse movement ini di aplikasiin ke hero photo 1 sama 2 (yang beda pose) kan bisa"_                                                |"""

new_table_part = """| **8** | **Lando Norris** (`landonorris.com`)           | _"jujur gw ga suka sama personality orangnya, CUMA gw demen banget sama design websitenya. itu di halaman awal (bagian yang ada foto lando gede banget) itu bisa di mainin pake mouse, blob yang di bawa mouse ini tadi bisa ubah lando jadi pake helm signature dia. itu eye catching banget, BAHKAN SAMPE GW GA SADAR KALO PAGENYA BISA DI SCROLL. Great work jujur buat team dibelakang web ini."_ | Dual-Persona Fluid Viscous Mask: Navier-Stokes fluid velocity solver & spring-deformed liquid blob mask on mouse movement, compositing Base Hero Portrait vs Alternate Cyberpunk/Architect Persona (`mix-blend-mode` / WebGL FBO mask) (Details in §2.8). |"""

assert old_table_part in text, "Table part for Lando Norris not found!"
text = text.replace(old_table_part, new_table_part)

# 2. Insert Section 2.8
target_insertion = """  - `InteractiveMatrixGrid`: Embedded as the interactive backdrop for Revworks Experience / Team / Contact section, featuring the $20 \times 20$ GLSL square dispersal shader responsive to mouse velocity.

---"""

sections_to_add = target_insertion + """

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
   - **Liquid Trail Deform:** When the pointer moves rapidly, the blob stretches into an organic viscous droplet along the velocity vector $\vec{v} = (\Delta x, \Delta y)$, lagging slightly behind the cursor with elastic surface tension before snapping back to a smooth circle when idle.

3. **Hypnotic Sticky Viewport Architecture (`home-hero`):**
   - In `references_scraped/08-landonorris/index.html`:
     ```css
     .c.home-hero {
       min-height: 100vh !important;
     }
     ```
   - The hero section is pinned with GSAP ScrollTrigger (`pin: true, scrub: 1`).
   - Because the fluid interaction feels so organic and tactile, users naturally play with the cursor for 5–10 seconds before initiating their first scroll gesture.
   - When the user finally scrolls, the blob expands to $100\text{vw} \times 100\text{vh}$, transitioning the page cleanly into the next chapter.

#### 💻 Technical Blueprint for Revworks Implementation:
- **Component File:** `src/components/hero/DualPersonaFluidMask.tsx`
- **Application:** Revworks Hero Section.
  - **Base Layer:** Rev in clean executive editorial attire.
  - **Fluid Mask Reveal:** Dragging the mouse creates a viscous liquid portal revealing Rev with an augmented engineering HUD / terminal code reflection.
  - **Mobile / Low-Power Optimization:** Uses a lightweight 12-vertex Spring Curve on `<canvas>` or SVG `<clipPath>` for silky 60fps performance across all mobile devices.

---"""

assert target_insertion in text, "Target insertion point not found!"
text = text.replace(target_insertion, sections_to_add)

with open('AGENT_HANDOVER_MASTER_PLAN.md', 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully added Lando Norris (§2.8) to AGENT_HANDOVER_MASTER_PLAN.md!')
