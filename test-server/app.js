var express = require("express");
var bodyParser = require('body-parser')

var app = express();
const port = 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var user = {
    id: 1,
    firstName: "Nick",
    lastName: "Kong",
    email: "nicholaskong@live.ca",
    city: "Vancouver",
    country: "Canada",
    password: "1234",
    created_at: Date.now()
}

var cities = [
    {
        id: 1,
        name: "Vancouver",
        country: "Canada"
    },
    {
        id: 2,
        name: "Calgary",
        country: "Canada"
    },
    {
        id: 3,
        name: "Hong Kong",
        country: "Hong Kong"
    },
    {
        id: 4,
        name: "Shanghai",
        country: "China"
    },
    {
        id: 5,
        name: "San Francisco",
        country: "United States"
    }
];

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/city', (req, res) => {
    try {
        res.json({ data: cities });
    } catch {
        res.json({ error: "error" });
    }
});

app.post('/authentication', (req, res) => {
    console.log(req.body);
    try {
        res.json({ data: user });
    } catch {
        res.json({ error: "error" });
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));