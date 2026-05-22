# Changelog

## [1.0.0] - 2026-05-21

### Added
- Initial release of `typescript-starter-node-cli`
- Zero-dependency CLI command parser (`src/cli/parser.ts`)
  - Commands and subcommands
  - Long/short options, boolean flags, negation (`--no-flag`)
  - Repeated multi-value options
  - Positional arguments and `--` separator
  - Default values and required-option validation
  - Auto-generated help text via `buildHelp()`
- Full Vitest test suite for the parser
- Example `greet` and `deploy` commands wired in `src/index.ts`
- Chalk-powered logger (`src/logger.ts`)
- webpack bundle configuration targeting Node.js
