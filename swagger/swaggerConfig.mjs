import swaggerJsDoc from 'swagger-jsdoc';
import { CheckListItem, Note } from './swaggerSchemas.mjs';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API',
            version: '1.0.0',
            description: 'API for managing notes with advanced features',
            contact: {
                name: 'Developer',
                email: 'cleo_silva1906@hotmail.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}/api/v1`,
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                CheckListItem,
                Note,
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.mjs'],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export default swaggerSpecs;

