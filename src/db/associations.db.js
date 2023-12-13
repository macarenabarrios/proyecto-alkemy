import Role from './models/role.model.js';
import User from './models/user.model.js';
import Book from './models/book.model.js';
import Loan from './models/loan.model.js';
import Publisher from './models/publisher.model.js';
import Author from './models/author.model.js';
import Review from './models/review.model.js';
import Category from './models/category.model.js';
import BookCategory from './models/bookCategory.model.js';

// Un usuario tiene un rol; un rol tiene mas de un usuario
Role.hasMany(User, { foreignKey: { name: "roleId", field: "role_id" } });
User.belongsTo(Role, { foreignKey: { name: "roleId", field: "role_id" } });

// Un usuario tiene muchos prestamos de libros; un libro puede ser prestado a muchos usuarios
User.belongsToMany(Book, { through: Loan, foreignKey: { name: "userId", field: "user_id" } });
Book.belongsToMany(User, { through: Loan, foreignKey: { name: "bookId", field: "book_id" } });

// Una editorial tiene muchos libros; un libro pertenece a una editorial
Publisher.hasMany(Book, { foreignKey: { name: "publisherId", field: "publisher_id" } });
Book.belongsTo(Publisher, { foreignKey: { name: "publisherId", field: "publisher_id" } });

// Un libro tiene muchos autores; un autor pertenece/puede estar en muchos libros
Author.belongsToMany(Book, { through: "Book_Author", timestamps: false });
Book.belongsToMany(Author, { through: "Book_Author", timestamps: false });

// Un libro tiene muchas reviews; una review pertenece a un libro
Book.hasMany(Review, { foreignKey: { name: "bookId", field: "book_id" } });
Review.belongsTo(Book, { foreignKey: { name: "bookId", field: "book_id" } });

// Un usuario tiene muchas reviews; una review pertenece a un usuario
User.hasMany(Review, { foreignKey: { name: "userId", field: "user_id" } });
Review.belongsTo(User, { foreignKey: { name: "userId", field: "user_id" } });

// Un usuario tiene muchos prestamos; un prestamo pertenece a un usuario
User.hasMany(Loan, { foreignKey: { name: "userId", field: "user_id" } });
Loan.belongsTo(User, { foreignKey: { name: "userId", field: "user_id" } });

// Un libro tiene muchos prestamos (puede ser prestado muchas veces); un prestamo pertenece a un libro
Book.hasMany(Loan, { foreignKey: { name: "bookId", field: "book_id" } });
Loan.belongsTo(Book, { foreignKey: { name: "bookId", field: "book_id" } });

//  Relación entre Category y Book a través de BookCategory (muchos a muchoss)
Category.belongsToMany(Book, { through: BookCategory, foreignKey: { name: "categoryId", field: "category_id" } });
Book.belongsToMany(Category, { through: BookCategory, foreignKey: { name: "bookId", field: "book_id" } });