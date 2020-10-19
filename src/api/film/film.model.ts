import { DataTypes } from "sequelize";

import DatabaseConnection from "../../db";

const Film = DatabaseConnection.define("film", {
  filmId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
  },
  language_id: {
    type: DataTypes.SMALLINT,
  },
  rental_duration: {
    type: DataTypes.SMALLINT,
  },
  rental_rate: {
    type: DataTypes.NUMBER,
  },
  length: {
    type: DataTypes.SMALLINT,
  },
  replacement_cost: {
    type: DataTypes.NUMBER,
  },
  rating: {
    type: DataTypes.STRING,
  },
  last_update: {
    type: DataTypes.DATE,
  },
  special_features: {
    type: DataTypes.TEXT,
  },
  fulltext: {
    type: DataTypes.TEXT,
  },
});

export default Film;
