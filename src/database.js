const moongoose = require('mongoose');

moongoose.connect('mongodb://localhost/Merkenber', {useUnifiedTopology: true, useNewUrlParser: true})
.then(db=>{console.log("Connected to the database")})

.catch(err=>{console.log(err);})