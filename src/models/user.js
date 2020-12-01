import { Notice } from './notice'

export const User = (sequelize, DataTypes) => {
    const user = sequelize.define('user',
        {
            uuid : {
                type: DataTypes.STRING(50),
                primaryKey: true,
            },
            userId: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
                field: "user_id",
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            school: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            studentNo: {
                type: DataTypes.CHAR(4),
                allowNull: false,
                field: "student_no",
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            charset: 'utf8',
            freezeTableName: true,
            tableName: 'user',
        }
    );
    user.associate = () => {
        User.hasMany(Notice, {
            foreignKey: "userUuid",
            sourceKey: "uuid"
        });
        Notice.belongsTo(User, {
            foreignKey: "userUuid"
        })
    }
    return user
}