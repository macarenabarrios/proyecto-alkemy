import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';

const Library = sequelize.define("library", {
},
  {
    paranoid: true
  }
);

export default Library;