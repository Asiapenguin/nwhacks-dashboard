var express = require("express");
var bodyParser = require('body-parser')

var app = express();
const port = 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var experience = {
    id: 1,
    city: "Vancouver",
    country: "Canada",
    title: "My feelings about Vancouver",
    description: "Vancouver is great!",
    votes: 2
}

var experience2 = {
    id: 2,
    city: "Vancouver",
    country: "Canada",
    title: "My feelings about Vancouver",
    description: "Vancouver is too rainy!",
    votes: 55
}

var user = {
    id: 1,
    username: "nickkong",
    firstName: "Nick",
    lastName: "Kong",
    email: "nicholaskong@live.ca",
    city: "Vancouver",
    country: "Canada",
    password: "1234",
    facebook: "https://facebook.com",
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
    } catch(error) {
        res.json({ error: error });
    }
});

app.get('/city/:id', (req, res) => {
    const cityId = req.params.id;
    console.log("City id: " + cityId);
    const city = cities[cityId - 1];
    console.log("City: ", city);
    try {
        res.json({ data: city });
    } catch(error) {
        res.json({ error: error });
    }
})

app.post('/authentication', (req, res) => {
    console.log("Authentication: " + req.body);
    try {
        res.json({ data: user });
    } catch(error) {
        res.json({ error: error });
    }
});

app.post('/experience', (req, res) => {
    console.log("Experience: " + JSON.stringify(req.body));
    try {
        res.json({ data: experience });
    } catch(error) {
        res.json({ error: error });
    }
});

app.get('/experience/search', (req, res) => {
    console.log("Experience for City name: " + req.params);
    try {
        res.json({ data: [experience, experience2] })
    } catch(error) {
        res.json({ error: error});
    }
});

app.put('/experience/:id', (req, res) => {
    try {
        res.json({ note: "Successfully updated" });
    } catch(error) {
        res.json({ error: error });
    }
});

app.post('/user', (req, res) => {
    console.log("User: " + req.body);
    try {
        res.json({ data: user });
    } catch(error) {
        res.json({ error: error });
    }
});

app.put('/user/:id', (req, res) => {
    try {
        res.json({ note: "Successfully updated" });
    } catch(error) {
        res.json({ error: error });
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));