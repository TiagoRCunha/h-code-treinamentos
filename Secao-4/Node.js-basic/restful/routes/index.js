
module.exports = (app)=>{
  // (req, res) toda solicitação que o servidor vai receber
  // primeiro parametro é a rota
  app.get('/', (req, res)=>{
    // servidor guardado dentro da variavel server
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Olá</h1>');

  });

}
