# ReactTemplate

This template is meant to be used as a starting point for a react application. It sets up the basic tools and provides scripts for the most important commands.

## Build Tool

This template uses [Vite](https://vitejs.dev/guide/) as build tool. It is easy to use and configure and has great support for React.

## Code-Quality Tool

To ensure good code quality the [Biome](https://biomejs.dev) linter is set up in this template. Compared to ESLint it excels with more detailed output on how to improve code.
Furthermore this project uses [TypeScript](https://www.typescriptlang.org) to ensure type safety throughout the project.

## Testing

Since we use Vite to bundle the code we decided to choose [Vitest](https://vitest.dev) to test our code. It integrates pretty well and has a simple api. Note that for browser emulation the [happy-dom](https://github.com/capricorn86/happy-dom/wiki/) environment is used. It is more lightweight and faster than js-dom but does not provide all browser apis.

## Available scripts

- `build` bundles and minifies the code into a production build; the files can then be found in the "dist" directory
- `dev` starts up a dev server with hmr which should be used for development
- `lint` executes biome to check all files in the src directory
- `lint:fix` works the same as `lint` but tries to fix found issues if possible
- `types:check` runs through the code and checks whether there are type errors
- `test` runs all tests and starts a watcher which will re run a test if one of the affected files of a respective test changes

## Workflows

To ensure a stable state for the projects which fork from this template a basic workflow is defined. It consists of three steps.

- the first step checks whether the packages can be clean installed using the `npm ci` command
- the second step checks the code quality and runs the `types:check` and `lint` [scripts](#available-scripts)
- the last step checks whether all tests pass, by running the `test` [script](#available-scripts)
