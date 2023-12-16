import cron from "node-cron";
import { loanRepository } from "../repositories/loan.repository.js"
import { sendDueLoanNotification } from "../services/email.service.js";


const dueLoans = async () => {
	//Almacena en una variable la fecha actual.
	const currentDate = new Date();
	
	//Adapta la fecha actual al formato ISO necesario para la DB.
	const formatDate = currentDate.toISOString();

	//Traigo todos los prestamos que correspondan al dia o a la fecha actual.
	const dueLoans = await loanRepository.getDueDateAllLoans(formatDate);

	//Recorro todo los prestamos y mando el aviso por mail con los datos correspondientes
	for (const loan of dueLoans) {
		await sendDueLoanNotification(loan.user.email, loan.user.firstname, {
			books: loan.book.title,
			loanDate: loan.startDate,
			dueDate: loan.dueDate,
		});
	}
	// console.log("LOANS ARRAY[]: ", JSON.stringify(dueLoans, 0 , 2))
}

// Funcion que verifica el vencimiento de los prestamos todos los dias a las 24:00hs o 00:00hs
export const dueReminder = () => {
	cron.schedule('0 0 0 * * *', () => {
		dueLoans();
	});
}
