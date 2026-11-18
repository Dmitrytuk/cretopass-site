---
title: Compared with pass, gopass and KeePassXC
section: Reference
nav_order: 9
summary: A table, and then the part that matters — which of these four is the wrong tool for which job.
---

Four offline secret stores, one of which I wrote. None of them is the best at
everything, and the differences below are the ones that decide the choice.

## The table

|  | cretopass | pass | gopass | KeePassXC |
| --- | --- | --- | --- | --- |
| Interface | TUI, tree, vim keys | commands + `$EDITOR` | commands, optional TUI | Qt application |
| Unit of storage | one encrypted file | one file per secret | one file per secret (a store) | one KDBX database |
| Encryption | age, passphrase (scrypt) | GPG | GPG, age | AES-256 / ChaCha20, KDBX 4 |
| More than a password | any fields on a node | the file holds whatever you write | structured entries | structured entries |
| Network | none, by design | none | git remotes if you set them | none |
| Sync | the file syncs; one writer at a time | git or any sync tool | git built in | any sync tool |
| Browser integration | none | none | none | yes, first-class |
| Mobile app | none | third-party | third-party | yes, official ports exist |
| Hardware keys | no | via GPG | via GPG | yes, YubiKey support |
| Independent audit | no | GPG itself is audited, the wrapper is not | no formal audit | no formal audit of the whole app |
| Install today | cargo, release binaries | distro packages | distro packages, brew | packages everywhere |
| Age of the project | new | long | long | long |
| Licence | MIT | GPL-2.0 | MIT | GPL-2.0/3.0 |

"None" in the network row means the program makes no requests as shipped.
Anything that syncs is doing it through git or a file-sync client, outside the
app.

## When cretopass is the right choice

- You are already in a terminal and want the tree visible while you work.
- You want one file whose backup and restore are `cp`.
- You want a node that can hold a token, a PIN and a note, not only a password.
- You like that the binary cannot reach the network at all, and you would rather
  have no update mechanism than a signed one.

## When it is the wrong choice

- **You want autofill in a browser.** KeePassXC, and nothing here will change
  that.
- **You need it on a phone.** KeePassXC's ecosystem, or a hosted manager.
- **Several people share the same set of secrets.** There is no shared account
  and no merge. A share bundle is a copy you hand over, once.
- **Two machines edit the vault all day.** No conflict resolution exists; you
  will lose edits.
- **You need a team audit trail, SSO, or role-based access.** That is a
  different category of product.
- **You want an audited tool with a decade of adversarial attention.**
  KeePassXC and age itself have more eyes on them than this project does.

## If you are choosing between `pass` and this

Choose `pass` if you want every secret as an individual file, if you already
trust your GPG setup, or if you want to use the secrets with other shell tools.
Choose cretopass if you want to see the structure, avoid GPG, and keep the whole
vault as one movable object.

The two do not interoperate. There is no importer for the `pass` layout; you
would export to CSV from a wrapper and import the CSV.

## If you are choosing between gopass and this

gopass wins on team git workflow, on having many stores, and on being a mature
command-line tool with scripting. It is the better answer when "secret store" is
part of an existing shell or CI workflow.

cretopass has no CLI surface to script against. If you need to read a secret in
a shell pipeline, gopass already does that and this does not.

## If you are choosing between KeePassXC and this

KeePassXC wins on features by a wide margin: browser integration, hardware keys,
key files, mobile clients, and a format with independent readers. If any of those
is a requirement, the comparison ends there.

cretopass wins on one thing: the work happens where you already are, with no
window and no database format to think about. If that is not a problem you have,
it is not a benefit you need.
