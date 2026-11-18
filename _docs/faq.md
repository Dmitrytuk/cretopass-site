---
title: FAQ
section: Reference
nav_order: 8
summary: The questions that arrive first, answered in the order they usually arrive.
---

## Why not KeePassXC?

KeePassXC is a better tool for most people: browser integration, a phone app,
key files, hardware keys, a decade of use in the field, and a format other
programs read. If you want autofill in Firefox, use KeePassXC.

Its shape is a window on a desktop. My problem was the opposite one: I am in a
terminal, several accounts deep into a day, and a second window is the friction.
That is the whole difference, and it is a preference about workflow, not a
measurement of quality.

## Why not `pass`?

`pass` is a directory of GPG-encrypted files and a shell script per action. It is
excellent if that is what you want, and it has something cretopass does not:
every secret is a plain file you can use with any tool.

cretopass has a tree you can see, navigation without commands, and nodes that
carry more than one field. It does not read the `pass` layout and does not try
to. If GPG and shell scripts are your preference, `pass` is already better at
being `pass`.

## Can I sync it between machines?

The file can live in a folder that syncs, and reading it from the second machine
works. Two machines writing at the same time does not: last writer wins and the
other edits are gone. There is no conflict detection, because the app has no idea
a second writer exists.

For an occasional second machine, copy the file deliberately. Forcing a sync
engine to merge an encrypted file is how people lose vaults.

## Is there a phone app or a browser extension?

No, and neither is planned. A phone client means a second implementation of the
format and a second place to leak a passphrase. Browser autofill means an
extension that holds your secrets inside the browser's process model. Both are
reasonable features for a different product.

## Can I use it from a script — `cretopass get …`?

No. There is no non-interactive read command; the binary opens the TUI or prints
help. A CLI would need its own answer to "where does the decrypted value go",
and that answer is usually "stdout, into shell history and process arguments".
It has been asked for, and it is not built.

## What if I forget the passphrase?

The file cannot be opened again. There is no reset, no recovery key, no hint
question, and no support channel that can help. The age file is decryptable only
with that passphrase.

If the vault matters, keep the passphrase in a second password manager, or write
it down and store it like a house key. This is not a limitation I can remove
without adding the account this tool exists to avoid.

## Has it been audited?

No. There has been no independent audit of any part of it. The encryption
primitives are age's; everything around them is one person's code. See the
[security model]({{ '/docs/security/' | relative_url }}) for the details,
including what it does not protect.

## Is the file format stable?

The file is an age ciphertext of the app's own serialised tree. It is not a
documented interchange format, and no other program reads it. Within the
project, the reader accepts what earlier versions wrote; a change that broke
existing files would be a breaking release, not a patch.

## Can I keep more than one vault?

Yes — as many files as you like, anywhere. The app opens one at a time. Home
remembers recent paths; that list is a convenience, not an inventory, and
removing a path from it does not touch the file.

## Does it work on Windows?

Yes, natively. The installer is PowerShell, the clipboard goes through the Win32
clipboard so non-ASCII values survive, and the interface avoids glyphs the
Windows console cannot draw. Windows Terminal is a better experience than the
legacy console host.

There are no WSL-specific instructions: install the Windows build, or the Linux
one inside WSL — they are separate installations with separate files.

## Does the mouse work?

Yes: click to select, wheel to scroll, and modals can be closed by clicking.
Every action also has a key, so a terminal without mouse support loses nothing
essential.

## Where do I report a bug?

[Issues]({{ site.issues }}) on GitHub, with the version from
`cretopass --version` and what you expected to happen. For a vulnerability, use
[private reporting]({{ site.security_advisories }}) instead — not a public issue.
