module.exports = {
    // if you're also using typescript
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    // registers babel.config.js with jest
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    // explicitly include any node libs using ESM modules
    transformIgnorePatterns: ["node_modules/?!(<ESM module here>|<another here>|<etc...>)"],
  }