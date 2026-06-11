# Rakuten Reward SDK — Integration Guide Site

Source for the public integration guide at **https://rakuten-reward-sdk.github.io**.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Static site generator | [VitePress](https://vitepress.dev) v1.x |
| Content format | Markdown (`.md`) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Node | 20+ |

VitePress compiles the Markdown files into a Vue-based SPA. GitHub Actions builds and deploys it on every push to `master`.

---

## Repository Structure

```
.
├── index.html                      # (unused legacy file — not part of the deployed site)
├── package.json
├── docs/                           # VitePress root
│   ├── index.md                    # Home page (/ route)
│   ├── .vitepress/
│   │   ├── config.mjs              # Site config — nav, sidebar, theme options
│   │   └── theme/
│   │       ├── index.mjs           # Extends VitePress default theme
│   │       └── custom.css          # Brand colour overrides (Rakuten red)
│   ├── public/
│   │   └── logo.svg                # Logo served at /logo.svg
│   ├── android/
│   │   ├── index.md                # Basic Setup
│   │   ├── integration.md
│   │   ├── mission.md
│   │   ├── ui.md
│   │   ├── user-info.md
│   │   ├── api-reference.md
│   │   ├── migration.md
│   │   └── faq.md
│   ├── ios/
│   │   └── (same structure as android/)
│   └── javascript/
│       └── (same structure as android/)
└── .github/
    └── workflows/
        └── deploy.yml              # Build and deploy to GitHub Pages
```

---

## Local Development

```sh
# Install dependencies
npm install

# Start dev server (hot-reload)
npm run docs:dev

# Build for production
npm run docs:build

# Preview the production build locally
npm run docs:preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Adding / Updating Content

All content lives in `docs/` as plain Markdown files. To update a page, edit its `.md` file and push — the GitHub Actions workflow builds and deploys automatically.

### Adding a new page

1. Create a `.md` file in the appropriate platform folder, e.g. `docs/android/my-new-page.md`.
2. Add it to the sidebar in `docs/.vitepress/config.mjs` under the relevant `items` array.
3. Push to `master`.

### Sidebar and navigation

The sidebar for each platform is configured in `docs/.vitepress/config.mjs` inside the `androidSidebar()`, `iosSidebar()`, and `jsSidebar()` functions. The top navigation is defined in the `nav` array.

---

## Deployment

Deployment is fully automated via `.github/workflows/deploy.yml`:

1. Push to `master` triggers the workflow.
2. GitHub Actions installs dependencies and runs `npm run docs:build`.
3. The build output (`docs/.vitepress/dist/`) is deployed to GitHub Pages.

> **Note:** GitHub Pages must be configured to use **GitHub Actions** as the source.  
> Go to **Settings → Pages → Source → GitHub Actions**.
