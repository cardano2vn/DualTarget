/** @type {import('ts-jest').JestConfigWithTsJest} **/

const jestConfig = {
    testTimeout: 60000,
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};

export default jestConfig;
