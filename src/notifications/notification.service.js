import { Server } from 'socket.io';

let io;

// Configura Socket.IO con el servidor
function configureSocketIO(server) {
	io = new Server(server, {
		cors: {
			origin: "http://localhost:3000", // Cambia esto con la URL de tu aplicación
			methods: ["GET", "POST"]
		}
	});

	io.on('connection', (socket) => {
		console.log('User connected');
	});
};

// Emite un evento de nuevo libro disponible
function notifyNewBookAvailable(book) {
	if (io) {
		// Emite el evento 'libroDisponible' con los detalles del nuevo libro
		io.emit('libroDisponible', {
			id: book.id,
			title: book.title,
			description: book.description,
		});
	} else {
		console.error('Socket.IO no ha sido configurado. Asegúrate de llamar a configureSocketIO con el servidor.');
	}
};

export { configureSocketIO, notifyNewBookAvailable };
