const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');

// const port = 5000 ;
const port = process.env.port || 8080;

app.use(cors({
    origin: '*'
}))
app.get('/', (req,res) => {
    res.status(200).json('helloooooo');
})

