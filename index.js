var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var movies = [
    {
        id: 1,
        year: 1976,
        title: 'Star Wars',
        genre: 'Sci-Fi',
        rating: 10
    },
    {
        id: 2,
        year: 2015,
        title: 'Interstellar',
        genre: 'Sci-Fi',
        rating: 10
    },
    {
        id: 3,
        year: 2001,
        title: 'Gladiator',
        genre: 'Action',
        rating: 7
    },
    {
        id: 4,
        year: 1990,
        title: 'Brave Heart',
        genre: 'Action',
        rating: 5
    },
    {
        id: 5,
        year: 2015,
        title: 'Guardian of the Galaxy',
        genre: 'Sci-Fi',
        rating: 8
    }
];
app.post('/api/movies', function (req, res) {
    let newMovie = req.body;

    movies.push(newMovie);

    res.status(200).send('ok');
});

app.put('/api/movies/:id', function (req, res) {
    let update = req.body;

    for(let i = 0; i < movies.length; i++){
        if(movies[i].id === req.params.id){
            Object.assign(movies[i], update);
        }
    }
    res.status(200).send("ok");
});

app.get('/api/movies/:id', function (req, res) {
    let movie;

    for (let i = 0; i < movies.length;i++){
       if(movies[i].id === req.params.id){
           movie = movies[i]
       }
    }

    if(!movie){
        return res.status(404).send('Movie not found');
    }else{
        return res.status(200).json(movie);
    }
});

app.get('/api/movies', function (req, res) {
    let filteredMovies = [];

    if(!req.query.rating && !req.query.year){
        res.status(200).json(movies);
    }

    for(let i = 0; i < movies.length; i++){
        if(req.query.year && movies[i].year > req.query.year){
            filteredMovies.push(movies[i])
        }else if(req.query.rating && movies[i].rating > req.query.rating){
            filteredMovies.push(movies[i])
        }
    }

   res.status(200).json(filteredMovies);
});

app.listen(3000, function () {
    console.log('listening on 3000')
});