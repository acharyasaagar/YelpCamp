const   express =          require('express'),
        app =              express(),
        bodyParser =       require('body-parser'),
        mongoose =         require('mongoose');

//Connect Mongoose 
mongoose.connect("mongodb://localhost/yelp_camp");
//Use body Parser
app.use(bodyParser.urlencoded({extended:true}));
//COnfiguring ejs as default view engine
app.set('view engine', 'ejs');

//Schema setup

let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create( 
//     {
//         name:"Lato Beach", 
//         image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
//         description: "Feel the ocean. The blue, WOW!!!"
//     }, (err, Campground) => {
//         if(err){
//             console.log(err);
//         } else{
//          console.log(' Added to the database ' + Campground.name );
//         }
// });

// Server port 
let port = 8080;
app.listen(port, () => console.log(`server running at port ${port}`));

// The root route 
app.get('/',(req, res) => {
    res.render('home');
});

// The campgrounds GET route
app.get('/campgrounds', (req, res) => {
    //Get all Campgrounds from database
    Campground.find( {}, (err, campgrounds) => {
        if(err){
            console.log(err);
        } else{
            res.render('index', { camps: campgrounds});
        }
    });
    // 
});

// The campgrounds POST route
app.post('/campgrounds',(req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = { name, image };
    Campground.create( newCampground, (err, campground) => {
            if(err){
                console.log(err);
            } else{
                console.log(campground.name +' Added to database');
                res.redirect('/campgrounds');
            }
        });
    
});

// The campgorunds/new route for rendering the form 
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

//The show route 
app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.render('show', {campground})
        }
    });
});

