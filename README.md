# Turborepo For Teams

This Turborepo starter is maintained by the Turborepo core team. and configuration apps and packages by Ahmad Safari (ahamdsafari118128@gmail.com)

## Using this example

Run the following command:

```sh
## use node version > 22
pnpm i ## if get api-config not find, run pnpm build and after run pnpm i again
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `react-app`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `shared-ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `react-app` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/api-config`: the simple axios class for share in apps
- `@repo/math-config`: the simple config for share utils in apps
- `@repo/playwright-config`: `base.config.ts` used throughout the monorepo for e2e tests
- `@repo/vitest-config`: share config for unit test

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/shared-ui

This example is set up to produce compiled styles for `shared-ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.ts`. This was chosen for several reasons:

- Make sharing one `tailwind.config.ts` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.ts` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.ts](packages/tailwind-config/tailwind.config.ts):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/shared-ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `shared-ui` package.

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

#### USAGE

#### STORYBOOK

```sh
pnpm storybook
```

#### DEV MODE

```sh
pnpm dev
```

#### BUILD MODE

```sh
pnpm build
```

#### LINT

```sh
## check lint
pnpm lint

## fix lint
pnpm lint:fix

## reformat with prettier config
pnpm format
```

#### TESTING

```sh
pnpm --filter @repo/playwright-config run build
```

##### Build And Running E2E Tests with Playwright

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

```bash
## Build Playwright Config
pnpm --filter @repo/playwright-config run build

## Running e2e Tests with playwright
pnpm e2e


## Show reports e2e Tests with playwright
pnpm e2e:report
```

##### Running Unit Tests with Vitest

This project uses [Vitest](https://vitest.dev/) for unit testing.
To run tests in all packages/apps using Turborepo caching:

```bash
## Run Unit test
pnpm test

## show report unit test
pnpm report
```
