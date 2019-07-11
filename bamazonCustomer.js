var mysql = require("mysql"); 
var inquirer = require("inquirer"); 

var connection = mysql.createConnection ({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "", 
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err; 
    console.log ("You're in Bamazon!"); 
})

productDisplay(); 

function productDisplay () { 
    var query = "SELECT * FROM products"; 
    connection.query (query, function (err, result) { 
        if (err) throw err; 
        console.log(result); 
    })
}

// function welcome () { 
//     inquirer    
//         .prompt ({
//             name: "welcome", 
//             type: "list", 
//             message: "Welcome to Bamazon! Here are today's Thunderbolt Deals! What would you like to purchase?", 
//             choices: 
//         })
// }