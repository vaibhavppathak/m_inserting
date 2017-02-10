var mongoose = require('mongoose'); //require mongoose native drivers
var async = require('async');
var crypto =require('crypto');
var url = 'mongodb://localhost/vaibhav'; //connection url of the database
var conn = mongoose.connect(url); //use the connect method to conenct to the server
var schema = new mongoose.Schema({
    firstname: String,
    email: String,
    lastname: String,
    password: String,
}, {
    strict: true,
    collection: 'Users',
});
var schema1 = mongoose.Schema({
    user_id: String,
    dob: Date,
    mobile_no: Number,
}, {
    strict: true,
    collection: 'UsersProfile'
})
var post1= conn.model('xyz1', schema1);
var detail = conn.model('xyz', schema);


var records = [];
for (var i = 1; i <= 5; i++)
{
    records.push({
            "fname": "Vaibhav" + i,
            "email": "vaibhav"+ i +"@gmail.com",
            "lname": "Pathak",
    });
 }
 //console.log(records);
     
insertAndNotify(records, function(err)
{
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log('all done!!');
    process.exit();
    //continue all insert is done
});
    const pass = "abc@123";
    var secret = crypto.createHash('md5', pass).digest('hex');  

function insertAndNotify(records, main_callback) 
{
    async.eachLimit(records, 3, function(row, callback) 
    {
        var details = new detail({
            firstname: row.fname,
            email: row.email,
            lastname: row.lname,
            password: secret,
        });
        details.save(function(err, row) {
            if (err) {
                console.log(err);
                callback(err);  // calling the callback function
            } else {  
                callback();
            }
        });
    }, function(err)
       {
           main_callback(err); // calling the main_callback function
       });
    // data();
}
// function data(id){
detail.find({
    email: /vaibhav1@gmail.com/i
}, function(err, result) {
    if (err) {
        console.log(err);
        process.exit();
    } else {
        for (var i = 0; i < result.length; i++) {
            var row = result[i];
            var id = row.get('_id');
        }

    }
     post1.find({
        email: /vaibhav1@gmail.com/i
    }, function(err, result) {
        if (err) {
            console.log(err);
            process.exit();
        }

        if (!result || result.length == 0) {
            var new_post = new post1({
                user_id: id,
                dob: "1994-12-21",
                mobile_no: "9560234581"
            });
            new_post.save(function(err) {

                if (err) {
                    console.log(err);
                    process.exit();
                }
                console.log('Post Saved')
            });
        }
    });
});
// }