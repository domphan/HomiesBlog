module.exports = api => {
  api.cache(true);

  const plugins = [
    ["@babel/plugin-transform-typescript"],
    ["transform-es2015-modules-commonjs"],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties"
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "useESModules": true
      }
    ],
    ["@babel/proposal-object-rest-spread"]
  ];

  const presets = [
    ["@babel/env", {
      targets: {
        node: 'current'
      }
    }],
    "@babel/typescript"
  ];

  return {
    presets,
    plugins
  };
}