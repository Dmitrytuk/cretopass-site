---
layout: doc
title: Documentation
permalink: /docs/
summary: Everything about cretopass, in nine pages. Start with the file; the rest is for when something does not behave the way you expected.
---

cretopass is an offline password manager in the terminal: a TUI written in Rust
over a single age-encrypted file. You choose where that file lives. A node is a
name plus the fields you give it — login, password, a note, a token, a custom
field — so it is a secrets tree rather than a list of password slots.

It makes no network requests. It has no account, no sync, and no browser
integration, and that is the design rather than a gap.

## Start here

- [Install]({{ '/docs/install/' | relative_url }}) — cargo, the shell installer,
  the PowerShell installer, and how to remove it all again.
- [First five minutes]({{ '/docs/quickstart/' | relative_url }}) — create a file,
  set a passphrase, add a node, copy a field.
- [Keys]({{ '/docs/keys/' | relative_url }}) — every binding in the app, by
  screen.

## The rest

- [The secret file]({{ '/docs/vault-file/' | relative_url }}) — what is written
  to disk, how a save works, and what a backup is.
- [Export and share]({{ '/docs/sharing/' | relative_url }}) — plaintext export,
  encrypted bundles, and the difference.
- [Security model]({{ '/docs/security/' | relative_url }}) — what the ciphertext
  protects, what it does not, and what has not been audited.
- [Design notes]({{ '/docs/design-notes/' | relative_url }}) — why the terminal,
  why one file, and why the updater was deleted.
- [FAQ]({{ '/docs/faq/' | relative_url }}) — the questions that come up first.
- [Compared]({{ '/docs/comparison/' | relative_url }}) — pass, gopass and
  KeePassXC, including where cretopass is the wrong choice.

## Outside this site

- [Source and issues]({{ site.repo }}) on GitHub.
- [crates.io](https://crates.io/crates/cretopass) for the published crate.
- [Security advisories]({{ site.security_advisories }}) for private reports.
