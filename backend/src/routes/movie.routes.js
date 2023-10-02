const router = require('express-promise-router')();
const movieController = require('../controllers/movieController'); 


router.get('/movies', movieController.listAllMovies);

// router.get('/movies/:id', movieController.listMoviesByID);

router.post('/movies', movieController.createMovie);

router.put('/movies/:id', movieController.updateMovie);

router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;
