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
                name: "supervisor", 
                type: "list", 
                message: "Hello, supervisor! What would you like to do? \n", 
                choices: ["Check Product Sales by Department","Add a New Department"]
            }
        ])

        .then (function(ans) {
            var answer = ans.supervisor
            
            switch (answer) {
                case "Check Product Sales by Department":
                    console.log("sales"); 
                    break; 
                case "Add a New Department": 
                    console.log("new department")
                    break; 
            }
        })
}

function totalProfits () { 
    console.log("hello i am total profits"); 
}