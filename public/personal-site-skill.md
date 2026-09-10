# Kelly's personal site — design skill

A project-specific design brief for building and reviewing this portfolio.

## Voice
Write like Kelly is introducing herself to another person. Use first-person,
concrete language. Keep technical facts and outcomes accurate. Avoid grand
slogans, corporate adjectives, invented hobbies, and fictional achievements.
Keep employment and education details grounded in verified source material.

## Visual direction
Charcoal background, mint accents, warm white text, fine borders, generous
spacing. A little cyber, with restrained decorative details. Avoid purple-blue
rainbow gradients, glowing buttons everywhere, and game-like recruitment copy.

## Building blocks
Use the existing Next.js, React, TypeScript and Tailwind setup. Prefer small
native HTML/CSS components; no additional component or animation library is
needed for this version. Keep primary content statically rendered.

## Layout
Introduction; selected work; AI practices; work history;
about and toolkit; compact footer with email, social links and replay control.
Keep the right-hand hero illustration replaceable by a future optional 3D scene.

## Motion
The opening is a scripted reenactment, not a live model call. Show a weak prompt,
a generic first draft, feedback, a specific brief, a proposed layout, approval,
and the finished page. Keep Skip available throughout. Include pause, next,
Escape and replay. Play on every refresh. Never store completion or skip state. Pause when the tab
is hidden. With reduced motion, show the opening paused with no visual animation.
Each state occupies the whole screen: statement, chat, first-draft website,
reaction, brief, plan, final page. Use a bordered chat window for conversations, with message bubbles and visible
generation feedback. The first-draft website must fill the screen without a
browser mockup, simultaneous chat, or an enclosing preview card. Reserve
scrollbar space and avoid viewport-sized transforms that cause layout shifts.

## Quality
Keep mobile layouts readable, including narrow screens. Use semantic elements,
visible keyboard focus, accessible controls and reduced-motion support. The
real page must work without JavaScript. No Three.js, external font downloads, video, remote model requests or heavyweight
media in the opening. On the final page only, lazy-load small procedural Three.js
scenes when visible. Stop rendering offscreen, in hidden tabs and during the intro.
Cap resolution and frame rate; keep static fallbacks and reduced-motion support.

## Workflow
Propose a direction first. Implement after feedback. Check the production build,
mobile overflow, links, skip, replay, focus handling and timing cleanup.
