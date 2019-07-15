// INCLUDING NPM PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require("cli-table2");
require("console.table"); 

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // console.log ("You're a manager!");
  });

  // GLOBAL VARIABLES
var productList = [];

managerConsole(); 

function managerConsole () { 
    console.log ("manager console"); 
}