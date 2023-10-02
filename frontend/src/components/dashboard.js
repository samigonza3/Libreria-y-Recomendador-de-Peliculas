    import React, { Component } from 'react';

    class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
        moviesData: [], // Aquí almacenaremos los datos de películas
        };
    }

    async componentDidMount() {
        // Llamar a tu API para obtener las películas con mayor puntuación
        try {
        const response = await fetch('http://localhost:9030/api/movies');
        const data = await response.json();
        this.setState({ moviesData: data });
        } catch (error) {
        console.error('Error al obtener las películas:', error);
        }
    }

    render() {
        const { moviesData } = this.state;

        // Aquí realizamos el conteo de los valores en la columna "género"
        const genreCounts = moviesData.reduce((counts, movie) => {
        const genre = movie.genero;
        counts[genre] = (counts[genre] || 0) + 1;
        return counts;
        }, {});

        return (
        <div className='container mt-3'>   
        <div className="dashboard">
            <h1>Dashboard de Películas</h1>
            <div className="genre-counts">
            <h2>Conteo de Géneros:</h2>
            <ul>
                {Object.entries(genreCounts).map(([genre, count]) => (
                <li key={genre}>
                    {genre}: {count}
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div> 
        );
    }
    }

    export default Dashboard;