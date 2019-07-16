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
                    // console.log("sales"); 
                    totalProfits(); 
                    break; 
                case "Add a New Department": 
                    console.log("new department")
                    break; 
            }
        })
}

function totalProfits () { 
    console.log("hello i am total profits"); 
    // var query = "SELECT departments.dept_id, departments.dept_name, departments.over_head_cost, products.product_sales" +
    // "FROM products" + 
    // "INNER JOIN departments ON products.department_name=departments.dept_name"; 
    var query = "SELECT departments.dept_id, departments.department_name, departments.over_head_cost, products.product_sales FROM products RIGHT JOIN departments ON products.department_name=departments.department_name"

    connection.query (query, function (err, res) {
        if (err) throw err;
        console.log(res);
    })
}