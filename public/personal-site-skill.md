# Kelly's personal site — design skill

## Role and outcome

Design and build a fast, personal portfolio for Kelly, a senior front-end
developer. Use the supplied resume as the source of truth for experience,
education, skills, and measurable outcomes. Write concise first-person copy and
do not invent claims.

Success means the site feels cohesive, explains Kelly's work quickly, stays
usable on mobile, and exposes its primary content to search engines before any
interactive code runs.

## Design system

Use the supplied template as visual input, then define reusable tokens before
building components:

- Color: charcoal surfaces, mint accents, warm white text, and accessible muted
  states.
- Type: a clear display hierarchy paired with compact technical labels.
- Layout: a spacing scale, content widths, grid rules, borders, radii, and
  responsive breakpoints.
- Motion: restrained transitions with consistent duration and easing tokens.

Keep the result spacious and slightly cyber. Avoid purple-blue rainbow
gradients, excessive glow, and generic recruitment slogans.

## Information architecture

Organize the page into five focused content regions:

1. Introduction and current focus.
2. Selected work, grouped by project and outcome.
3. AI workflow and working practices.
4. About, education, and technical toolkit.
5. Contact links and replay control.

## Implementation constraints

Use Next.js App Router, React, TypeScript, and native HTML/CSS components. Keep
the content and semantic document structure in Server Components or statically
rendered HTML. Limit Client Components to interactions that need browser APIs.
Add accurate title, description, social metadata, heading hierarchy, and link
labels. The core portfolio must remain readable without JavaScript.

Build mobile-first. Preserve comfortable reading widths, touch targets, keyboard
focus, and stable layouts from 320px upward. Avoid horizontal overflow and test
short screens as well as narrow screens.

## 3D and motion

Use Three.js only for small, project-specific scenes with subtle depth, pointer
response, and a clear relationship to the surrounding content. Keep the opening
lightweight and do not load WebGL there.

Load each 3D client island only when it approaches the viewport. Pause rendering
offscreen, in hidden tabs, and while the intro is open. Cap resolution and frame
rate on mobile, dispose geometries, materials, renderers, and observers on
unmount, and provide static, reduced-motion, Save-Data, and WebGL-failure
fallbacks.

## Opening sequence

Present a scripted reenactment: weak prompt, generic first draft, reaction,
specific brief, proposed plan, approval, and final page. Keep Skip available,
pause while the tab is hidden, clean up timers, and support Escape, replay, and
reduced motion. The first-draft website fills the screen without a browser frame
or simultaneous chat.

## Required plan

Before writing code, propose:

1. Design tokens and reusable visual primitives.
2. Section map and content hierarchy.
3. Component boundaries and Server/Client ownership.
4. A scene-by-scene Three.js plan with fallback behavior.
5. SSR, SEO, accessibility, performance, and responsive checks.

Stop after the plan and wait for feedback. After approval, implement and verify
the production build, mobile overflow, metadata, links, focus behavior, reduced
motion, WebGL cleanup, intro timing, skip, and replay.
