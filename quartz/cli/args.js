export const CommonArgv = {
  directory: {
    string: true,
    alias: ["d"],
    default: "content",
    describe: "directory to look for content files",
  },
  verbose: {
    boolean: true,
    alias: ["v"],
    default: false,
    describe: "print out extra logging information",
  },
  concurrency: {
    number: true,
    alias: ["c"],
    describe: "max parallel operations (default: number of CPU cores)",
  },
}

export const CreateArgv = {
  ...CommonArgv,
  template: {
    string: true,
    alias: ["t"],
    choices: ["default", "obsidian", "ttrpg", "blog"],
    describe: "template to use for initial configuration",
  },
  source: {
    string: true,
    alias: ["s"],
    describe: "source directory to copy/create symlink from",
  },
  strategy: {
    string: true,
    alias: ["X"],
    choices: ["new", "copy", "symlink"],
    describe: "strategy for content folder setup",
  },
  baseUrl: {
    string: true,
    alias: ["b"],
    describe: "base URL for your Quartz site (e.g. mysite.github.io/quartz)",
  },
  links: {
    string: true,
    alias: ["l"],
    choices: ["absolute", "shortest", "relative"],
    describe: "strategy to resolve links",
  },
}

export const SyncArgv = {
  ...CommonArgv,
  commit: {
    boolean: true,
    default: true,
    describe: "create a git commit for your unsaved changes",
  },
  message: {
    string: true,
    alias: ["m"],
    describe: "option to override the default Quartz commit message",
  },
  push: {
    boolean: true,
    default: true,
    describe: "push updates to your Quartz fork",
  },
  pull: {
    boolean: true,
    default: true,
    describe: "pull updates from your Quartz fork",
  },
}

export const BuildArgv = {
  ...CommonArgv,
  output: {
    string: true,
    alias: ["o"],
    default: "public",
    describe: "output folder for files",
  },
  serve: {
    boolean: true,
    default: false,
    describe: "run a local server to live-preview your Quartz",
  },
  watch: {
    boolean: true,
    default: false,
    describe: "watch for changes and rebuild automatically",
  },
  baseDir: {
    string: true,
    default: "",
    describe: "base path to serve your local server on",
  },
  port: {
    number: true,
    default: 8080,
    describe: "port to serve Quartz on",
  },
  wsPort: {
    number: true,
    default: 3001,
    describe: "port to use for WebSocket-based hot-reload notifications",
  },
  remoteDevHost: {
    string: true,
    default: "",
    describe:
      "hostname to use for the hot-reload WebSocket connection if you are not developing on localhost",
  },
  bundleInfo: {
    boolean: true,
    default: false,
    describe: "show detailed bundle information",
  },
}
