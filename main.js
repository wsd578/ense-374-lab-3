const User = require("./users.js");
const Task = require("./task.js");
const fs = require('fs');
const bodyParser = require("body-parser");
const express=require("express");
const app=express();
app.set("view engine","ejs");
const port=3000;
app.listen(port,function(){
    console.log("server is running on port:" +port)
    });

app.use(bodyParser.urlencoded({ extended: true }));
const aut = 'abc';
var jsonDatabase = JSON.parse(fs.readFileSync('./tasks.json', 'utf8'));


app.get('/', function(req,res){
    res.render("index");
});
app.get('/todo',function(req,res){
    res.render('todo')
});
app.get("/logout",function(req,res){
    res.render("index");
    });

app.post('/', function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        for (var user of jsonDatabase['Users']) {
            if (email == user.username) {
                if (password == user.password) {
                    res.redirect("todo");
                    return;
                }
                else {
                    signInError = true;
                }
    
            }
    
        }
        res.render('login', { errorLogin: true, errorSignup: false });
    });


app.post("/register", function(req, res) {
    let id = req.body.id;
    let pw = req.body.pw;
    let email = req.body.email;

    for (var user of jsonDatabase['Users'])
    {
    if(email == user.username) {
        res.render('index',{ errorLogin: false, errorSignup: true });
        return;
    }
    }
    if (id != aut) {
        res.render('index', { errorLogin: false, errorSignup: true });
    }
    else {
    userAdded = new User(email, password);
    jsonDatabase['Users'].push(userAdded);
    fs.writeFileSync('./tasks.json', JSON.stringify(jsonDatabase));
    res.render('todo', { email: email, taskDatabase: jsonDatabase['Tasks'] });
}

});

//incomplete