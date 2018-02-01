const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Use body Parser
app.use(bodyParser.urlencoded({extended:true}));

//The campgrounds array
let camps = [
    {name:'Nagarkot Camp', image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name:'Mount Makalu', image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
    {name:"Lhotse Camp", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
    {name:'Nagarkot Camp', image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name:'Mount Makalu', image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
    {name:"Lhotse Camp", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
    {name:'Nagarkot Camp', image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name:'Mount Makalu', image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
    {name:"Lhotse Camp", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
    {name:'Nagarkot Camp', image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
    {name:'Mount Makalu', image:"https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
    {name:"Lhotse Camp", image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"}
];

// Server port 
let port = 8080;
app.listen(port, () => console.log(`server running at port ${port}`));

//COnfiguring ejs as default view engine
app.set('view engine', 'ejs');

// The root route 
app.get('/',(req, res) => {
    res.render('index');
});

// The campgrounds GET route
app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', { camps });
});

// The campgrounds POST route
app.post('/campgrounds',(req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCapmground = { name: name, image:image };
    camps.push(newCapmground);
    res.redirect('/campgrounds');
});

// The campgorunds/new route for rendering the form 
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});