import './App.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
} from 'react-router-dom';

import CreateMovie from './components/createMovie';
import Home from './components/Home';
import Movies from './components/movies';
import Dashboard from './components/dashboard';
import logo from './popcorn.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function App() {
  return (
    <div className="container">
      <Router>
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a href="/" class="navbar-brand">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
                    </svg>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="/" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="/movies" class="nav-link">Mis Películas</a>
                        </li>
                        <li class="nav-item">
                            <a href="/dashboard" class="nav-link">Info</a>
                        </li>
                    </ul>
                </div>

                <div class="text-end">
                    <button type="button" class="btn btn-outline-light me-2">
                        <a class="text-decoration-none" href="/movies">Ver Todas</a>
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#crearPeliculaModal">
                        <a class="text-decoration-none">Nueva Película</a>
                    </button>
                </div>
            </div>
        </nav>
    </div>
    <div className="modal fade" id="crearPeliculaModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Agregar Película</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <CreateMovie />
      </div>
    </div>
  </div>
</div>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/create-movie" element={<CreateMovie />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>

         


      <div id="logo" className="container text-center mt-4 logo-container">
                <img src={logo} className="App-logo" alt="logo" />
      </div>
        



    </div>


  );
}

export default App;