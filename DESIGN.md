---
name: RadarKit
description: A Git-native, Markdown-first intelligence radar.
colors:
  signal-coral: "#e86443"
  signal-coral-deep: "#ba4d34"
  paper: "#eeeae2"
  surface: "#f7f5ef"
  graphite: "#171716"
  line: "#d2cec4"
  line-strong: "#bdb8ac"
typography:
  display:
    fontFamily: "Cabinet Grotesk, Avenir Next, sans-serif"
    fontSize: "clamp(3.7rem, 7.5vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.085em"
  body:
    fontFamily: "Satoshi, Avenir Next, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "0.08em"
rounded:
  square: "0px"
  circle: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "56px"
  xl: "74px"
components:
  button-primary:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "0 18px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.square}"
    padding: "0 18px"
---

# Design System: RadarKit

## Overview

**Creative North Star: "The Cutting Bench Radar"**

RadarKit treats information as film on a workbench: every Signal is a frame, the rail is the reading order, and the orange tape mark shows where attention stopped. The experience is a reader first — editorial enough to reward staying, technical enough to make provenance and state visible.

The visual world is built from graphite, paper, hairline dividers, and one signal-coral accent. It is deliberately not a SaaS cockpit: no widget mosaic, neon atmosphere, decorative gradients, or ornamental glass. Motion is limited to the sweep of a live radar, a restrained reveal for rows, and tactile transforms on interaction.

**Key Characteristics:**

- One continuous rail for navigation and filtering.
- Text-first Signals with source traceability.
- Paper/graphite light and dark scenes with the same geometry.
- Coral is a mark of activity, not a second palette.

## Colors

The palette is restrained: warm paper and graphite do the reading work; signal coral marks activity, selection, and outbound actions.

### Primary

- **Signal Coral** (`#e86443`): Live dots, active rail marks, sweep points, and primary moments of attention.
- **Signal Coral Deep** (`#ba4d34`): Accessible coral text on paper and quiet outbound links.

### Neutral

- **Paper** (`#eeeae2`): Light-mode page ground and the default reading scene.
- **Surface** (`#f7f5ef`): Raised tonal surface for controls, search, and archive cells.
- **Graphite** (`#171716`): Primary text, action button, radar bench, and structural rules.
- **Line** (`#d2cec4`): Hairline dividers and quiet boundaries.
- **Line Strong** (`#bdb8ac`): Focusable control boundaries and secondary strokes.

### Named Rules

**The One Tape Rule.** Coral is the only chromatic accent. Use it to show signal, selection, or action; never as ambient decoration.

## Typography

**Display Font:** Cabinet Grotesk (with Avenir Next and sans-serif fallbacks)
**Body Font:** Satoshi (with Avenir Next and sans-serif fallbacks)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace fallback)

**Character:** The display face is condensed, blunt, and editorial without becoming nostalgic. Body copy stays neutral and calm; mono labels carry dates, scores, source status, and operational detail.

### Hierarchy

- **Display** (800, clamp 3.7rem–7rem, 0.86 line-height): Opening thesis and Signal detail titles.
- **Headline** (800, clamp 2rem–3.5rem, 0.95 line-height): Section starts and page titles.
- **Title** (800, 1.35rem–2rem, 1.02 line-height): Signal rows and source/topic names.
- **Body** (400, 16px–19px, 1.45–1.65 line-height): Explanatory copy and Signal prose.
- **Label** (700, 10px, 0.08em, uppercase): Dates, health, scores, and system notes.

### Named Rules

**The Signal-First Rule.** Headlines carry the product voice; mono labels carry system state. Never make a small eyebrow do the work of a headline.

## Layout

The main container is capped at 1380px with 28px side margins on desktop and 16px on mobile. The home first viewport uses an asymmetric two-column split: left-aligned thesis and action, radar bench on the right. The rail below is a grid of equal selection cells with the active state marked by a 2px coral underside.

Feed rows use a 51px index column, flexible reading column, and 57px score column. The side mix column collapses below the feed on narrower screens. At 640px, rails collapse to three visible cells, filters wrap, and all asymmetry becomes a single column.

## Elevation & Depth

RadarKit is flat by default. Depth comes from tonal layering, hairline borders, the graphite radar bench, and one restrained paper-colored offset under the bench. The search surface is the only elevated overlay and uses a soft ambient shadow because it owns focus above the reader.

### Shadow Vocabulary

- **Bench offset** (`16px 18px 0 rgba(232, 100, 67, .18)`): A physical tape shadow under the hero radar only.
- **Search surface** (`0 22px 50px rgba(35, 31, 25, .08)`): Ambient separation for the search dialog.

### Named Rules

**The Flat-By-Default Rule.** A surface earns elevation only when it owns focus or needs to read as a physical instrument.

## Shapes

Most surfaces are square and editorial. Buttons, filter cells, Signal rows, and archive cells use 0px radius and one-pixel strokes. The brand mark, status dot, and workflow nodes are circles because they describe a sensor, a live state, or a step. Never round a container merely to make it friendly.

## Components

### Buttons

- **Shape:** Square, editorial, 0px radius.
- **Primary:** Graphite fill with paper text and 45px minimum height; coral on hover.
- **Hover / Focus:** Background and border move to coral; `:active` translates 1px down and scales to 0.98.
- **Secondary:** Transparent with a strong border on hover.

### Chips

- **Style:** Signal tags are inline mono labels with no pill container; topic marks use deep coral text.
- **State:** Active filters use paper surfaces and coral text; clearing a filter uses a quiet coral-tinted surface.

### Cards / Containers

- **Corner Style:** Square except instrument circles.
- **Background:** Paper ground, raised surface, or graphite bench.
- **Shadow Strategy:** Flat at rest; use only the documented bench offset and search shadow.
- **Border:** 1px hairline rules, 2px only for active/primary states.
- **Internal Padding:** 16–24px for rows and controls; 56–74px between page sections.

### Inputs / Fields

- **Style:** Transparent input inside a tonal surface with a 1px border around its field group.
- **Focus:** Native visible focus ring plus coral border state.
- **Error / Empty:** Inline copy explains recovery; empty feed keeps the same rail and asks the reader to clear a cut.

### Navigation

- **Style:** Low chrome topbar with text links, 13px semibold labels, and a 2px coral underside for the active path.
- **Mobile:** The nav drops below the brand row; search and GitHub stay visible, theme toggle yields to space.

### Cutting Bench Rail

The signature component is a punched selection rail: fixed cells, numeric counts, active underside, and a light translation on hover. It appears in the main home navigation and is echoed by archive and source rows.

## Do's and Don'ts

### Do:

- **Do** keep the first viewport split and left-aligned.
- **Do** use source, topic, date, and score as real reading metadata.
- **Do** preserve the coral mark as a scarce state signal.
- **Do** keep motion transform/opacity-based and honor reduced motion.
- **Do** make desktop and mobile use the same rail grammar.

### Don't:

- **Don't** turn the reader into a widget dashboard.
- **Don't** add neon gradients, decorative glass, or a second accent color.
- **Don't** use rounded cards as the default container language.
- **Don't** hide source provenance behind a secondary interaction.
- **Don't** fill the empty radar with invented content; keep the first-run state explicit until real Markdown exists.
