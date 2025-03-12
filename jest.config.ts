import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-fixed-jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    // Permite importar arquivos CSS e SCSS.
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",

    //Permite encontrar os arquivos de teste e os arquivos de código-fonte.
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
