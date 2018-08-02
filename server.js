const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3001;
let app = express();
// __dirname stores path to projects directory (node-web-server)
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');


// app.use to register middleware then call the fcn
app.use(express.static(__dirname+'/public/'));
// app.use(express.static(__dirname+'/tic-tac-toe-v3/'));
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
// app.get('/tic-tac-toe-v3',(req,res) =>  {
//   res.render('about.hbs', {
//     pageTitle: 'About Page'
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
