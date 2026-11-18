---
title: The secret file
section: Using cretopass
nav_order: 4
summary: What cretopass writes to disk, how a save happens, and what a backup of your vault actually consists of.
---

## One file, encrypted

A cretopass file is an [age](https://age-encryption.org) ciphertext: the whole
tree — node names, field names, values — is serialised, then encrypted in
passphrase mode with scrypt as the key derivation function. The passphrase is
never stored, and no key file is written next to the vault.

Detection is by content: the app reads the age header, not the extension. A file
named `notes.txt` that holds a cretopass vault will open; a text file named
`vault.age` will be refused with *Not a cretopass secret file*. The extension is
a label for humans. The share flow writes `.cretopass` for exactly that reason,
so a handed-over bundle can be told apart from anything else.

## Saving

There is no save command, and no unsaved state to lose in a crash:

- Every edit marks the tree dirty and hands the newest snapshot to a background
  writer.
- A save writes a temporary file next to the target, syncs it, then renames it
  over the target. A crash leaves either the old file or the new one, never half
  of each.
- A new secret file is created owner-only. Replacing an existing file keeps its
  permissions.
- If a save fails, the title bar says `Save failed`, and quitting is blocked
  until you retry or explicitly discard the changes.

The title bar shows `Saving` while a write is in flight. A burst of edits
collapses into one write, not a queue of them.

## The config file is not the vault

| Path | Purpose |
| --- | --- |
| the file you chose | the encrypted tree, all of your secrets |
| `~/.config/cretopass/config.pwd` | settings and the recent-files list — no secrets |

`config.pwd` holds which colour scheme you picked, whether the app starts with
the last file, and the paths of files you have opened. It contains no names,
fields, or values from a vault. Deleting it costs you the recent list and your
preferences, nothing else.

## Backups

A backup is a copy of the one file. There is no database, no journal, no index
directory to keep consistent:

```sh
cp ~/vaults/work.age /run/media/usb/work.age
```

Restoring is the reverse. If you have the file and the passphrase, you have
everything.

## Two machines

The file can live in a folder that syncs, and reading it from a second machine
is fine — open, copy a field, close. What does not work is both machines
writing at the same time: last writer wins, and the other set of edits is gone.
The app has no conflict detection because it has no knowledge of a second
writer.

If you routinely use two machines, treat one as the writer and use the other for
reading, or copy the file deliberately instead of syncing it.

## Changing the passphrase

**Change file password** on the Home screen re-encrypts the open file with a new
passphrase. It asks for the current one first, then the new one twice, and asks
for confirmation before it writes. The file is replaced atomically like any
other save.

Changing a passphrase does not help if the old ciphertext has already been
copied somewhere else — an old backup still opens with the old passphrase.

## If the file will not open

| Message | What it means |
| --- | --- |
| `Wrong master password, or the file was altered` | age could not decrypt it: wrong passphrase, or the bytes changed after it was written |
| `This secret file needs more computing power than this device allows` | the file's scrypt work factor is above the cap this build accepts; opening it would need a machine that can pay for it |
| `This secret file is damaged or unreadable` | truncated or corrupted file |
| `Not a cretopass secret file` | no age header, so this is not a vault |

None of these have a repair path. Restore a copy of the file, if you have one.
