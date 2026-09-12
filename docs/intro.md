# Portfolio opening

`app/components/IntroStory.tsx` is the small client island for the scripted opening.
The portfolio content stays server-rendered and statically exported. The opening
uses a native modal dialog and CSS, with no live AI request or animation package.

The six scenes run for approximately 20 seconds: job search, short prompt,
generic first draft, reaction, design skill, and proposed plan. The plan approval
leads directly into the real site, without a separate satisfaction statement.
`scenes` owns the duration of each step. The script and its public design brief
are editable in `IntroStory.tsx` and `public/personal-site-skill.md`.

Every refresh starts the opening, including URLs with section hashes. No cookies,
localStorage, sessionStorage or completion state are read or written. Skip and
Escape close only the current playback. The footer can replay without refreshing.
Reduced-motion mode removes visual transitions while timed scenes still advance.
Skip is the only playback control; there is no bottom progress bar.

Every state fills the viewport. Opening and reaction show only a statement.
Chat states use a bordered conversation window with right-aligned user bubbles,
left-aligned AI replies, staged messages, and visible generation feedback. The
composer is decorative because this is a scripted replay. Long messages scroll
inside a bounded message area with stable scrollbar space. The first draft
replaces the whole screen with a deliberately generic purple-blue website;
there is no mock browser frame, simultaneous chat or outer preview card around
the first-draft website.

Background tabs pause the timeline, retaining the remaining time. Timers and
overflow locking are cleaned up when closed. Closing returns to the main page
at the top. The brief attachment opens the local Markdown file in a new tab.

On short screens the full-screen scene scrolls while Skip
remains overlaid on screen. The page reserves its scrollbar gutter. Scene
transitions fade without translating the viewport-height container, and the
intro scroll surface has no width-changing scrollbar. Without JavaScript the content and normal links remain usable.

Checks for future edits: build; first-visit autoplay; skip then reload and confirm autoplay; footer
replay; automatic completion; Escape; 320px overflow; short-screen
controls; keyboard focus and reduced motion. Preview the exported build on port
4173; rebuild after edits because the static preview does not hot-reload.

Page generation transitions live in `page-build.css`. The first draft reserves
its real module boxes behind animated skeletons, reveals navigation/hero/cards
in sequence, then sweeps left with a small wind-up before the reaction scene.
Its scene lasts 3.9 seconds; the dismissal runs from 3.2 to 3.82 seconds.
Natural intro completion adds `data-site-building` to the body for 3.4 seconds,
revealing the final site's modules in place. Skip bypasses this sequence; the
reveal itself also has a Skip button. Replay/unmount clear the reveal timer and
attribute. Reduced motion bypasses the final build and removes the draft sweep.
