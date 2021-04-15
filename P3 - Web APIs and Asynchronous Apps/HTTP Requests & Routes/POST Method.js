// First, Create an array to hold data:
const data = [];

// Then, create post() with a url path and a callback function:
app.post('/addMovie', addMovie);

// In the callback function, add the data received from request.body. 
// This is the key piece of information we are interested in from that 
// long stretch of data we saw previously that the request (req) argument returns.

function addMovie (req, res){
   console.log(req.body);
   data.push(req.body);
}