import path from 'path'

const config = {
    webpack: {
        alias: {
            '@content': path.resolve(__dirname, 'src/content'),
            '@engine': path.resolve(__dirname, 'src/engine'),
            '@images': path.resolve(__dirname, 'src/images'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@schemas': path.resolve(__dirname, 'src/schemas'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@configs': path.resolve(__dirname, 'src/configs'),
        },
    },
}

export default config
