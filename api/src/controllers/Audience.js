const { Audience, Videogame } = require('../db.js');

const getAudiences = async (req, res, next) => {
  try {
    const audiences = await Audience.findAll();

    if (audiences.length) res.status(200).json(audiences);
    else res.status(204).send('No se encontraron audiencias');

  } catch (error) {
    next(error);
  }
};

const getVideogamesByAudience = async (req, res, next) => {
  const { audienceId } = req.params;
  try {
    const gamesByAudience = await Audience.findByPk(audienceId, {
      include: [
        {
          model: Videogame,
          attributes: {
            exclude: ['description', 'minReq', 'recommendedReq'],
          },
          through: { attributes: [] },
        },
      ],
    });

    if (gamesByAudience.videogames.length) {
      res.status(200).json(gamesByAudience);
    } else {
      res.status(201).send('No hay videojuegos para esa audiencia');
    }

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAudiences,
  getVideogamesByAudience,
};
