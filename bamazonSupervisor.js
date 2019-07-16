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
    // console.log("you're a supervisor!")
})

start(); 

function start () { 
    console.log(
      "\n \n _.~'~._.~'~._.~ WELCOME TO BAMAZON'S SUPERVISOR CONSOLE! ~._.~'~._.~'~._ \n \n"
    );


    inquirer
        .prompt([
            {
                name: "viewTotals", 
                type: "confirm", 
                message: "\n Hello, supervisor! Would you like to view a list of total profits per department? \n"
            }
        ])

        .then (function(ans) {
            if (ans.viewTotals) { 
                console.log ("this is where the table would display"); 
            }
            else {
                connection.end(); 
            }
        })
}