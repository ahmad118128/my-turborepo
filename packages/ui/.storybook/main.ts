import { dirname, join, resolve } from "path";

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, "package.json")));
}

export default {
  stories: ["../src/**/*.stories.@(ts|tsx|js|jsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  webpackFinal: async (config: any) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    });

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.alias = {
      ...config.resolve.alias,
      ui: resolve(__dirname, "../../../packages/ui/src/"),
    };

    return config;
  },
};
