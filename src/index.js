import webpack from 'webpack'
import chalk from 'chalk'
import { HookMap } from 'tapable'
const PluginName = 'webpack-plugin-hooks'
const padding = 20
class WebpackPluginHooks {
  constructor() {}
  apply(compiler) {
    // do nothing for production
    if (compiler.options.mode === 'production') return

    // intercept all compiler's hooks
    Object.keys(compiler.hooks).forEach((hook) => {
      compiler.hooks[hook].intercept({
        call: () => {
          console.log(chalk.bgGreen('compiler.hooks'.padStart(padding)), hook)
        },
      })
    })

    // TODO intercept all compilation's hooks
    compiler.hooks.compilation.tap(PluginName, (compilation) => {
      Object.keys(compilation.hooks).forEach((key) => {
        const hook = compilation.hooks[key]
        if (hook instanceof HookMap) {
          // TODO
        } else {
          try {
            hook.intercept({
              call: () =>
                console.log(
                  chalk.bgCyan('compilation.hooks'.padStart(padding)),
                  key
                ),
            })
          } catch (err) {
            // additionalchunkassets, etc.
          }
        }
      })
    })
    // how to distinguish HookMap
    // Do I have to tap compiler.hooks.compilation to get compilation.hooks?
  }
}
export default WebpackPluginHooks
