var mysql = require("mysql"); 
var inquirer = require("inquirer"); 
require ("console.table"); 

var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "", 
    database: "bamazon"
}); 

connection.connect(function (err) { 
    if (err) throw err; 
    console.log("you're a supervisor!")
})