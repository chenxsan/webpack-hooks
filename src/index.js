import webpack from 'webpack'
import chalk from 'chalk'
import { HookMap } from 'tapable'
class WebpackPluginHooks {
  constructor() {}
  apply(compiler) {
    // do nothing for production
    if (compiler.options.mode === 'production') return

    // intercept all compiler's hooks
    Object.keys(compiler.hooks).forEach((hook) => {
      compiler.hooks[hook].intercept({
        call: () => {
          console.log(chalk.bgGreen('compiler.hooks'), hook)
        },
      })
    })

    // TODO intercept all compilation's hooks
    // how to distinguish HookMap
  }
}
export default WebpackPluginHooks
