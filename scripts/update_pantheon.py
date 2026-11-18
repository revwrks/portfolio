with open('AGENT_HANDOVER_MASTER_PLAN.md', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update table row 7 for Pantheon Media
old_table_part = """| **7** | **Pantheon Media** (`pantheonmedia.com`)       | _"cara mereka bikin landing itu kaya ngenalin diri mereka dengan berani, cuma masih approachable"_                                                                                         |"""

new_table_part = """| **7** | **Pantheon Media** (`pantheonmedia.com`)       | _"Ini web jujur naksir banget animasi transisi per page, transisi ke menu, layout mereka, di about bagian team itu ada interactive pake mouse yang cuma bisa di akses di situ doang, bikin ga boring. smooth as fuck."_ | Cinematic Editorial Transitions & WebGL Interactive Team Grid: 7-bar staggered horizontal shutter page transition (from center to edges), kinetic menu toggle drawer, and About page WebGL pixel-square mouse dispersal shader (`uMouse`, `uVelocity`, 20x20 block matrix) (Details in §2.7). |"""

assert old_table_part in text, "Table part for Pantheon Media not found!"
text = text.replace(old_table_part, new_table_part)

# 2. Insert Section 2.7
target_insertion = """- **Component File:** `src/components/showcase/TactileSandbox.tsx` & spring utility hooks in `src/hooks/useSpringInteraction.ts`.
- **Application:** Embedded within the Skills / Toolbox section as an interactive easter egg. Visitors can play with Rev's tech badges using real spring physics while preserving the razor-sharp 1px architectural grid of the overall portfolio.

---"""

sections_to_add = target_insertion + """

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
     Divides the background into a mathematical matrix of $20 \times 20$ blocks:
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
  - `InteractiveMatrixGrid`: Embedded as the interactive backdrop for Revworks Experience / Team / Contact section, featuring the $20 \times 20$ GLSL square dispersal shader responsive to mouse velocity.

---"""

assert target_insertion in text, "Target insertion point not found!"
text = text.replace(target_insertion, sections_to_add)

with open('AGENT_HANDOVER_MASTER_PLAN.md', 'w', encoding='utf-8') as f:
    f.write(text)

print('Successfully added Pantheon Media (§2.7) to AGENT_HANDOVER_MASTER_PLAN.md!')
