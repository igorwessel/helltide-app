module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@core": "./src/core",
            "@hooks": "./src/hooks",
            "@types": "./src/types",
            "@ui": "./src/ui",
          },
        },
      ],
    ],
  };
};
