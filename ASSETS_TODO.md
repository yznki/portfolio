# Asset TODO — Images & Screenshots Needed

All files go in `public/`. Export as PNG unless noted. Recommended export: 2x (retina). Keep file sizes reasonable — compress with squoosh.app or similar before dropping in.

---

## ALREADY EXISTS ✓

- `public/YLogo.svg` — logo mark
- `public/Memoji.png` — hero memoji
- `public/MindTechLogo.svg` — experience section
- `public/InfineonLogo.svg` — experience section
- `public/SagerLogo.svg` — experience section
- `public/CV-YazanAlKiswani.pdf` — résumé download
- `public/_projects/_sehaty/logo.svg` — Sehaty logo (SVG)
- `public/_projects/_sehaty/project.png` — exists but code expects `hero.png` (see note below)

---

## NEEDED — Sorted by project

---

### HERO IMAGES
Used in: `/projects` cursor preview, case study hero section, "Next Project" teaser, gallery cards.
Format: landscape, ~1600×900px or 1200×675px (16:9 or 4:3).

- [x] `public/_projects/_optionqaaf/hero.png` — editorial app mockup or brand visual
- [x] `public/_projects/_avara/hero.png` — dashboard screenshot or brand visual
- [x] `public/_projects/_zaraa/hero.png` — app screens or brand visual
- [x] `public/_projects/_sehaty/hero.png` — **rename/copy `project.png` → `hero.png`**, or export a new hero
- [x] `public/_projects/_le3beti/hero.png` — Speed Math game screenshot or platform visual

---

### OPTIONQAAF

Case study sections: Screens showcase + Brand.

**Mockups** (used in Hi-Fi Screens section — scroll strip):
Format: portrait phone mockups, ~540×1170px per frame.
- [x] `public/_projects/_optionqaaf/mockup-1.png`
- [x] `public/_projects/_optionqaaf/mockup-2.png`
- [x] `public/_projects/_optionqaaf/mockup-3.png`
- [x] `public/_projects/_optionqaaf/mockup-4.png`
- [x] `public/_projects/_optionqaaf/mockup-5.png`
- [x] `public/_projects/_optionqaaf/mockup-6.png`
- [x] `public/_projects/_optionqaaf/mockup-7.png`
- [x] `public/_projects/_optionqaaf/mockup-8.png`

**Brand** (used in Brand section — grid):
- [x] `public/_projects/_optionqaaf/logo.png` — the ق calligraphy mark, ideally on dark bg
- [x] `public/_projects/_optionqaaf/brand-colors.png` — color palette swatch or brand sheet

---

### AVARA

Case study sections: Brainstorming/wireframes + Hi-Fi Screens + Brand.

**Hi-Fi screens** (used in Screens section — grid):
Format: browser/dashboard screenshots, ~1440×900px.
- [x] `public/_projects/_avara/hifi-dashboard.png` — main dashboard view
- [ ] `public/_projects/_avara/hifi-transactions.png` — transaction history or analytics view

**Brainstorming/planning** (used in Brainstorming section — grid):
Format: can be screenshots from Figma or photos of sketches.
- [ ] `public/_projects/_avara/wireframe-1.png` — lo-fi wireframe screen 1
- [ ] `public/_projects/_avara/wireframe-2.png` — lo-fi wireframe screen 2
- [ ] `public/_projects/_avara/brainstorm.png` — FigJam planning board screenshot
- [ ] `public/_projects/_avara/inspiration.png` — inspiration/moodboard screenshot *(also used in Brand section)*

**Brand**:
- [ ] `public/_projects/_avara/logo-sketches.png` — logo exploration / the A/ monogram

---

### ZARAA

Case study sections: Screens showcase + Brand (standalone images in Zaraa section).

**Hi-Fi screens** (used in Screens section — scroll strip):
Format: portrait phone screens, ~390×844px.
- [ ] `public/_projects/_zaraa/onboarding-1.png` — Welcome screen
- [ ] `public/_projects/_zaraa/onboarding-2.png` — Plant picker / setup
- [ ] `public/_projects/_zaraa/onboarding-3.png` — Care Guide
- [ ] `public/_projects/_zaraa/hifi-home.png` — My Garden / home screen
- [ ] `public/_projects/_zaraa/hifi-leaderboard.png` — Leaderboard screen
- [ ] `public/_projects/_zaraa/hifi-profile.png` — Profile screen

**Brand** (used in Brand section — grid + standalone):
- [ ] `public/_projects/_zaraa/logo.png` — Zaraa wordmark
- [ ] `public/_projects/_zaraa/brand-colors.png` — color palette
- [ ] `public/_projects/_zaraa/characters.png` — all 9 plant character illustrations together

---

### SEHATY

Case study sections: Wireframes + Hi-Fi Screens + Brand.

**Hi-Fi screens** (used in Screens section — scroll strip):
Format: portrait phone screens, ~390×844px.
- [ ] `public/_projects/_sehaty/hero.png` — Login screen *(can copy/rename existing `project.png` or export fresh)*
- [ ] `public/_projects/_sehaty/onboarding.png` — Onboarding screen
- [ ] `public/_projects/_sehaty/booking-flow.png` — Doctor booking flow
- [ ] `public/_projects/_sehaty/hifi-results.png` — Lab results viewer

**Wireframes**:
- [ ] `public/_projects/_sehaty/wireframes.png` — lo-fi wireframe overview (can be an artboard export from Figma)

**Brand**:
- [ ] `public/_projects/_sehaty/logo.png` — Sehaty logo as PNG *(SVG already exists at `logo.svg`, export PNG from it if needed)*

---

### EDUEMPOWER

Case study sections: Screens showcase + Brand.

**Hi-Fi screens** (used in Screens section — scroll strip):
Format: mix of web (1440×900) and mobile (390×844).
- [ ] `public/_projects/_le3beti/speedmath-1.png` — Speed Math game UI, race view
- [ ] `public/_projects/_le3beti/speedmath-2.png` — Speed Math countdown or results
- [ ] `public/_projects/_le3beti/dashboard.png` — Student or teacher dashboard
- [ ] `public/_projects/_le3beti/mobile.png` — Mobile app screen

**Brand**:
- [ ] `public/_projects/_le3beti/logo.png` — Le3beti wordmark

---

## EXPORT TIPS

**From Figma:**
- Select frame → right-click → Copy/Paste as → Copy as PNG
- Or: select frame → Export panel (bottom right) → set scale to 2x → Export

**For hero images:**
Export at 1600×900 or larger. These appear in the cursor preview (320×200) and case study hero (full-width), so quality matters but the crop is flexible.

**For phone mockups:**
Export individual screens at 1x or 2x. The app will scale them to fit the scroll strip.

**For brand/color swatches:**
Screenshot or export from Figma at whatever size looks clean. Even 600×400 is fine.

**File sizes:**
Compress all PNGs before committing — use squoosh.app with WebP if possible (the app uses `<NuxtImg>` which handles format optimization, but smaller source files = faster builds).

---

## SUMMARY COUNT

| Project | Missing files |
|---|---|
| optionqaaf | 10 (hero + 8 mockups + 2 brand) |
| avara | 8 (hero + 2 hifi + 4 brainstorm + 1 brand) |
| zaraa | 9 (hero + 6 screens + 3 brand) |
| sehaty | 5 (hero + 3 screens + 1 wireframe + 1 logo png) |
| le3beti | 5 (hero + 4 screens + 1 brand) |
| **Total** | **37 files** |
