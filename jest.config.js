module.exports = {
    transform: {
        '^.+\\.m?js$': 'babel-jest', // Usa Babel para transformar arquivos .js ou .mjs
    },
    testEnvironment: 'node', // Especifica o ambiente de teste como Node
};
