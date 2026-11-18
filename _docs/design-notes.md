---
title: Design notes
section: Security and design
nav_order: 7
summary: Why the tool has this shape — the terminal, one file, no sync, and the updater that had to be deleted.
---

cretopass was not designed for a market. It was built to remove a step from my
own day, so the decisions below are the ones that made it usable by me. Where a
decision costs something, the cost is written down here too.

## Why the terminal

Several times a day I create an account or log into one I have not touched in
months. In the middle of that, opening a separate window with its own toolkit,
its own theme, and its own window manager behaviour is more work than the task.

The alternative in the terminal was `pass`, which means GPG and a command per
action, or a file per secret. I wanted the tree to be visible while I work, and
navigation that does not need a man page.

This is a description of my workflow, not a claim that a GUI is worse. If your
hands are not in a terminal, a GUI is the better tool for you.

## Why one file

A directory of files per secret is easy to inspect and easy to corrupt: rename a
file, lose a directory in a sync conflict, and the secret is gone in a way that
no error message explains.

One encrypted file makes the unit of backup and the unit of restore the same
thing. It also makes the failure mode trivial to state: you have the file and
the passphrase, or you have nothing. That is a trade — no partial access, no
merging two versions, no reading a single secret out of it with another tool.

## Why there is no sync and no account

Sync means conflict resolution, and conflict resolution in a password manager
means either a server that sees your data or a merge algorithm that can lose an
edit silently. Both undermine the reason I use this: one file, no network,
nothing to sign into.

The file can sit in a folder that syncs. Reading it from a second machine is
fine. Two machines writing at once is not, and the app will not pretend
otherwise.

## Why the updater was removed

For a while `cretopass update` existed. It downloaded `install.sh` from GitHub
Releases and ran it. In hindsight that was the worst part of the application:

- The process that had just decrypted the vault became a network client.
- It then executed remote shell code with the user's privileges.
- The only integrity check lived in that downloaded script and fetched its
  expected hash from the same channel, so a compromised release compromised both.
- On a mismatch it asked whether to continue anyway.
- The README claimed the app does not use the network while this command did
  exactly that.

A local vault does not need to phone home. The command, its module, and its
network path are gone; the binary makes no requests in any mode. Updating is what
it should have been: re-run the installer, or let the package manager do it.

A signed auto-updater would have been better than an unsigned one and still
wrong for this tool: it hands a secrets manager an egress path and a
download-and-execute path. There is nothing to keep up to date often enough to
justify that.

## Why a share is a folder, not an archive

Sharing a subtree writes a directory holding a fresh encrypted file and a
plain-text instruction. A zip was rejected: age ciphertext does not compress, so
an archive adds no benefit and one more format. A folder can be inspected — you
can read the instruction before you open anything, and see exactly one file that
is the secret.

The passphrase for a bundle is new, typed at share time. Your master passphrase
never leaves your machine, and the bundle cannot be used to attack your vault.

## Why browsing never reads file contents

An early version opened every file in a directory to check for the age header,
to highlight which ones were vaults. On a Windows machine with cloud-synced
folders, that meant looking at a directory downloaded all of it, and could raise
a provider dialog hidden behind a full-screen TUI.

Browsing now lists names only. The interface is slightly less helpful — the
highlight is a name hint, `.age`, not a fact — and a whole class of hangs and
surprises is gone. The trade is written down because it is a real trade.

## Why it stays MIT and has no paid tier

The reason I use this app is that it is one file and no network. A paid tier
means an account, and an account means a server. Sponsorship is possible; a
feature behind a payment is not.

## Where the decisions live

The repository keeps architecture decision records for the parts that were
argued rather than assumed — encryption, atomic saves, autosave, the clipboard
gateway, the updater removal, sharing, browsing:

- [ADR index in the repository]({{ site.repo }}/tree/master/docs/adr)

They are written for the next person who has to change the code, and they
include the alternatives that were rejected and why.
