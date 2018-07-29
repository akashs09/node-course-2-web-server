const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();
// __dirname stores path to projects directory (node-web-server)
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});
// app.use to register middleware then call the fcn
app.use(express.static(__dirname+'/public'));
app.use((req,res,next) => {
  let now = new Date().toString();
  const log = (`${now}: ${req.method}, ${req.url}`);
  fs.appendFile('server.log', log+'\n', (err) => {
    if (err) {
      console.log(`Unable to append to server.log`);
    }
  })
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Home page of Templating'
  });
});
app.get('/about',(req,res) =>  {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(3001);