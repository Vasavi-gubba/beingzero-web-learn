const express = require('express');
const app = express();
const mongoose =require('mongoose');
const Table = require('./frontend/js/Table');
 
app.use(express.static(__dirname+"/frontend"));

var password=process.env.Mongo_atlas_password;
var connectionString ="mongodb+srv://vasavigubba:"+password+"@cluster0.vqm9x.mongodb.net/crud?retryWrites=true&w=majority";
mongoose.connect(connectionString,{});
mongoose.connection.on('connected',function(){
    console.log("Database Connected");
});
app.get("/", function(req, res){
    res.send("Welcome to My Basic Site");
})

app.get("/resume", function(req, res){
    let fullFilePath = __dirname+"/frontend/html/resume.html";
    res.sendFile(fullFilePath);
   // res.send("Welcome to My Resume Page");
})
app.get("/google", function(req, res){
    let fullFilePath = __dirname+"/frontend/html/google.html";
    res.sendFile(fullFilePath);
})

app.get("/color", function(req, res){
    let fullFilePath = __dirname+"/frontend/html/color.html";
    res.sendFile(fullFilePath);
})
app.get("/crud", function(req, res){
    let fullFilePath = __dirname+"/frontend/html/crud.html";
    res.sendFile(fullFilePath);
})
app.get("/todo", function(req, res){
    let fullFilePath = __dirname+"/frontend/html/todo.html";
    res.sendFile(fullFilePath);
})

app.get("/todocrud", function(req, res){
    let fullFilePath = __dirname+"/frontend/html/todocrud.html";
    res.sendFile(fullFilePath);
})
// Heroku will automatically set an environment variable called PORT
const PORT = process.env.PORT || 3000;
 
// Start the server
app.listen(PORT, function(){
    console.log("Server Starting running on http://localhost:"+PORT);
})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var todos={
    "task":[]
};

app.get('/api/todo',function(req,res){
    res.json(todos);
})

app.post('/api/todo', function(req,res){
    var newUser = req.body;
    todos.task.push(newUser.task)
     res.json(todos);
})

app.delete('/api/todo/:id',function(req,res){
    var i=req.params.id
    if(i==-1){
        for(var j=0;j<todos.task.length;++j){
            todos.task.splice(j,1)
            console.log(todos.task[j])
        }
    }
    todos.task.splice(i,1)
})

app.put('/api/todo/:id',function(req,res){
    var i=req.params.id;
    todos.task[i]="<s>"+todos.task[i]+"</s>"

})

app.get('/crud/get',async function(req, res){
    //res.json(a);
    await Table.find()
    .then((result)=>{
     res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post('/crud/post',function(req, res){
    var newt= req.body;
    console.log(newt)
    const table= new Table({
        name: newt.name,
        Articels: newt.Articels
    })
    console.log(table)
    table.save()
 })

 app.delete('/crud/del:id', function(req, res){
    var i=req.params.id
    console.log(i)
        Table.findByIdAndDelete(i,function(err,orb){
        if(err)
        console.log("ERROR:"+err)
        else 
        console.log("SUCCESS")
    })
})

app.put('/crud/put:id', function(req, res){
    var i=req.params.id
    Table.findById(i,function(err,obj){
        if(err)
        console.log("ERROR:"+err)
        else {
            console.log(obj.Articels)
        var obj={Articels: obj.Articels }
        }
})
})