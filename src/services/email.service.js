import nodemailer from 'nodemailer';
import newLoanMessage from '../config/messages/newLoan.Message.js';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS
	},
});

const sendEmail = async (to, subject, text) => {
	const mailOptions = {
		from: process.env.GMAIL_USER,
		to,
		subject,
		text,
	};

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

	const mailOptions = {
		from: process.env.GMAIL_USER,
		to,
		subject: 'Nuevo Préstamo en Alkemy Library',
		text,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('Correo electrónico enviado con éxito');
	} catch (error) {
		console.error('Error al enviar el correo electrónico:', error);
		throw new Error('Error al enviar el correo electrónico');
	}
};

export {
	sendEmail,
	sendLoanNotification
};