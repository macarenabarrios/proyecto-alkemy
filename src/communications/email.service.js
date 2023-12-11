import nodemailer from 'nodemailer';
import newLoanMessage from './messages/newLoan.message.js';
import newBookNotification from './messages/newBook.message.js';
import newBookAndAuthorNotification from './messages/newBookAndAuthor.message.js';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	},
});

console.log(process.env.GMAIL_USER,"--",process.env.GMAIL_PASS);

const createMailOptions = (to, subject, text) => {
	return {
		from: process.env.GMAIL_USER,
		to: Array.isArray(to) ? to.join(', ') : to,
		subject,
		text,
	};
};

const sendEmail = async (to, subject, text) => {
	const mailOptions = createMailOptions(to, subject, text);

	console.log("sendEmail", mailOptions);
	try {
		await transporter.sendMail(mailOptions);
		console.log('Correo electrónico enviado con éxito');
	} catch (error) {
		console.error('Error al enviar el correo electrónico:', error);
		throw new Error('Error al enviar el correo electrónico');
	}
};

const sendLoanNotification = async (to, firstname, loanDetails) => {
	const { books, loanDate, dueDate } = loanDetails;

	const text = newLoanMessage
		.replace('{firstname}', firstname)
		.replace('{Libro}', books)
		.replace('{Fecha}', loanDate)
		.replace('{Fecha de vencimiento}', dueDate);

	const mailOptions = createMailOptions(to, 'Nuevo Préstamo en Alkemy Library', text);

	try {
		await transporter.sendMail(mailOptions);
		console.log('Correo electrónico enviado con éxito');
	} catch (error) {
		console.error('Error al enviar el correo electrónico:', error);
		throw new Error('Error al enviar el correo electrónico');
	}
};

const sendNewNotification = async (to, firstname, data) => {
	const { book, author, subject, createdAt } = data;

	const authorString = author.map(author => `${author.firstName} ${author.lastName}`).join(', ');

	const text = subject === 'Nuevo Autor y Libro en Alkemy Library'
		? newBookAndAuthorNotification
			.replace('{firstname}', firstname)
			.replace('{Libro}', book)
			.replace('{Autor}', authorString)
			.replace('{Fecha de ingreso}', new Date(createdAt).toLocaleDateString())
		: newBookNotification
			.replace('{firstname}', firstname)
			.replace('{Libro}', book)
			.replace('{Autor}', authorString)
			.replace('{Fecha de ingreso}', new Date(createdAt).toLocaleDateString());

	const mailOptions = createMailOptions(to, subject, text);

	try {
		await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text);
	} catch (error) {
		console.error(`Error al enviar el correo electrónico (${subject}):`, error);
		throw new Error(`Error al enviar el correo electrónico (${subject})`);
	}
};

export {
	sendEmail,
	sendLoanNotification,
	sendNewNotification
};