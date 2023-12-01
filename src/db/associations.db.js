import Role from './models/role.model.js';
import User from './models/user.model.js';
import Book from './models/book.model.js';
import Loan from './models/loan.model.js';
import Publisher from './models/publisher.model.js';
import Author from './models/author.model.js';
import Category from './models/category.model.js';
import BookCategory from './models/bookCategory.model.js';

Role.hasMany(User, { foreignKey: { name: "roleId", field: 'role_id' } });
User.belongsTo(Role, { foreignKey: { name: "roleId", field: 'role_id' } });

Publisher.hasMany(Book, { foreignKey: { name: "publisherId", field: "publisher_id" } });
Book.belongsTo(Publisher, { foreignKey: { name: "publisherId", field: "publisher_id" } });

Author.belongsToMany(Book, { through: 'Book_Author', timestamps: false });
Book.belongsToMany(Author, { through: 'Book_Author', timestamps: false });

User.hasMany(Loan, { foreignKey: { name: "userId", field: 'user_id' } });
Loan.belongsTo(User, { foreignKey: { name: "userId", field: 'user_id' } });

Book.hasMany(Loan, { foreignKey: { name: "bookId", field: 'book_id' } });
Loan.belongsTo(Book, { foreignKey: { name: "bookId", field: 'book_id' } });

Category.hasMany(BookCategory, { foreignKey: { name: "categoryId", field: 'category_id' } });
BookCategory.belongsTo(Category, { foreignKey: { name: "categoryId", field: 'category_id' } });

Book.hasMany(BookCategory, { foreignKey: { name: "bookId", field: 'book_id' } });
BookCategory.belongsTo(Book, { foreignKey: { name: "bookId", field: 'book_id' } });
