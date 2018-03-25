var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.listen(8989);


var mongoose = require("mongoose");
var note = require("./models/note");
var noteControllers = require("./controllers/note");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("public"));
app.use("/edit",express.static("public"));
app.use("/delete",express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
//connect server
mongoose.connect("mongodb://localhost/notedb");

//get show ra dữ liệu các bài viết tại trang chủ
app.get("/",noteControllers.getAll);

//thêm bài viết mới
app.route("/add")
.get(function(req,res){
    res.render("add",{title : "Thêm bài viết mới"});
})
.post(urlencodedParser,noteControllers.create);

//sửa sách
app.route("/listedit").get(function(req,res){
    note.find(function(err,result){
        res.render("listedit",{datas : result,title : "Sửa tủ sách"});
    });
});

//xóa sách
app.get("/delete",function(req,res){
    note.find(function(err,result){
        res.render("listdelete",{datas : result,title : "Chọn sách cần xóa"});
    });
});

//xóa 1 sách
app.route("/delete/:id")
.get(noteControllers.confirmdelete)
.post(noteControllers.delete);

//hiển thị thông tin chi tiết của sách
app.get("/:id",noteControllers.getOne);

//sửa sách
app.route("/edit/:id")
.get(noteControllers.edit)
.post(urlencodedParser,noteControllers.update);









