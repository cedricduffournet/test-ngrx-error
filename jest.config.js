module.exports = {
  preset: "jest-preset-angular",
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
  moduleNameMapper: {
    "@example-app/(.*)": "<rootDir>/src/app/$1",
    "@ngrx/store/testing":
      "<rootDir>/node_modules/@ngrx/store/fesm2015/ngrx-store-testing.mjs",
    "@ngrx/effects/testing":
      "<rootDir>/node_modules/@ngrx/effects/fesm2015/ngrx-effects-testing.mjs",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
};
