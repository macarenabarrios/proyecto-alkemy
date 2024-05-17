//import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Proyecto alkemy',
			version: '1.0.0',
			description: 'Documentación de la API de usuarios con Swagger',
		},
		servers: [
			{
				url: `http://localhost:3000${API_ENDPOINT}`,
			},
		],
	},
	tags: [
		{
			name: 'Auth',
			description: 'Operaciones relacionadas con el login',
		},
		{
			name: 'Author',
			description: 'Operaciones relacionadas con los autores',
		},
		{
			name: 'Book',
			description: 'Operaciones relacionadas con los libros',
		},
		{
			name: 'Category',
			description: 'Operaciones relacionadas con las categorías',
		},
		{
			name: 'Event',
			description: 'Operaciones relacionadas con los eventos',
		},
		{
			name: 'Library',
			description: 'Operaciones relacionadas con las librerías',
		},
		{
			name: 'Loan',
			description: 'Operaciones relacionadas con los prestamos',
		},
		{
			name: 'Publisher',
			description: 'Operaciones relacionadas con las editoriales',
		},
		{
			name: 'Review',
			description: 'Operaciones relacionadas con las reviews',
		},
		{
			name: 'User',
			description: 'Operaciones relacionadas con los usuarios',
		},
	],
	apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);

export { swaggerDocs };