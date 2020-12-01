module.exports = (sequelize, DataTypes) => {
    sequelize.define(
        'user',
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
                defaultValue: false
            },
        },
    )
}