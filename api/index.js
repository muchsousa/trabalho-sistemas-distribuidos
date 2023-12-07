const { randomUUID } = require('crypto');

const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const config = require('./config.json');

const tweetSchema = new mongoose.Schema({
    tweet_id: {
        type: String,
        default: randomUUID
    },
    username: {
        type: String
    },
    tweet: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const connectionString = `mongodb://${config.mongo.username}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}/${config.mongo.databaseName}?authSource=admin`;
const connection = mongoose.createConnection(connectionString);

const tweetModel = connection.model('Tweet', tweetSchema);

const app = require('express')();
app.use(cors())
app.use(bodyParser())

app.get('/tweet', async (_req, res) => {
    const tweets = await tweetModel.find({});

    res.json(tweets).status(200);
})

app.post('/tweet', async (req, res) => {
    console.log('post tweet');

    const tweet = await tweetModel.create(req.body);

    res.json(tweet).status(201);
});

app.listen(3000, () => {
    console.log('server listen');
});
