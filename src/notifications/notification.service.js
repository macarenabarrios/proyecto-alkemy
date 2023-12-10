import { Server } from 'socket.io';

function configureSocketIO(server) {
	const io = new Server(server);

	io.on('connection', (socket) => {
		console.log('User connected');

		socket.on('libroDisponible', (mensaje) => {
			console.log(`Libro disponible: ${mensaje}`);
			io.emit('notificacion', 'Nuevo libro disponible');
		});

	});
}

export { configureSocketIO };
