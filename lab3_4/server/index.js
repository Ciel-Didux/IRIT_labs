require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize, DataTypes} = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors('*'));
app.use(bodyParser.json());

const sequelize = new Sequelize('movies', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const Movie = sequelize.define('movie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  movieType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

app.get('/movies', async (req, res) => {
  try {
    const movie = await Movie.findAll();
    res.send(movie);
  } catch (err) {
    console.error('Error getting movies', err);
    res.status(500).send('Error getting movies');
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByPk(id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  } catch (err) {
    console.error('Error getting movie', err);
    res.status(500).send('Error getting movie');
  }
});

app.post('/movies', async (req, res) => {
  try {
    const movie = req.body;
    const createdMovie = await Movie.create(movie);
    res.json(createdMovie);
  } catch (err) {
    console.error('Error creating movie', err);
    res.status(500).send('Error creating movie');
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieUpdates = req.body;
    const [numRows, updatedMovie] = await Movie.update(movieUpdates, {where: {id: movieId}});
    if (numRows === 0) {
      res.status(404).send('Movie not found');
    } else {
      res.send(updatedMovie[0]);
    }
  } catch (err) {
    console.error('Error updating movie', err);
    res.status(500).send('Error updating movie');
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const numRows = await Movie.destroy({where: {id: movieId}});
    if (numRows === 0) {
      res.status(404).send('Movie not found');
    } else {
      res.status(204);
    }
  } catch (err) {
    console.error('Error deleting movie', err);
    res.status(500).send('Error deleting movie');
  }
});

sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((err) => {
    console.error('Database sync error', err);
  })