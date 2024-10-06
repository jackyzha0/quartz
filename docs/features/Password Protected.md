---
title: Password Protected
---

Some notes may be sensitive, i.e. non-public personal projects, contacts, meeting notes and such. It would be really useful to be able to protect some pages or group of pages so they don't appear to everyone, while still allowing them to be published.

By adding a password to your note's frontmatter, you can create an extra layer of security, ensuring that only authorized individuals can access your content. Whether you're safeguarding personal journals, project plans, this feature provides the peace of mind you need.

## How it works

Simply add a password field to your note's frontmatter and set your desired password. When you try to view the note, you'll be prompted to enter the password. If the password is correct, the note will be unlocked. Once unlocked, you can access the note until you clear your browser cookies.

### Security techniques

- Key Derivation: Utilizes PBKDF2 for generating secure encryption keys.
- Unique Salt for Each Encryption: A unique salt is generated every time the encrypt method is used, enhancing security.
- Encryption/Decryption: Implements AES-GCM for robust data encryption and decryption.
- Encoding/Decoding: Use base64 to convert non-textual encrypted data in HTML

### Disclaimer

- Use it at your own risk
- You need to choose a strong password and share it only to trusted users
- You need to secure your notes and Quartz repository in private mode on Github/Gitlab/Bitbucket... or use your own Git server
- You can use other WAF tools to enhance security, based on URL of notes that Quartz build for you, e.g. Cloudflare WAF, AWS WAF, Google Cloud Armor...

## Configuration

- Enable password protected notes: set the `passwordProtected.enabled` field in `quartz.config.ts` to be `true`.
- Change iteration count of key derivation: set the `passwordProtected.iteration` filed in `quartz.config.ts` to any bigger than 2e6.
- Style: `quartz/components/styles/passwordProtected.scss`
- Script: `quartz/components/scripts/decrypt.inline.ts`
