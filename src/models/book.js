const Loan = require("./loan")

const Book = (sequelize, DataTypes) => {
    const book = sequelize.define('book', {
        id : {
            type: DataTypes.STRING(10),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(200),
            defaultValue:
            "https://images-na.ssl-images-amazon.com/images/I/417efBUAHCL._SX317_BO1,204,203,200_.jpg",
        },
        school: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, 
    {
        charset: 'utf8',
        freezeTableName: true,
        tableName: 'book',
    });
    book.associate = () => {
        Book.hasMany(Loan, { foreignKey: "bookId", sourceKey: "id" })
        Loan.belongsTo(Book, { foreignKey: "bookId" })
    }
    return book
}
module.exports = Book