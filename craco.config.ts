import path from 'path'

const config = {
    webpack: {
        alias: {
            '@engine': path.resolve(__dirname, 'src/engine'),
            '@images': path.resolve(__dirname, 'src/content/images'),
            '@sounds': path.resolve(__dirname, 'src/content/sounds'),
            '@data': path.resolve(__dirname, 'src/content/data'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@schemas': path.resolve(__dirname, 'src/schemas'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@pages': path.resolve(__dirname, 'src/views/pages'),
            '@components': path.resolve(__dirname, 'src/views/components'),
            '@configs': path.resolve(__dirname, 'src/content/configs'),
        },
    },
}

export default config
