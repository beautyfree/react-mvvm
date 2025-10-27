"use strict";
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    __DEV__: false,
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
    },
  },
  moduleNameMapper: {
    "react-mvvm": "<rootDir>/src",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.cjs"],
  coverageReporters: ["json-summary", "text"],
};
