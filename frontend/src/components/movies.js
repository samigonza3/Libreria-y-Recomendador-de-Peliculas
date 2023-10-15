import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Modal, Button, Carousel, Card, Row, Col } from 'react-bootstrap'; // Añadí Row y Col


class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      newMovie: {
        titulo: '',
        director: '',
        genero: '',
        year: '',
        sinopsis: '',
        rating: '',
        link_imdb: '',
        link_thumb: '',
      },
      editingMovie: null, // Almacena la película que se está editando
      isEditing: false, // Controla la visibilidad del formulario de edición
      isModalOpen: false,
      isInfoModalOpen: false, // Nuevo estado para el modal de información
      selectedMovie: null, // Almacena la película seleccionada
      activeIndex: 0, // Agrega el estado para controlar el índice activo del carrusel

    };
  }

  handleOpenModal = (movie) => {
    if (!this.state.isInfoModalOpen) { // Verifica si el infomodal está cerrado
      this.setState({
        editingMovie: movie,
        isModalOpen: true,
      });
    }
  };
  // Método para cerrar el modal
  handleCloseModal = () => {
    this.setState({
      editingMovie: null,
      isModalOpen: false,
    });
  };
  
  handleOpenInfoModal = (movie) => {
    if (!this.state.isEditing) {
      this.setState({
        selectedMovie: movie,
        isInfoModalOpen: true,
      });
    }
  };

  // Método para cerrar el modal de información
  handleCloseInfoModal = () => {
    this.setState({
      selectedMovie: null,
      isInfoModalOpen: false,
    });
  };
  
  // Método para mostrar un mensaje de confirmación antes de eliminar una película
  handleConfirmDelete = (id_movie) => {
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar esta película?'
    );
    if (confirmDelete) {
      this.handleDeleteMovie(id_movie); // Llama a la función de eliminación si el usuario confirma
    }
  };

  handleDeleteMovie = async (id_movie) => {
    try {
      const response = await fetch(`http://localhost:9030/api/movies/${id_movie}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        // Película eliminada con éxito
        this.fetchMovies(); // Actualiza la lista de películas
      } else {
        console.error('Error al eliminar la película');
      }
    } catch (error) {
      console.error('Error al eliminar la película:', error);
    }
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:9030/api/movies'); // Reemplaza la ruta con la URL de tu API
      const movies = await response.json();
      this.setState({ movies });
    } catch (error) {
      console.error('Error al obtener las películas:', error);
    }
  };



  // Método para guardar la película editada
  handleSaveMovie = async () => {
    const { editingMovie } = this.state;

    try {
      const response = await fetch(`http://localhost:9030/api/movies/${editingMovie.id_movie}`, {
        method: 'PUT', // Utiliza el método PUT para actualizar la película
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingMovie),
      });

      if (response.status === 200) {
        // Película editada con éxito
        this.fetchMovies(); // Actualiza la lista de películas
        this.handleCloseModal(); // Cierra el modal de edición
      } else {
        console.error('Error al editar la película');
      }
    } catch (error) {
      console.error('Error al editar la película:', error);
    }
  };

  handleInputChange = (field, event) => {
    const { editingMovie } = this.state;
    const updatedMovie = { ...editingMovie, [field]: event.target.value };
    this.setState({ editingMovie: updatedMovie });
  };
  


  render() {
    const { movies, editingMovie, isModalOpen, isInfoModalOpen, selectedMovie, activeIndex } = this.state;

    return (
      <div className='movies-container container-fluid'>
        <div className="row">
          <div className="col-8">
            <h1 className='mb-4'>Películas</h1>
        <table className='table table-dark table-responsive table-striped table-hover'>
           {/* Encabezados de la tabla */}
          <thead className='thead-dark'>
            <tr>
              <th>Título</th>
              <th>Año</th>
              <th>Director</th>
              <th>Género</th>
              <th>Puntuación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr
              key={movie.id_movie}
              onClick={() => this.handleOpenInfoModal(movie)} // Abre el modal de información al hacer clic en la fila
              style={{ cursor: 'pointer' }} // Cambia el cursor al estilo "mano" para indicar que es clickeable
            >
                {/* Celdas de la tabla */}
                <td>{movie.titulo}</td>
                <td>{movie.year}</td>
                <td>{movie.director}</td>
                <td>{movie.genero}</td>
                <td>{movie.rating}</td>
                <td>
                <button
                  type='button'
                  className='btn btn-danger btn-sm'
                  onClick={() => this.handleConfirmDelete(movie.id_movie)}
                >
                  X
                </button>
                <button
                  type='button'
                  className='btn btn-primary btn-sm ml-2'
                  onClick={() => this.handleOpenModal(movie)} // Abre el modal de edición
                >
                  Editar
                </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal show={isModalOpen} onHide={this.handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Editar Película</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <form className="formulario-popup form" onSubmit={this.handleSaveMovie}>
    <div className="row">
      <div className="col-8">
        <div className="form-group mb-2">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={editingMovie ? editingMovie.titulo : ''}
            onChange={(e) => this.handleInputChange('titulo', e)}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            className="form-control"
            id="director"
            name="director"
            value={editingMovie ? editingMovie.director : ''}
            onChange={(e) => this.handleInputChange('director', e)}
          />
        </div>
      </div>
      <div className="col-4">
        <div className="form-group mb-2">
          <label htmlFor="genero">Género</label>
          <input
            type="text"
            className="form-control"
            id="genero"
            name="genero"
            value={editingMovie ? editingMovie.genero : ''}
            onChange={(e) => this.handleInputChange('genero', e)}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="year">Año</label>
          <input
            type="text"
            className="form-control"
            id="year"
            name="year"
            value={editingMovie ? editingMovie.year : ''}
            onChange={(e) => this.handleInputChange('year', e)}
          />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="form-group mb-2">
          <label htmlFor="sinopsis">Sinopsis</label>
          <textarea
            className="form-control"
            id="sinopsis"
            name="sinopsis"
            rows='4'
            value={editingMovie ? editingMovie.sinopsis : ''}
            onChange={(e) => this.handleInputChange('sinopsis', e)}
          ></textarea>
        </div>
      </div>
      <div className="col-3">
        <div className="form-group mb-2">
          <label htmlFor="rating">Puntuación</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={editingMovie ? editingMovie.rating : ''}
            onChange={(e) => this.handleInputChange('rating', e)}
          />
        </div>
      </div>
      <div className="col-6">
        <div className="form-group mb-2">
          <label htmlFor="link_imdb">Enlace IMDB</label>
          <input
            type="text"
            className="form-control"
            id="link_imdb"
            name="link_imdb"
            value={editingMovie ? editingMovie.link_imdb : ''}
            onChange={(e) => this.handleInputChange('link_imdb', e)}
          />
        </div>
      </div>
      <div className="col-6">
        <div className="form-group mb-2">
          <label htmlFor="link_thumb">Enlace de la Miniatura</label>
          <input
            type="text"
            className="form-control"
            id="link_thumb"
            name="link_thumb"
            value={editingMovie ? editingMovie.link_thumb : ''}
            onChange={(e) => this.handleInputChange('link_thumb', e)}
          />
        </div>
      </div>
    </div>
  </form>
</Modal.Body>

  <Modal.Footer>
    <Button variant='secondary' onClick={this.handleCloseModal}>
      Cerrar
    </Button>
    <Button variant='primary' onClick={this.handleSaveMovie}>
      Guardar Cambios
    </Button>
  </Modal.Footer>
</Modal>

        </table>              </div>         
        <div className="col-4">
            <Carousel
              className="bs-carousel"
              fade={true}
              loop={true}
              activeIndex={activeIndex}
              onSelect={(selectedIndex, e) => this.setState({ activeIndex: selectedIndex })}
            >
              {movies.map((movie) => (
                <Carousel.Item key={movie.id_movie}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.link_thumb} />
                    <Card.Body>
                      <Card.Title>{movie.titulo}</Card.Title>
                      <Card.Text>
                        Año: {movie.year}
                        <br />
                        Puntuación: {movie.rating}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>     </div>



        <Modal show={isInfoModalOpen} onHide={this.handleCloseInfoModal}>
          <Modal.Header closeButton>
            <Modal.Title>Información de la Película</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedMovie && (
              <div>
                <h3>{selectedMovie.titulo}</h3>
                <p>Año: {selectedMovie.year}</p>
                <p>Director: {selectedMovie.director}</p>
                <p>Género: {selectedMovie.genero}</p>
                <p>Puntuación: {selectedMovie.rating}</p>
                <p>Sinopsis: {selectedMovie.sinopsis}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleCloseInfoModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

      </div>




    );
  }
}

export default Movies;