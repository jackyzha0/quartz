# Changesets

Quartz is versioned with [changesets](https://github.com/changesets/changesets). Every pull request that changes how Quartz behaves should include a changeset:

```shell
npx changeset
```

Pick the bump (`patch` for fixes, `minor` for new features and new plugin APIs, `major` for breaking changes) and describe the change for users — the text ends up in `CHANGELOG.md` and the GitHub release notes.

On every push to `v5`, the release workflow opens (or updates) a "chore: release Quartz" pull request that bumps the version in `package.json` and writes `CHANGELOG.md`. Merging it tags the commit `vX.Y.Z` and publishes a GitHub release. Quartz is not published to npm.

See `docs/advanced/versioning.md` for what the version means for users and plugin authors.
