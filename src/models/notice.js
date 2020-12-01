export const Notice = (sequelize, DataTypes) => {
    const notice = sequelize.define('notice', {
        uuid : {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        title : {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        content : {
            type: DataTypes.STRING(500),
        },
        userUuid : {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: "user_uuid",
        },
        school : {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        createdAt : {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: "created_at"
        },
    },
    {
        charset: 'utf8',
        freezeTableName: true,
        tableName: 'notice',
    });
    return notice
}