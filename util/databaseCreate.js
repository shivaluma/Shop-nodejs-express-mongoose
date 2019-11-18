const mongoose = require("mongoose")
const User = require("../models/user")
const urlConnect = `mongodb+srv://brogrammers2527:brogrammers2527@cluster0-mwti3.mongodb.net/test?retryWrites=true&w=majority
`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log("Connect successfully!!");
  
    var user1 = new User({
        username: 'user1',
        password: 'password1',
        firstName: '1stName1',
        lastName: 'lastName1',
        email: 'email1@gmail.com',
        address: 'address1',
        phoneNumber: '0900000001'

    });

    user1.save(function(err){
        if (err) throw err;
         
        console.log('Account successfully saved.');
    });

    var user2 = new User({
        username: 'user2',
        password: 'password2',
        firstName: '1stName2',
        lastName: 'lastName2',
        email: 'email2@gmail.com',
        address: 'address2',
        phoneNumber: '0900000002'

    });

    user2.save(function(err){
        if (err) throw err;
         
        console.log('Account successfully saved.');
    });



    var user3 = new User({
        username: 'user3',
        password: 'password3',
        firstName: '1stName3',
        lastName: 'lastName3',
        email: 'email3@gmail.com',
        address: 'address3',
        phoneNumber: '0900000003'

    });

    user3.save(function(err){
        if (err) throw err;
         
        console.log('Account successfully saved.');
    })
    

});



