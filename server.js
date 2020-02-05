const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '209.97.167.244',
  user     : 'medvine',
  password : '&WdW3)5v9H99Yf~q',
  database : 'turk'
});

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM turk.new_table', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.json(results)
    });
    connection.end();
  })

  server.get('/post/:id', (req, res) => {
    const id = req.params.id;
    connection.connect();
    connection.query(`INSERT INTO turk.new_table VALUES (${id}, "test", "test2")`, function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results);
      res.json(results)
    });
    connection.end();
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})