module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      published: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'published_at', 
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at', 
      },
    }, {
      tableName: 'blog_posts',
      underscored: true,
      timestamps: false,
    });
  
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author',
      });
    };
  
    return BlogPost;
  };
  