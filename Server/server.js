const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
const url = process.env.DATABASE_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    chats: [],
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async function (req, res) {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        res.status(200).json({ chats: existingUser.chats });
    } else {
        const newUser = new User({
            email: email,
            password: password,
            chats: [],
        });
        newUser.save()
        .then(result => {
            res.json(result);
        })
.catch(err => {
            res.json(err);
        });
    }
});

app.listen(port);

