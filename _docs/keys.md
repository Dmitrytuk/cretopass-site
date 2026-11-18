---
title: Keys
section: Using cretopass
nav_order: 3
summary: Every binding in the app, by screen. Vim navigation, one mode at a time, no chords to memorise.
---

The app is modal in the way a terminal editor is: the status bar names the mode
you are in (`NORMAL`, `SEARCH`, `DETAIL`, `EDIT`, `CONFIRM`, …) and lists the
keys that matter right now. <kbd>Esc</kbd> leaves the current mode; it never
quits the app.

## Home

| Key | Does |
| --- | --- |
| <kbd>j</kbd> <kbd>k</kbd> / <kbd>↓</kbd> <kbd>↑</kbd> | Move through the menu and the recent-files list |
| <kbd>Enter</kbd> / <kbd>l</kbd> | Open the selected item |
| <kbd>d</kbd> | Remove the selected path from the recent-files list (the file is not deleted) |
| <kbd>?</kbd> | About overlay: version, links, private vulnerability reporting |
| <kbd>q</kbd> | Quit |

## Tree

| Key | Does |
| --- | --- |
| <kbd>j</kbd> <kbd>k</kbd> / <kbd>↓</kbd> <kbd>↑</kbd> | Move the selection |
| <kbd>h</kbd> <kbd>l</kbd> / <kbd>←</kbd> <kbd>→</kbd> | Collapse a parent or jump to the parent; expand a parent or open a leaf |
| <kbd>Enter</kbd> | Expand a parent, open a leaf |
| <kbd>i</kbd> / <kbd>Tab</kbd> | Detail overlay for any node |
| <kbd>a</kbd> | Add — then <kbd>a</kbd> after, <kbd>A</kbd> before, <kbd>l</kbd>/<kbd>→</kbd> as a child |
| <kbd>d</kbd> <kbd>d</kbd> | Cut the selected node (with its children) |
| <kbd>p</kbd> | Paste the cut node — then <kbd>p</kbd> after, <kbd>P</kbd> before, <kbd>l</kbd>/<kbd>→</kbd> as a child |
| <kbd>Ctrl</kbd>+<kbd>e</kbd> then <kbd>e</kbd> | Export the selected node, or the node with children, as JSON, XML or CSV |
| <kbd>Ctrl</kbd>+<kbd>e</kbd> then <kbd>s</kbd> | Share the selected node, or the node with children, as an encrypted bundle |
| <kbd>Ctrl</kbd>+<kbd>v</kbd> | Paste text from the system clipboard into the form field being edited |
| <kbd>/</kbd> | Search |
| <kbd>Esc</kbd> | Clear the search highlight |
| <kbd>?</kbd> | Help overlay |
| <kbd>H</kbd> | Back to Home |
| <kbd>q</kbd> | Quit |

The Root node has no sibling slot, so only `add child` and `paste child` are
offered when it is selected. The status bar drops the keys that cannot apply.

## Detail overlay

| Key | Does |
| --- | --- |
| <kbd>j</kbd> <kbd>k</kbd> / <kbd>Tab</kbd> | Move between fields |
| <kbd>c</kbd> / <kbd>y</kbd> | Copy the focused field's value to the system clipboard |
| <kbd>i</kbd> / <kbd>Enter</kbd> | Edit the node |
| <kbd>Esc</kbd> | Close |

A copy reports its result: `Copied!` on success, an error modal with the reason
on failure. An empty field is a no-op, so it cannot wipe your clipboard.

## Node form (add / edit)

Navigation level:

| Key | Does |
| --- | --- |
| <kbd>j</kbd> <kbd>k</kbd> / <kbd>Tab</kbd> | Move between fields |
| <kbd>i</kbd> / <kbd>Enter</kbd> | Start editing the focused field |
| <kbd>u</kbd> / <kbd>r</kbd> | Undo / redo |
| <kbd>Enter</kbd> on the add row | Append a field — Login, Password, Description, or a custom name you type |
| <kbd>d</kbd> <kbd>d</kbd> / <kbd>Del</kbd> | Cut / delete the focused field |
| <kbd>p</kbd> / <kbd>P</kbd> | Paste a cut field after / before the focused one |
| <kbd>Esc</kbd> | Close the form |

Editing level:

| Key | Does |
| --- | --- |
| <kbd>←</kbd> <kbd>→</kbd>, <kbd>Home</kbd>, <kbd>End</kbd> | Move the cursor |
| <kbd>Ctrl</kbd>+<kbd>v</kbd> | Paste from the system clipboard (multi-line paste is joined into one line) |
| <kbd>Ctrl</kbd>+<kbd>g</kbd> | Generate — a password on a Password field, a login word on a Login field |
| <kbd>Enter</kbd> / <kbd>Esc</kbd> | Finish editing, back to the navigation level |

## Search

| Key | Does |
| --- | --- |
| <kbd>Enter</kbd> | Keep the filter, return to navigation |
| <kbd>Esc</kbd> | Clear the query and the highlight |
| <kbd>Ctrl</kbd>+<kbd>v</kbd> | Paste into the query |

## Generator

| Key | Does |
| --- | --- |
| digits | Set the password length, with <kbd>←</kbd> <kbd>→</kbd> and <kbd>Backspace</kbd> to edit it |
| <kbd>j</kbd> <kbd>k</kbd> | Move between rows |
| <kbd>Space</kbd> | Toggle every symbol at once |
| <kbd>Enter</kbd> | Focus the next row; on **Generate**, produce the value |
| <kbd>Esc</kbd> | Cancel |

The symbol checklist (<kbd>h</kbd> <kbd>l</kbd> <kbd>j</kbd> <kbd>k</kbd> to
move, <kbd>Space</kbd>/<kbd>Enter</kbd> to toggle, <kbd>Esc</kbd> to go back)
sets exactly which characters are allowed. Settings from the last generator
session are remembered for the session.

## File browser

| Key | Does |
| --- | --- |
| <kbd>j</kbd> <kbd>k</kbd> | Move through the list |
| <kbd>Enter</kbd> | Open a folder, or pick the focused file |
| <kbd>/</kbd> | Filter the list |
| <kbd>D</kbd> | Locations: home, other disks (a read-only disk is marked) |
| <kbd>Ctrl</kbd>+<kbd>h</kbd> | Show or hide dotfiles |
| <kbd>a</kbd> | New item — <kbd>f</kbd> file, <kbd>d</kbd> folder |
| <kbd>r</kbd> | Rename |
| <kbd>d</kbd> | Delete (asks first) |
| <kbd>n</kbd> | Edit the destination name when exporting or sharing |
| <kbd>e</kbd> | Write the export or the share bundle to that name |
| <kbd>Esc</kbd> | Close the browser, even while a slow directory is still loading |

The browser lists names, not contents: it never opens a file to see what it is.
Opening a folder on a slow mount cannot freeze the interface, and a cloud-sync
placeholder is not hydrated just because you looked at the list.

## Prompts

| Prompt | Keys |
| --- | --- |
| Delete a field | <kbd>y</kbd> deletes, anything else cancels |
| Delete a node, file, or recent path | <kbd>y</kbd> or <kbd>Enter</kbd> confirms, any other key cancels |
| Overwrite an existing export | <kbd>y</kbd> or <kbd>Enter</kbd> overwrites |
| Passwordless file or bundle | <kbd>y</kbd> or <kbd>Enter</kbd> means yes |
| Failed save while quitting | <kbd>r</kbd> retries, <kbd>q</kbd> quits without saving, any other key stays |
