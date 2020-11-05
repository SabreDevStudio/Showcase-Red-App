let config = {
    "globals"             : {
        "ts-jest": {
            "tsConfig": "tsconfig.json",
            "diagnostics": true,
            "isolatedModules": true
        }
    },
    "transform"           : {
        "^.+\\.tsx?$": "ts-jest"
    },
    "snapshotSerializers" : [
        "enzyme-to-json/serializer"
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "json"
    ],
    "setupFiles"          : [
        "raf/polyfill"
    ],
    "testURL"             : "https://localhost",
    "setupFilesAfterEnv"  : ["<rootDir>/core/jest/test-setup.js"]
};

module.exports = config;
