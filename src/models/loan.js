const Loan = (sequelize, DataTypes) => {
	const loan = sequelize.define(
		'loan',
		{
			uuid: {
				type: DataTypes.STRING(50),
				primaryKey: true,
			},
			userUuid: {
				type: DataTypes.STRING(50),
				allowNull: false,
				field: 'user_uuid',
			},
			bookId: {
				type: DataTypes.STRING(10),
				allowNull: false,
				field: 'book_id',
			},
			school: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				field: 'created_at',
			},
			deletedAt: {
				type: DataTypes.STRING(30),
				field: 'deleted_at',
			},
		},
		{
			charset: 'utf8',
			freezeTableName: true,
			tableName: 'loan',
		},
	);
	return loan;
};

module.exports = Loan;
