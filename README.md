# <picture><source media="(prefers-color-scheme: dark)" srcset="public/assets/mark-dark.svg"><img src="public/assets/logo.svg" width="72" alt=""></picture> Bold Performance

[![CI](https://github.com/smeltery/bold-performance/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/bold-performance/actions/workflows/ci.yml)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.3-222?logo=bun)
![Flox](https://img.shields.io/badge/environment-Flox-58A55C)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-blue)](LICENSE)

[Visit the website](https://bold-performance.vercel.app) · [Training tools](https://bold-performance.vercel.app/tools)

A fast, accessible coaching website for Brock Jones and Bold Performance in
Scottsdale, Arizona. Astro serves static pages; React powers the interactive toolkit. The intake prepares an email draft or
sends through Formspree when configured. Includes responsive navigation, service information,
SVG brand artwork, direct contact options, and 20 searchable training tools, dedicated coaching pages, and a detailed client intake.
Vercel hosts the static site and deploys pushes to `main`.

![Bold Performance social preview](public/assets/og-image.png)

```sh
flox activate
bun install --frozen-lockfile
bun run dev
```

Run `./scripts/check.sh` inside Flox for the same checks as CI and pre-commit.
Build with `bun run build`; the deployable site is in `dist/`.

See [the documentation](docs/README.md) for editing content, enabling inquiries,
development, deployment, automatic releases, and [SEO, agent discovery, and analytics](docs/discovery.md).

Licensed under [PolyForm Shield License 1.0.0](LICENSE).
