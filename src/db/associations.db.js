import Role from "./models/role.model.js"
import User from "./models/user.model.js"
import Book from "./models/book.model.js"
import Loan from "./models/loan.model.js"


Role.hasMany(User, { foreignKey: { name: "roleId", field: 'role_id' } });

User.belongsTo(Role, { foreignKey: { name: "roleId", field: 'role_id' } });


// User.belongsToMany(Book, { through: Loan, foreignKey: { name: "userId", field: 'user_id' }})

// Book.belongsToMany(User, { through: Loan, foreignKey: { name: "bookId", field: 'book_id' } })

User.hasMany(Loan, { foreignKey: { name: "userId", field: 'user_id' } })
Loan.belongsTo(User, { foreignKey: { name: "userId", field: 'user_id' } })
Book.hasMany(Loan, { foreignKey: { name: "bookId", field: 'book_id' } })
Loan.belongsTo(Book, { foreignKey: { name: "bookId", field: 'book_id' } })

