import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function CreateMovie() {
  const [movieData, setMovieData] = useState({
    titulo: '',
    director: '',
    genero: '',
    year: '',
    sinopsis: '',
    rating: '',
    link_imdb: '', // Nuevo campo link_imdb
    link_thumb: '', // Nuevo campo link_thumb
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9030/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMensaje(data.mensaje);
        setError('');
        // Limpiar los campos del formulario después de agregar la película
        setMovieData({
          titulo: '',
          director: '',
          genero: '',
          year: '',
          sinopsis: '',
          rating: '',
        });
      } else {
        setMensaje('');
        setError(data.mensaje);
      }
    } catch (error) {
      console.error('Error al agregar la película:', error);
      setError('Error interno del servidor');
      setMensaje('');
    }
  };

  return (
    <div className="container">
    <div className="movies-container mt-4">
      <h1 className="mb-4">Agregar Película</h1>
      
      {mensaje && <p className="alert alert-success">{mensaje}</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      
      <form className="formulario form" onSubmit={handleSubmit}>
  
      <div className="row">
      <div className="col-8">

  <div className="form-outline mb-3">
    <label htmlFor="titulo" className="form-label">Título:</label>
    <input
      type="text"
      id="titulo"
      name="titulo"
      value={movieData.titulo}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>  </div>
  <div className="col-4">

  <div className="form-outline mb-3">
    <label htmlFor="year" className="form-label">Año:</label>
    <input
      type="number"
      id="year"
      name="year"
      value={movieData.year}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>  </div></div>
  <div className="row">
      <div className="col-6">

  <div className="mb-3">  
    <label htmlFor="genero" className="form-label">Género:</label>
    <input
      type="text"
      id="genero"
      name="genero"
      value={movieData.genero}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>  </div>

  <div className="col-6">

  
  <div className="mb-3">
    <label htmlFor="director" className="form-label">Director:</label>
    <input
      type="text"
      id="director"
      name="director"
      value={movieData.director}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div></div></div>

  <div className="mb-3">
    <label htmlFor="sinopsis" className="form-label">Sinopsis:</label>
    <textarea
      id="sinopsis"
      name="sinopsis"
      value={movieData.sinopsis}
      onChange={handleChange}
      className="form-control"
      rows='4'
      required
    />
  </div>


  
  <div className="row">
      <div className="col-6">
  <div className="mb-3">
    <label htmlFor="link_imdb" className="form-label">Enlace IMDB:</label>
    <input
      type="text"
      id="link_imdb"
      name="link_imdb"
      value={movieData.link_imdb}
      onChange={handleChange}
      className="form-control"
    />
  </div></div>
  <div className="col-6">
  <div className="mb-3">
    <label htmlFor="link_thumb" className="form-label">Enlace de la Miniatura:</label>
    <input
      type="text"
      id="link_thumb"
      name="link_thumb"
      value={movieData.link_thumb}
      onChange={handleChange}
      className="form-control"
    />
  </div></div>
  <div className="row">
      <div className="col-2">
  <div className="mb-3">
    <label htmlFor="director" className="form-label">Puntuación:</label>
    <input
      type="number"
      id="rating"
      name="rating"
      value={movieData.rating}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div></div></div>  </div>
  
  <button type="submit" className="btn btn-primary btn-rounded">
    Agregar Película
  </button>
</form>
    </div>    </div>

  );
}

export default CreateMovie;