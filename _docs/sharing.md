---
title: Export and share
section: Using cretopass
nav_order: 5
summary: Two different exits — plaintext for moving data, an encrypted bundle for handing a subtree to another person.
---

There are two ways to get data out of a vault, and they are not the same thing.
Export writes readable text. Share writes a new encrypted file the recipient can
open in cretopass.

## Export: plaintext, on purpose

Select a node in the tree and press <kbd>Ctrl</kbd>+<kbd>e</kbd>, then
<kbd>e</kbd>. Choose the scope — the node alone, or the node with its children —
then the format:

| Format | Notes |
| --- | --- |
| JSON | The full tree: names, field types, values, nesting |
| XML | The same structure, element per field |
| CSV | One row per node, with a `path` column and a column per field |

Name the destination in the file browser (<kbd>n</kbd> for the name,
<kbd>e</kbd> or <kbd>Enter</kbd> to write).

> **An export is plain text.** Every password in it is readable by anything that
> can read the file, and it will sit in your shell history of files, your
> backups, and any sync folder you dropped it in. Delete it when you are done.
> The file browser refuses a destination whose name looks like a vault, so an
> export cannot quietly overwrite your secret file.

Home also offers **Export active file** for the whole vault.

## Share: an encrypted bundle

Select a node, press <kbd>Ctrl</kbd>+<kbd>e</kbd>, then <kbd>s</kbd> (or
**Share active file** on Home for everything). Pick the scope, name a *folder*,
and choose a passphrase for the bundle.

The result is a self-contained directory:

```
vault_Work/                  <- the folder you named
    vault_Work.cretopass     <- a normal cretopass vault
    HOW-TO-OPEN.txt          <- plain-text instructions
```

Rules that make it usable:

- **The recipient gets their own passphrase.** The bundle is re-encrypted with
  the passphrase you type at share time. Your master passphrase is never
  involved, and changing it later does not change the bundle.
- **The passphrase is never in the folder.** `HOW-TO-OPEN.txt` names the app, the
  install commands, the file, and the steps to open it — and says the passphrase
  travels over a separate channel. Send it in another message, or say it out
  loud.
- **A passwordless bundle is allowed**, after an explicit confirmation, for the
  case where the folder itself is the thing being protected.
- **The write is atomic**, like a normal save: a crash cannot leave a truncated
  vault. The instruction file is written after it.
- **Re-sharing into a non-empty folder asks first**, so you can update a bundle
  you produced earlier. A destination that is an existing file is refused.
- Unsaved edits are included: a share takes the tree from memory, not from disk.

The shared file is a regular vault. The recipient can add to it and send it back;
anything they keep is theirs, not a link to yours.

## Import

**Import from file** on Home reads a cretopass JSON, XML or CSV file and builds a
tree from it. This is the way back from an export, and the way to bring data in
from a script that emits one of those formats. The format is chosen by the file
extension.

There is no importer for KeePass KDBX or for the `pass` layout of GPG files, and
none is planned. Export from the other tool to CSV, arrange the columns, import.

## What each is for

| You want to | Use |
| --- | --- |
| Hand a colleague the staging credentials | Share — a folder with its own passphrase |
| Move a vault to a new machine | Copy the file; no export needed |
| Feed a script or a spreadsheet | Export to CSV, then delete the file |
| Keep a readable backup | Don't. Copy the encrypted file |
