---
title: First five minutes
section: Start here
nav_order: 2
summary: Create a file, set a passphrase, add a node, copy a field. The whole loop, once.
---

Run `cretopass`. The Home screen lists what you can do:

```
Open secret file
Create new secret file
Configuration
Change file password
Export active file
Share active file
Import from file
```

Move with <kbd>j</kbd>/<kbd>k</kbd>, open with <kbd>Enter</kbd> or
<kbd>l</kbd>, quit with <kbd>q</kbd>.

## 1. Create the secret file

Choose **Create new secret file**. The file browser opens with a name field.
<kbd>n</kbd> edits the name, <kbd>Enter</kbd> on the list commits it, and the
path can be anywhere you can write — this is the only place your secrets will
live.

You are then asked for a passphrase twice. It encrypts the file with
[age](https://age-encryption.org) in passphrase mode (scrypt). <kbd>Ctrl</kbd>+<kbd>S</kbd>
reveals what you typed; <kbd>Ctrl</kbd>+<kbd>V</kbd> pastes.

There is a passwordless option. It asks once more, plainly, because a file with
no passphrase is a file that anyone holding it can open.

> The passphrase is not stored anywhere. If you forget it, the file cannot be
> opened again — not by me, not by anyone.

## 2. Add a node

In the tree, press <kbd>a</kbd>. Pick where the node goes: <kbd>a</kbd> after
the selected node, <kbd>A</kbd> before it, <kbd>l</kbd> or <kbd>→</kbd> as its
child. The form opens with a name and a few fields:

- **Name** — what you will search for later.
- **Login** — a username, or anything you would paste into a login box.
- **Password** — masked in the list and in the detail view.
- **Custom Field** — you name the field yourself, so a token, a PIN, a recovery
  address, or an answer to a security question fits without pretending to be a
  password.
- **Description** — free text, for the note you will otherwise forget.

<kbd>j</kbd>/<kbd>k</kbd> moves between fields, <kbd>i</kbd> or
<kbd>Enter</kbd> edits the focused one, <kbd>Enter</kbd> or <kbd>Esc</kbd>
finishes editing. <kbd>Enter</kbd> on the form's add row appends another field;
<kbd>d</kbd><kbd>d</kbd> cuts a field, <kbd>p</kbd> pastes it after,
<kbd>P</kbd> before, <kbd>Del</kbd> deletes it. <kbd>u</kbd> and
<kbd>r</kbd> undo and redo. <kbd>Esc</kbd> closes the form.

## 3. Search

Press <kbd>/</kbd> and type. The tree filters as you type; matching nodes stay
visible, the rest are dimmed. <kbd>Enter</kbd> keeps the search and returns you
to normal navigation, <kbd>Esc</kbd> clears it.

Search is a filter on the tree, not a command line. There is no query syntax to
learn.

## 4. Copy a field

Open a node with <kbd>i</kbd>, <kbd>Tab</kbd> or <kbd>Enter</kbd>. The detail
overlay lists every field. <kbd>j</kbd>/<kbd>k</kbd> moves, <kbd>c</kbd> or
<kbd>y</kbd> copies the focused value to the system clipboard and reports
whether it actually worked. <kbd>i</kbd> or <kbd>Enter</kbd> edits the node
straight from here. <kbd>Esc</kbd> closes.

Password fields are hidden in the list. The detail overlay is the one place that
shows them, and a copy happens only when you press <kbd>c</kbd> or <kbd>y</kbd>
on a specific field.

## 5. Generate a password or a login

Inside a field, <kbd>Ctrl</kbd>+<kbd>G</kbd> opens the generator. On a
**Password** field it generates from a length and a set of symbols: digits set
the length, <kbd>j</kbd>/<kbd>k</kbd> moves between rows,
<kbd>Space</kbd> toggles all symbols, <kbd>Enter</kbd> accepts, <kbd>Esc</kbd>
cancels. On a **Login** field it assembles a word from syllables instead.

## 6. Quit, and what happened meanwhile

Press <kbd>q</kbd>. There is no save command: every edit is written back to the
file automatically. Saves go through a background writer that always writes the
latest snapshot of the tree, so a fast sequence of edits collapses into one
write rather than a queue. The title bar shows `Saving` and, if a write fails,
`Save failed` — the app will not exit quietly on a failed save and offers a
retry.

The next time you start, **Configuration** can make it start with the last file
you had open and show the full path in the title bar. Both are off by default.
