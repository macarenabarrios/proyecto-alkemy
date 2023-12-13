import { Server } from 'socket.io';

let io;

// Configure Socket.IO with the server
function configureSocketIO(server) {
	io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"]
		}
	});

	io.on("connection", (socket) => {
		console.log("User connected");

		// Handle "chat message" event
		socket.on("chat message", (data) => {
			console.log(`New chat from user: ${data.sender}: ${data.text}`);
			io.emit("chat message", data); // Emit the message to all connected users
		});


		// Handle "disconnect" event
		socket.on("disconnect", () => {
			console.log("User disconnected");
		});
	});
};

// Emit an event for a new available book
function notifyNewBookAvailable(book) {
	if (io) {
		// Emit the "bookAvailable" event with details of the new book
		io.emit("bookAvailable", {
			id: book.id,
			title: book.title,
			description: book.description,
		});
	} else {
		console.error("Socket.IO has not been configured. Make sure to call configureSocketIO with the server.");
	}
};

export { configureSocketIO, notifyNewBookAvailable };
