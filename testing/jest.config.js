module.exports = {
    testEnvironment: 'node',
    roots: ['./src'],
    preset: 'ts-jest',
    collectCoverageFrom: ['./src/**'],
    silent: false,
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text'], 
    coverageThreshold: {
        global: {
            lines: 90
        }
    }
}