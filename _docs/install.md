---
title: Install
section: Start here
nav_order: 1
summary: Three ways in — cargo, a shell installer, a PowerShell installer — what each one writes to disk, and how to undo it.
---

## What you need

A terminal on Linux (x86_64 or aarch64), macOS (Intel or Apple silicon), or
Windows (x86_64). The release builds are static musl binaries on Linux, so
nothing else has to be installed first — except, for the `cargo` route, a Rust
toolchain.

The interface draws in TrueColor and paints its own background, so the
terminal's theme does not leak into the app. It reads a keyboard and, if it can,
a mouse.

## With cargo

```sh
cargo install cretopass
```

This builds the published crate ({{ site.version }}) and puts the binary in
`~/.cargo/bin`. It needs a recent stable Rust toolchain.

## With the installer, Linux and macOS

```sh
curl -fsSL https://github.com/Dmitrytuk/cretopass/releases/latest/download/install.sh | sh
```

The script:

1. Detects the OS and architecture and picks the matching release asset.
2. Downloads `cretopass-<target>.tar.gz` and its `.sha256` from the same release.
3. Checks the digest, then installs the binary with mode `755` to
   `~/.local/bin/cretopass`.
4. Offers to add `~/.local/bin` to `PATH` in your shell rc file, wrapped in a
   `# >>> cretopass PATH >>>` block so it can be removed later.
5. On macOS, also writes a small `.app` launcher so the binary can be started
   from the GUI.

It needs `curl`, `tar`, `install` and either `sha256sum` or `shasum`.

## With the installer, Windows

```powershell
irm https://github.com/Dmitrytuk/cretopass/releases/latest/download/install.ps1 | iex
```

The script downloads the Windows zip and its `.sha256`, checks the digest, and
unpacks to `%LOCALAPPDATA%\Programs\cretopass`, adding that directory to your
user `PATH`.

## Verify

```sh
cretopass --version
```

`cretopass --help` prints the same version, the two commands, and the feedback
links. If the binary is not found after install, the installer's `PATH` question
was answered "no" — add `~/.local/bin` yourself and open a new shell.

## Updating

There is no self-update. The binary makes no network calls at all, so it cannot
check for a new release and cannot download one. To update, run the same install
command again; it reports the version it found before replacing it, and
`--force` re-installs the same version:

```sh
curl -fsSL https://github.com/Dmitrytuk/cretopass/releases/latest/download/install.sh | sh -s -- --force
```

With cargo, the usual `cargo install cretopass` (add `--force` when cargo says
the binary already exists).

## Removing

```sh
cretopass remove
```

This lists what it is about to delete, asks once, then removes the binary, the
config directory, shell completions, the macOS launcher or the Start Menu
shortcut, and the `PATH` block the installer added. Your secret files are never
touched — they are not in any of those places, and the app does not know where
they all are.

`remove` only works for installer-based installs. For a `cargo` install it
refuses with exit code `2` and points at `cargo uninstall cretopass`; for a
package-manager install, remove the package with the package manager.

## About that SHA-256

The digest comes from the same release as the binary. That catches a truncated
or corrupted download; it does not prove who built the file. If that difference
matters to you, build from source with `cargo install cretopass` instead of
running a script.
