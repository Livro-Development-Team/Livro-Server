import { Sequelize } from 'sequelize'
import { config } from './database'

const db = {};

const sequelize = new Sequelize(
    config.database.database,
    config.database.user,
    config.database.password,
    config,
    {
        host: config.database.host,
        dialect: "mysql",
        define: {
            timestamps: false,
        },
        timezone: "+09:00",
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
        },
        pool: {
            max: 30,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

db.sequelize = sequelize
db.Sequelize = Sequelize

// Import model function from ../models/...js
import { User } from '../models/user'
import { Loan } from '../models/loan'
import { Notice } from '../models/notice'
import { Book } from '../models/book'

// Add model
db.User = User(sequelize, Sequelize);
db.Loan = Loan(sequelize, Sequelize);
db.Notice = Notice(sequelize, Sequelize);
db.Book = Book(sequelize, Sequelize);

module.exports = db;