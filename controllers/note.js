var mongoose = require("mongoose");
var note = require("../models/note");

var noteControllers = {
    
    getAll : (req,res) => {
        note.find(function(err,result){
            res.render("index",{datas : result,title : "Tủ sách"});
        });
    },

    getOne : (req,res) => {
        note.find(function(err,result){
            res.render("detail",{data : result[req.params.id],title : "chi tiết",id : req.params.id});
        });
    },
    create : (req,res) => {
        note.create({
            name : req.body.name,
            author : req.body.author,
            type : req.body.type,
            content : req.body.content
        });
        res.redirect('/');
    },
    edit : (req,res) => {
        note.find(function(err,result){
            res.render("edit",{data : result[req.params.id],title : "Sửa"});
        });
    },
    update : (req,res) => {
        note.find(function(err,result){
            var key = result[req.params.id]._id;
            note.update({_id : key.toString()},{
                name : req.body.name,
                author : req.body.author,
                type : req.body.type,
                content : req.body.content
            }).exec(function(err,result){
                res.redirect('/');
            });
        });        
        
    },
    confirmdelete : (req,res) => {
        note.find(function(err,result){
            res.render("delete",{data : result[req.params.id],title : "Xóa "+result[req.params.id].name});
        });
    },

    delete : (req,res) => {
        note.find(function(err,result){
            var key = result[req.params.id]._id;
            note.remove({_id : key.toString()}).exec(function(err,result){
                res.redirect('/');
            });
        });
    }

}

module.exports = noteControllers;