# Content and branding

Edit `src/pages/index.astro` for coaching copy, FAQs, and contact details.
Edit `src/layouts/Layout.astro` for shared metadata and footer information.
Colors, typography, and responsive behavior live in `src/styles/`.

## Brand assets

`public/assets/logo.svg` and `logo-with-text.svg` are vector traces of the supplied
PNG artwork. All visible shapes, including lettering, are paths; no raster image
is embedded. The traces preserve the supplied proportions, colors, and lettering.
The small raster originals limit edge precision; use an original vector master if
one becomes available. Do not substitute a font for the custom wordmark.

The hero uses a locally stored Unsplash gym photograph (image identifier
`photo-1534438327276-14e5300c3a48`), [published on Unsplash](https://unsplash.com/photos/woman-standing-surrounded-by-exercise-equipment-CQfNt66ttZM). It illustrates a training setting and does not
depict Brock or claim to show his facility. Replace `public/assets/training.jpg`
with approved photography; update its alternative text in the homepage.

Fonts are Barlow Condensed and DM Sans, loaded from Google Fonts, with system
fallbacks. Google receives ordinary font request data. Self-host fonts if external
font requests are undesirable.

The Meet Brock sections on the homepage and about page share
`src/components/Coach.astro`. The portrait at `public/assets/brock-jones.png`
is the user-supplied baseball photograph, displayed in its original proportions.

Additional locally stored Unsplash photographs appear only on the coaching and
approach pages: [Brett Jordan’s gym equipment](https://unsplash.com/photos/U2q73PfHFpM)
and [Risen Wang’s gym interior](https://unsplash.com/photos/20jX9b35r_M).
They illustrate training environments, not Brock’s facility.

The Diamondbacks and MiLB SVG marks come from MLB’s official asset service,
as linked on Brock’s MiLB profile. They identify his playing background and
career record; they are not Bold Performance partners or endorsements.

## Editorial rules

Credentials and contact information come from the supplied flyer and Instagram
profile. Career details are supported by [Banner’s coaching biography](https://www.bannerhealth.com/hpc/about-us/team/brock-jones) and [Brock’s MiLB profile](https://www.milb.com/player/brock-jones-686809). The MDM role is background information, not a claim of affiliation for Bold Performance. Do not add fabricated testimonials, guarantees, pricing, or availability.
Get Brock's approval before adding new offers or claims. Training copy does not
promise medical treatment or injury rehabilitation.

[All documentation](README.md)
