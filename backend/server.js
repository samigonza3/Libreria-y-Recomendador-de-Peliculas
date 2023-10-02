

const app = require('./src/app');

const port = process.env.PORT || 9030;

app.listen(port, () => {
  console.log('Aplicación ejecutándose en el Puerto ', port);
});