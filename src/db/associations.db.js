import Role from "./models/role.model.js"
import User from "./models/user.model.js"
import Book from "./models/book.model.js"
import Loan from "./models/loan.model.js"
import Author from "./models/author.model.js"


Role.hasMany(User,{foreignKey: {name:"roleId",field:'role_id'}});

User.belongsTo(Role,{foreignKey: {name:"roleId",field:'role_id'}});


User.belongsToMany(Book, {through: Loan,foreignKey: {name:"userId",field:'user_id'}})

Book.belongsToMany(User, {through: Loan,foreignKey: {name:"bookId",field:'book_id'}})

Author.belongsToMany(Book, { through: 'Book_Author', timestamps: false });

Book.belongsToMany(Author, { through: 'Book_Author', timestamps: false });