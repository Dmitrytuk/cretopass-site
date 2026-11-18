---
title: Security model
section: Security and design
nav_order: 6
summary: What the ciphertext protects, what the clipboard exposes, what the app deliberately cannot do, and the audit that does not exist.
---

This page is the honest version, including the parts that are not reassuring.

## What the file protects

A cretopass file is [age](https://age-encryption.org) ciphertext in passphrase
mode: a scrypt-derived key, and the whole serialised tree as one authenticated
payload. Somebody who obtains the file — from a backup, a stolen laptop, a
misconfigured sync share — has bytes and no plaintext.

- Content is authenticated. A modified file fails to decrypt rather than
  decrypting to something else.
- The passphrase is not stored, cached, or written to a key file.
- A new secret file is created owner-only. Replacing it keeps its permissions.
- The whole save is atomic: temporary file, fsync, rename.

Age is a small, well-known format with an independent implementation. The code
that reads and writes the tree around it is mine, and is not audited.

## What it does not protect

| Situation | Reality |
| --- | --- |
| Someone using your unlocked machine | The vault is open. The decrypted tree is in the process's memory. |
| Your clipboard | A copied password sits in the system clipboard until something replaces it. Clipboard managers, remote-desktop tools, and other applications can read it. There is no timed clear. |
| A keylogger, or root on the machine | The passphrase and the fields are readable as you type them. |
| Your terminal | A multiplexer session left attached, a scrollback buffer, a screen recording. |
| Metadata | File size, modification time, and path are not hidden. |
| A forgotten passphrase | There is no recovery of any kind. |

The app does not fight the operating system for control of the machine. If the
machine is compromised while the vault is open, the vault is compromised.

## No network

The binary contains no network code. No telemetry, no account check, no update
check, no crash reporting, no fonts or images fetched at runtime. `cretopass
update` used to download and execute the installer; it was removed, because the
process holding a decrypted vault should not also be a download-and-execute
client.

The only network step in the project is the installer, which you run yourself:
`curl … | sh`, `irm … | iex`, or `cargo install`. It is outside the app and
outside the process that holds secrets.

This website follows the same rule: no analytics, no cookies, no third-party
assets, no web fonts.

## Clipboard

Copying is the one place where a secret leaves the encrypted file on purpose.

- It happens only when you press <kbd>c</kbd> or <kbd>y</kbd> on a specific
  field — never on opening a node, never automatically.
- The write goes through one gateway. On Linux, fallback helpers are looked up
  by absolute path in `/usr/bin`, `/bin` and NixOS's
  `/run/current-system/sw/bin`, never through `PATH`, so a writable directory
  earlier in `PATH` cannot supply a fake `xclip` that collects secrets. The value
  goes to the helper's stdin, never into its argument list.
- A copy reports failure instead of claiming success. An empty field is a no-op.
- Pasted text is held in a buffer that is zeroed after use.

What the clipboard does afterwards is the operating system's business. On X11
and Wayland the value lives in the cretopass process while the app runs, which
is also why it disappears when you quit.

## Filesystem behaviour

- Browsing lists names only, and never opens a file to inspect it. On Windows a
  cloud-sync placeholder is not hydrated by looking at a directory, and a slow
  or disconnected mount cannot freeze the interface — the listing runs off the UI
  thread with a bounded wait, and <kbd>Esc</kbd> still closes the browser.
- Renaming and deleting in the file browser work on any non-directory row, with
  a confirmation; the currently open vault is protected from deletion.
- Exports never overwrite a file that looks like a vault.

## Supply chain

The installers check a SHA-256 published next to the binary in the same release.
That detects a truncated or corrupted download. It is not a signature: it does
not prove who produced the artifact. Release assets are not signed today.

If that matters to you, `cargo install cretopass` builds from the published crate
on crates.io — a different trust path, not a stronger one in itself.

## Dependencies

The app is Rust, with `age` for encryption, `ratatui`/`crossterm` for the
terminal interface, and `arboard` for the clipboard, among others. The full list
is in the repository's `Cargo.toml`, and the third-party licence texts ship with
it.

## Audit

There has been no independent security audit. The encryption is age; the layer
around it — the tree, the forms, the file handling, the clipboard gateway — has
been reviewed by me and by nobody else. Do not read this site as a claim
otherwise.

If you find a problem, report it privately:
[security advisories]({{ site.security_advisories }}) — not a public issue.
Everything in scope, and the response you should expect, is in
[SECURITY.md]({{ site.repo }}/blob/master/SECURITY.md).
