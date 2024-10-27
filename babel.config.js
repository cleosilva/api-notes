module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current', // Para garantir que está usando a versão do Node que você tem instalada
            },
        }],
    ],
};
