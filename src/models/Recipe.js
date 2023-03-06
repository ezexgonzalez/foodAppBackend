const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    code:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore:{
      type: DataTypes.INTEGER,
    },
    healthScore:{
      type: DataTypes.STRING
    },
    image : {
      type: DataTypes.STRING
    }
  });
};

