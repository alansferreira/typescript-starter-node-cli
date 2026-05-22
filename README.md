# typescript-starter-node-cli

A TypeScript starter for Node.js CLI applications with a zero-dependency command parser built-in.

## Features

- **Built-in command parser** — no dependencies like `commander` or `yargs` required
- Commands and subcommands
- Long options (`--name value`, `--name=value`)
- Short aliases (`-n value`, `-n=value`)
- Boolean flags (`--verbose`, `--no-verbose`)
- Repeated values (`--tag a --tag b` → `['a', 'b']`)
- Positional arguments and `--` separator
- Default values and required-option validation
- Auto-generated help text
- TypeScript-first with full types exported

## Structure

```
src/
  index.ts          # Entrypoint — wire up CLI definition + dispatch
  logger.ts         # Chalk-based logger
  cli/
    parser.ts       # Core command parser (no external runtime dependencies)
    parser.test.ts  # Full test suite for the parser
```

## Quick Start

```bash
npm install
npm run dev -- --help
npm run dev -- greet --name Alice
npm run dev -- greet --name Alice --upper
npm run dev -- deploy --env production --port 8080
npm run dev -- deploy --env staging --dry-run --tag v1 --tag latest
```

## Parser API

```ts
import { parseArgv, buildHelp, type CliDef } from '@/cli/parser'

const cli: CliDef = {
  name: 'mycli',
  version: '1.0.0',
  description: 'My CLI tool',
  globalOptions: [
    { name: 'config', alias: 'c', type: 'string', description: 'Config file path' },
  ],
  commands: [
    {
      name: 'deploy',
      description: 'Deploy the app',
      options: [
        { name: 'env', alias: 'e', type: 'string', required: true },
        { name: 'port', alias: 'p', type: 'number', default: 3000 },
        { name: 'dry-run', type: 'boolean', default: false },
      ],
    },
  ],
}

const { result, errors } = parseArgv(process.argv.slice(2), cli)

if (result.help) {
  console.log(buildHelp(cli, result.command ?? undefined))
  process.exit(0)
}
```

### `parseArgv(argv, cli)`

Returns `{ result: ParsedResult, errors: ParseError[] }`.

| Field | Type | Description |
|---|---|---|
| `result.command` | `string \| null` | Matched command name |
| `result.positionals` | `string[]` | Non-flag tokens |
| `result.options` | `Record<string, OptionValue>` | Resolved options (defaults applied) |
| `result.help` | `boolean` | `--help` / `-h` was present |
| `result.version` | `boolean` | `--version` / `-v` was present |

### Error types

| `type` | When |
|---|---|
| `unknown-command` | First token doesn't match any command |
| `unknown-option` | Flag not defined in the CLI definition |
| `missing-required` | Required option absent or value missing |
| `bad-value` | Value can't be coerced to declared type |

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run via `tsx` (no build needed) |
| `npm test` | Run test suite once |
| `npm run test:watch` | Watch mode |
| `npm run build` | Bundle to `dist/index.js` via webpack |
| `npm start` | Run the built bundle |
