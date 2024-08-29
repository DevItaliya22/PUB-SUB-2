const express = require('express');

const app = express();
const port = 3000;

let count = 0;
app.get('/', (req, res) => {
    console.log('Request received',count++);
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});