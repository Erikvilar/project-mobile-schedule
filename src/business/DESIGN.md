---
name: Cyber-Elegance
colors:
  surface: '#131318'
  surface-dim: '#131318'
  surface-bright: '#39383e'
  surface-container-lowest: '#0e0e13'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f25'
  surface-container-high: '#2a292f'
  surface-container-highest: '#35343a'
  on-surface: '#e4e1e9'
  on-surface-variant: '#d4c0d7'
  inverse-surface: '#e4e1e9'
  inverse-on-surface: '#303036'
  outline: '#9d8ba0'
  outline-variant: '#514255'
  surface-tint: '#ecb2ff'
  primary: '#ecb2ff'
  on-primary: '#520071'
  primary-container: '#bd00ff'
  on-primary-container: '#ffffff'
  inverse-primary: '#9900cf'
  secondary: '#d3fbff'
  on-secondary: '#00363a'
  secondary-container: '#00eefc'
  on-secondary-container: '#00686f'
  tertiary: '#d5bcf3'
  on-tertiary: '#3a2753'
  tertiary-container: '#826d9e'
  on-tertiary-container: '#ffffff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f8d8ff'
  primary-fixed-dim: '#ecb2ff'
  on-primary-fixed: '#320047'
  on-primary-fixed-variant: '#74009f'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#00dbe9'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#eddcff'
  tertiary-fixed-dim: '#d5bcf3'
  on-tertiary-fixed: '#24113d'
  on-tertiary-fixed-variant: '#513e6b'
  background: '#131318'
  on-background: '#e4e1e9'
  surface-variant: '#35343a'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system embodies a "Cyber-Elegance" aesthetic, moving away from sterile, utilitarian AI interfaces toward a sophisticated, immersive environment. It targets a discerning audience that values both cutting-edge intelligence and digital privacy.

The style is a fusion of **Glassmorphism** and **Minimalism**, utilizing deep, nocturnal tones punctuated by neon precision. The emotional response is one of calm authority and mysterious depth—like stepping into a private, high-end sanctuary of data. Surfaces feel like polished obsidian and frosted amethyst, creating a sense of layered intelligence that feels organic yet technologically superior.

## Colors
The palette is rooted in a "Deep Space" foundation. The primary **Electric Amethyst** (#BD00FF) serves as the signature of intelligence, used for active states and critical interactions. The secondary **Cyber Cyan** (#00F0FF) provides a high-energy contrast for data visualizations and navigational accents.

The background hierarchy uses a core neutral **Midnight Onyx** (#0A0A0F) with the tertiary **Abyssal Violet** (#12002B) used for subtle container differentiation. All colors are optimized for high-end OLED displays to reinforce the theme of premium privacy.

## Typography
Typography balances futuristic geometry with technical precision. **Sora** is utilized for headings to provide a bold, wide-stanced geometric feel that suggests stability and modernity. **Hanken Grotesk** handles long-form AI responses and interface text, chosen for its extreme clarity and contemporary humanist touch.

To reinforce the sense of "Intelligence," **JetBrains Mono** is used for secondary metadata, labels, and code blocks. This monospaced element acts as a visual cue for the underlying logic and privacy-first engineering of the system.

## Layout & Spacing
The system uses a **Fluid Grid** with generous negative space to avoid the cluttered "chat-log" feel of traditional AI. Content is centered within a maximum-width container to maintain focus.

The spacing rhythm is built on an **8px base unit**. On desktop, wide 64px margins create a "gallery" feel for conversations. On mobile, the grid shifts to a 4-column layout with reduced 20px margins. Elements should use "Internal Breathing Room"—increased padding inside cards and input fields—to emphasize the airy, glass-like quality of the UI.

## Elevation & Depth
Depth is created through **Glassmorphism and Tonal Layers** rather than traditional drop shadows.
- **Level 1 (Base):** The Midnight Onyx background.
- **Level 2 (Containers):** Semi-transparent Abyssal Violet with a 20px backdrop blur and a 1px "inner-glow" stroke (10% opacity white) to define edges.
- **Level 3 (Pop-overs/Modals):** Increased transparency with a subtle "Electric Amethyst" outer glow to simulate light emission from the UI.

This creates a sense of "Information Floating in Space," reinforcing the futuristic, ethereal brand personality.

## Shapes
The shape language is **Refined and Rounded**. Elements utilize a 0.5rem (8px) base radius to feel approachable yet structured. Large containers and main interface cards use the `rounded-xl` (24px) setting to create a soft, protective "shell" around data. Interactive elements like buttons never use sharp corners, ensuring the futuristic aesthetic feels sophisticated rather than aggressive.

## Components
- **Buttons:** Primary buttons use a vibrant Cyber Cyan to Amethyst gradient with a slight outer glow on hover. Text is always uppercase JetBrains Mono for a technical feel.
- **Input Fields:** The main prompt input is a wide, pill-shaped glass container with a constant 1px stroke. When active, the stroke pulses with a soft violet light.
- **Chips:** Small, low-contrast capsules used for "Suggested Prompts." They feature a glass-blur background and no border until hovered.
- **Cards:** AI responses are housed in "Glass Panels" with high backdrop-blur values. The border-top has a 2px Cyber Cyan accent to denote the start of a new intelligence output.
- **Privacy Indicators:** A persistent, micro-animated "Shield" component in the corner of the UI, using JetBrains Mono to display real-time encryption status.
- **Lists:** Clean, borderless list items separated by subtle "line-glows" (gradient lines that fade out at the edges).