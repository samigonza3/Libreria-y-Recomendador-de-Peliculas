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
    const topThreeMovies = topRatedMovies.slice(0, 3);


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
      
      
<div className="cards-container container" style={{ marginTop: '3em' }}>
      <h3 className='subtitulos-h3'>Mis películas mejor valoradas</h3>

      <div className="row">
          {topThreeMovies.map((movie, index) => (
            <div className="col-12 col-md-4" key={index}>
              <div className="card">
                <img
                  src={movie.link_thumb}
                  className="card-img-top"
                  alt={`Portada de ${movie.title}`}
                />
                <div className="card-body">
                  <h2 className="card-title">{movie.titulo}</h2>
                  <p>Año: {movie.year}</p>
                  <p>Puntuación: {movie.rating}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>      </div>

    );
  }
}

export default Home;
