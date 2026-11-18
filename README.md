# cretopass-site

The source of <https://cretopass.app> — the project site for
[cretopass](https://github.com/Dmitrytuk/cretopass).

Jekyll builds the site from Markdown. There is no theme gem, no JavaScript
framework, and no third-party asset: one stylesheet, one small copy-to-clipboard
script, and system fonts.

## Layout

```
_config.yml              site metadata, collections, defaults
_data/docs_nav.yml       sidebar groups, in order
_layouts/
  default.html           page shell (head, masthead, footer)
  doc.html               documentation page: sidebar + prose + prev/next
  article.html           entry in the Writing collection
_includes/
  head.html              meta, SEO tag, CSS, feed
  header.html            masthead and main navigation
  footer.html            footer columns
  sidebar.html           documentation sidebar, built from site.docs
_docs/                   documentation pages (collection `docs`, URL /docs/<name>/)
docs/index.md            the /docs/ landing page
writing/index.md         the /writing/ landing page
articles/                drafts destined for `_articles/` — not built
index.md                 the home page
assets/css/site.css      the only stylesheet
assets/js/copy.js        copy buttons for the install commands
assets/img/demo.gif      the terminal recording from the app repository
CNAME                    cretopass.app
.github/workflows/pages.yml   build and deploy to GitHub Pages
```

## Add a documentation page

1. Create `_docs/<name>.md`. The URL becomes `/docs/<name>/`.
2. Front matter:

   ```yaml
   ---
   title: The secret file
   section: Using cretopass   # must match a title in _data/docs_nav.yml
   nav_order: 4               # position inside that group
   summary: One sentence under the page title.
   ---
   ```

3. Write Markdown. `##` and `###` are styled by `.prose`; tables, code blocks
   and <kbd>key</kbd> markup all have styles in `assets/css/site.css`.

The sidebar, the prev/next links and the sitemap are generated — nothing else to
register.

## Run locally

```sh
bundle install
bundle exec jekyll serve --livereload
# http://127.0.0.1:4000
```

A production-shaped build:

```sh
JEKYLL_ENV=production bundle exec jekyll build
# output in _site
```

## Facts that appear on the site

These are copied by hand from the app repository and go stale silently. When a
release happens, check:

| Where | What |
| --- | --- |
| `_config.yml` → `version` | the version printed in the masthead, home hero and footer |
| `_docs/install.md` | installer behaviour, install paths, `remove` semantics |
| `_docs/keys.md` | `src/theming/texts.rs` help list and status-bar hints |
| `_docs/security.md` | ADR 0025 (clipboard), 0027 (no network) |
| `assets/img/demo.gif` | `docs/demo.gif` in the app repository |

The stylesheet palette is taken from
`src/theming/palette_default_dark.rs`, so the site and the TUI match.

## Deployment

`main` is the only branch that deploys. The workflow builds with Jekyll 4 and
publishes through GitHub Pages (`Settings → Pages → Source: GitHub Actions`).

`CNAME` holds `cretopass.app`. The custom domain must also be set in the Pages
settings for GitHub to issue the certificate; DNS lives at Cloudflare:

| Type | Name | Value | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| AAAA | `@` | `2606:50c0:8000::153` | DNS only |
| AAAA | `@` | `2606:50c0:8001::153` | DNS only |
| AAAA | `@` | `2606:50c0:8002::153` | DNS only |
| AAAA | `@` | `2606:50c0:8003::153` | DNS only |
| CNAME | `www` | `dmitrytuk.github.io` | DNS only |

Proxy off, at least until the certificate is issued: Cloudflare's proxy in front
of GitHub Pages causes redirect loops and hides the origin from GitHub's
certificate check. After the "Enforce HTTPS" box becomes available and is
ticked, it can be turned back on with the SSL mode set to Full.

## Licence

The site text and code in this repository are MIT, the same as cretopass. See
`LICENSE`.
