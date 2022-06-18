const Hapi = require('@hapi/hapi'),
    routes = require('./src/routes');

const init = async () => {
    const server = Hapi.server({
        port: 5005,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server runs on ${server.info.uri}`);
}

init();
