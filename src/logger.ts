import chalk from 'chalk'

const LOG_LEVELS = {
  INFO: 'ℹ',
  SUCCESS: '✓',
  WARN: '⚠',
  ERROR: '✖',
  DEBUG: '◆',
}

export const logger = {
  banner(title: string): void {
    console.log()
    console.log(chalk.cyan('╔' + '═'.repeat(title.length + 2) + '╗'))
    console.log(chalk.cyan(`║ ${title} ║`))
    console.log(chalk.cyan('╚' + '═'.repeat(title.length + 2) + '╝'))
    console.log()
  },

  section(title: string): void {
    console.log()
    console.log(chalk.bold.blue(`→ ${title}`))
    console.log()
  },

  divider(): void {
    console.log(chalk.gray('─'.repeat(60)))
  },

  info(message: string, data?: unknown): void {
    console.log(chalk.cyan(`${LOG_LEVELS.INFO} ${message}`), data ?? '')
  },

  success(message: string, data?: unknown): void {
    console.log(chalk.green(`${LOG_LEVELS.SUCCESS} ${message}`), data ?? '')
  },

  warn(message: string, data?: unknown): void {
    console.log(chalk.yellow(`${LOG_LEVELS.WARN} ${message}`), data ?? '')
  },

  error(message: string, data?: unknown): void {
    console.log(chalk.red(`${LOG_LEVELS.ERROR} ${message}`), data ?? '')
  },

  debug(message: string, data?: unknown): void {
    console.log(chalk.gray(`${LOG_LEVELS.DEBUG} ${message}`), data ?? '')
  },

  pair(key: string, value: unknown): void {
    console.log(chalk.gray(`  ${key}:`), chalk.white(value))
  },

  list(items: string[]): void {
    items.forEach((item) => {
      console.log(chalk.cyan(`  • ${item}`))
    })
  },
}
