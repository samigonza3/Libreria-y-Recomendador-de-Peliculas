import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      topRatedMovies: [], // Almacenar las películas con mayor puntuación
    };
  }
  
  
  async componentDidMount() {
    // Llamar a tu API para obtener las películas con mayor puntuación
    try {
      const response = await fetch('http://localhost:9030/api/movies');
      const data = await response.json();
      this.setState({ topRatedMovies: data });
    } catch (error) {
      console.error('Error al obtener las películas:', error);
    }
  }
  
  render() {
    const { topRatedMovies } = this.state;
    const topThreeMovies = topRatedMovies.slice(0, 4);


    return (
      <div class="container-home container">

<div class="row">
<div class="col-12">
<h3 className='subtitulos-h3'>¿Qué quieres hacer hoy?</h3>
</div></div>

<div className="container text-center">
  <div className="row mt-3">
    <div className="col-12 col-md-6"> 
      <a
        style={{ marginBottom: '1em' }}
        href="/create-movie"
        className="btn btn-primary btn-lg btn-block"
      >
        Añadir Película
      </a>
    </div>
    <div className="col-12 col-md-6">
      <a
        style={{ marginBottom: '1em' }}
        href="/movies"
        className="btn btn-primary btn-lg btn-block btn-dark"
      >
        Ver mis Películas
      </a>
    </div>
  </div>
</div>
      
<div className="cards-container container" style={{ marginTop: '2em' }}>
  <h3 className='subtitulos-h3'>Mis películas mejor valoradas</h3>

  <div className="row cards">
    {topThreeMovies.map((movie, index) => (
      <div className="col-12 col-md-3" key={index}>
        <div className="card">
          {movie.link_thumb ? (
            <img
              src={movie.link_thumb}
              className="card-img-top"
              alt={`Portada de ${movie.title}`}
            />
          ) : (
            <div className="no-image-placeholder">
              No hay imagen disponible
            </div>
          )}
          <div className="card-body">
            <h2 className="card-title">{movie.titulo}</h2>
            <p><b>Año:</b> {movie.year}</p>
            <p><b>Puntuación:</b> {movie.rating}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
<div id="slider" class="carousel slide" data-bs-ride="carousel">
  <ol class="carousel-indicators">
    <li data-bs-target="#slider" data-bs-slide-to="0" class="active"></li>
    <li data-bs-target="#slider" data-bs-slide-to="1"></li>
    <li data-bs-target="#slider" data-bs-slide-to="2"></li>
  </ol>

  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="frontend\public\img\carrusel-1.jpg" class="d-block w-100" alt="Imagen 1"/>
    </div>
    <div class="carousel-item">
      <img src="imagen2.jpg" class="d-block w-100" alt="Imagen 2"/>
    </div>
    <div class="carousel-item">
      <img src="imagen3.jpg" class="d-block w-100" alt="Imagen 3"/>
    </div>
  </div>

  <a class="carousel-control-prev" href="#slider" role="button" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
  </a>
  <a class="carousel-control-next" href="#slider" role="button" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
  </a>
</div>

     </div>

    );
  }
}

export default Home;
