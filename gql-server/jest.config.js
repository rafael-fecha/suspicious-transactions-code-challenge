module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    transform: {
      "^.+\\.js$": "babel-jest",
    }
  }