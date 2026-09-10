# Cyber scenes

`CyberScene.tsx` gates loading and provides pointer/keyboard controls and static
fallbacks. `cyber-scenes.ts` is a dynamically imported Three.js module with four
procedural scenes: elastic quad sphere, financial chart, parcel loop, shopping bag.
Company illustrations express their industries; the financial bars are decorative,
not market data. There are no network models, textures, fonts or post-processing.

The library is imported after the intro closes and the scene enters the viewport.
IntersectionObserver, document visibility and the intro lifecycle stop rendering
when it is not useful. Maximum 30 fps, or 24 fps on coarse-pointer devices, with
pixel ratio capped at 1.5 / 1.25 respectively. Each scene has its own small canvas
and pause button. Geometry/materials/renderers and observers are disposed on unmount.

Reduced-motion and Save-Data visitors see the original static artwork. They can
explicitly choose Explore 3D; reduced-motion renders a still model that remains
manually rotatable. WebGL failure/context loss returns to the fallback.

The hero uses the original two-dimensional SVG orbital artwork, with no Three.js
canvas or drag controls. Only the company cards mount interactive scenes.

Checks: production build; no canvas during opening; actual WebGL output; pointer
and keyboard rotation; reset/pause; card scenes mounted only when reached; render
stops offscreen and on intro replay; narrow-screen sizing; fallback paths. No
persistent animation or orientation state is stored.

AfterShip now uses `DeliveryTruck.tsx`: a two-dimensional SVG truck carrying
three parcels, with CSS wheel rotation, suspension bounce and a looping drive-by.
It replaces the logistics WebGL scene on the page. A pause button, visibility and
intro gates, and reduced-motion static artwork keep the animation controllable.

Shopee now uses `ShoppingScreen.tsx`: a CSS 3D desktop monitor with an SVG
storefront. Nine decorative products scroll underneath a fixed navigation bar,
with a matching scrollbar; the 14-second cycle pauses at the bottom and returns
to the top. It supports pause, offscreen/intro suspension and reduced motion.
No WebGL renderer or external model is mounted for this card.

AXiM now uses `FinanceBot.tsx`: a 10-second SVG/CSS sequence in which a hand
passes a stack of financial documents to a bot, its indicators blink, and three
chart panels appear in sequence. Pause, visibility/intro suspension and a static
reduced-motion composition are supported. All three work cards now use these
lightweight components; the earlier `CyberScene` renderer is no longer mounted
or imported by the page.

Current controls and copy: all three card pause buttons have been removed at the
owner's request. Visibility/intro suspension and reduced-motion handling remain.
AXiM has no visible explanatory text. AfterShip replaces its bottom caption with
an upper-right tracking display synchronized to the truck's 8-second loop:
In transit → Out for delivery → Delivered. Reduced motion shows Delivered.
