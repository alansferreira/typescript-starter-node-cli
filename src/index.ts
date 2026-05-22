#!/usr/bin/env node
import {
  binary,
  command,
  flag,
  multioption,
  option,
  positional,
  run,
  string,
  number,
  boolean,
  array,
  subcommands,
} from 'cmd-ts'
import { logger } from '@/logger'

// ─── greet ───────────────────────────────────────────────────────────────────

const greet = command({
  name: 'greet',
  description: 'Greet someone by name',
  args: {
    name: option({
      long: 'name',
      short: 'n',
      type: string,
      description: 'Name to greet',
    }),
    upper: flag({
      long: 'upper',
      defaultValue: () => false,
      description: 'Uppercase the output',
    }),
  },
  handler: ({ name, upper }) => {
    const msg = `Hello, ${name}!`
    logger.success(upper ? msg.toUpperCase() : msg)
  },
})

// ─── deploy ──────────────────────────────────────────────────────────────────

const deploy = command({
  name: 'deploy',
  description: 'Deploy the application',
  args: {
    environment: positional({
      type: string,
      displayName: 'environment',
      description: 'Target environment (e.g. staging, production)',
    }),
    port: option({
      long: 'port',
      short: 'p',
      type: number,
      defaultValue: () => 3000,
      description: 'Port to bind',
    }),
    dryRun: flag({
      long: 'dry-run',
      defaultValue: () => false,
      description: 'Simulate without making changes',
    }),
    tags: multioption({
      long: 'tag',
      type: array(string),
      description: 'Tags to apply (repeatable)',
    }),
  },
  handler: ({ environment, port, dryRun, tags }) => {
    logger.banner('Deploy')
    logger.pair('environment', environment)
    logger.pair('port', port)
    logger.pair('dry-run', dryRun)
    if (tags.length > 0) logger.pair('tags', tags.join(', '))
    logger.divider()
    if (dryRun) {
      logger.warn('Dry-run mode: no changes will be made.')
    } else {
      logger.success(`Deploying to ${environment} on port ${port}…`)
    }
  },
})

// ─── app ─────────────────────────────────────────────────────────────────────

const app = subcommands({
  name: 'mycli',
  version: '1.0.0',
  description: 'A sample CLI built with typescript-starter-node-cli',
  cmds: { greet, deploy },
})

run(binary(app), process.argv)
