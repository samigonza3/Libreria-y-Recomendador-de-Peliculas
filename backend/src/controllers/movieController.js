const db = require("../config/database");




  exports.listAllMovies = async (req, res) => {
    try {
      const response = await db.query('SELECT * FROM public.movies ORDER BY rating DESC');
      res.status(200).send(response.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Hubo un error al listar las películas.' });
    }
  };


  exports.createMovie = async (req, res) => {
    const { titulo, director, genero, year, sinopsis, rating, link_imdb, link_thumb } = req.body;

    if (!titulo || !director || !genero || !year || !sinopsis || !rating || !link_imdb || !link_thumb) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    const query = 'INSERT INTO public.movies (titulo, director, genero, year, sinopsis, rating, link_imdb, link_thumb) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [titulo, director, genero, year, sinopsis, rating, link_imdb, link_thumb];

    db.query(query, values)
      .then(() => {
        res.status(201).json({ mensaje: 'Película agregada con éxito' });
      })
      .catch((error) => {
        console.error('Error al agregar la película:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
      });
  };

  exports.deleteMovie = async (req, res) => {
    const id_movie = parseInt(req.params.id);

    await db.query('DELETE FROM public.movies WHERE id_movie = $1', [id_movie]);

    res.status(200).send({ message: `Película con ID ${id_movie} eliminada exitosamente.` });
  };


  exports.updateMovie = async (req, res) => {
    const id_movie = parseInt(req.params.id);
    const { titulo, director, genero, year, sinopsis, rating, link_imdb, link_thumb } = req.body;

    await db.query(
      "UPDATE public.movies SET titulo = $1, director = $2, genero = $3, year = $4, sinopsis = $5, rating = $6, link_imdb = $7, link_thumb = $8 WHERE id_movie = $9",
      [titulo, director, genero, year, sinopsis, rating, link_imdb, link_thumb, id_movie]
    );

    res.status(200).send({ message: `Película con ID ${id_movie} actualizada exitosamente.` });
  };
