const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {
  }

  Course.init({
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please provide a value for "title"'
            },
            notEmpty: {
              msg: 'Please provide a value for "title"'
            }
          }
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please provide a value for "description"'
            },
            notEmpty: {
              msg: 'Please provide a value for "description"'
            }
          }
        },
        estimatedTime: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        materialsNeeded: {
          type: Sequelize.STRING,
          allowNull: true,
        }
      },
      {sequelize});

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
        validate: {
          notnull: {
            msg: 'Course can only be changed by course creator'
          }
        }
      },
    });
  };
  return Course;
};