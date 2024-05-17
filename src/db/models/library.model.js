import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';

const Library = sequelize.define("libraries", {
},
  {
    paranoid: true
  }
);

export default Library;