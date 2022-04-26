# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2021-03-25
### Changed
- Renderer: Don't render links if Resolver returns an empty destination.

[0.3.0]: https://github.com/abhinav/goldmark-wikilink/releases/tag/v0.3.0

## [0.2.0] - 2021-03-23
### Added
- Node: Add `Fragment` field to track the `#` portion of a link.

### Changed
- Parser: Pull apart `#` portion of a link into Fragment field.
- Renderer: Support links without titles. This makes wikilink references to
  headers in the same document possible with `[[#Foo]]` possible.

[0.2.0]: https://github.com/abhinav/goldmark-wikilink/releases/tag/v0.2.0

## [0.1.0] - 2021-03-14
- Initial release.

[0.1.0]: https://github.com/abhinav/goldmark-wikilink/releases/tag/v0.1.0
