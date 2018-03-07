var mongoose = require('mongoose');
var url = "mongodb://bdognom.cs.brown.edu/cdquery1";
var options = {
    user: 'cs132',
    pass: 'csci1320',
    useMongoClient: true
};


var db = mongoose.connection;

db.on('error', console.error);

db.once('open', async function() {
    if (process.argv[2] == 'related') {
        await relatedArtist(process.argv[3], process.argv[4]);
    }
    if (process.argv[2] == 'search') {
        await searchArtist(process.argv[3], process.argv[4]);
    }
    mongoose.connection.close(() => {process.exit(0)});
});


var cdSchema = new mongoose.Schema({
    diskid: String,
    title: String,
    artist: String,
    length: Number,
    genre: String,
    year: Number,
    tracks: [{
        name: String,
        artist: String,
        length: Number,
        number: Number,
        offset: Number
    }]
});

var cd = mongoose.model('cd', cdSchema)

async function genreQuery(artist1) {
    var genre;
    await cd
        .find({artist: artist1})
        .where('genre').ne(null)
        .distinct('genre', function(err, data) {genre = data});

    return genre;
}

async function relatedArtist(artist1, artist2) {
    var artistGenre = await genreQuery(artist1);

    await cd.
    find({
        genre: {$in: artistGenre},
        artist: artist1
    })
        .where('genre').ne(null)
        .exec(function(err, data) {
            if (err) return console.error(err);
            if (data.length >= 1) console.log("True");
            else console.log("False")
        });
}

async function searchArtist(artist, limit) {
    var artistGenre = await genreQuery(artist);

    await cd
        .aggregate()
        .match({genre : {$in : artistGenre}, artist : {$ne : null}})
        .group({_id : "$artist", count : {$sum: 1}})
        .sort({count : -1}).limit(parseInt(limit))
        .exec(function(err, data) {
            data.forEach((element) => {console.log(element._id)})
        });

}


mongoose.Promise = Promise;
mongoose.connect(url, options);
