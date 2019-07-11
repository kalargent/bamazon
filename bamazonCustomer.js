// INCLUDING NPM PACKAGES 
var mysql = require("mysql"); 
var inquirer = require("inquirer"); 

// DATABASE CONNECTION VAR AND FUNCTION 
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

// GLOBAL VARIABLES 
var productList = []; 

productDisplay(); 

// RETRIEVE A LIST OF PRODUCTS AND SAVING THEIR NAMES TO AN EMPTY ARRAY 
function productDisplay () { 
    var query = "SELECT * FROM products"; 
    connection.query (query, function (err, result) { 
        if (err) throw err; 
        // console.log(result); 
        
        // var productList = []; 
        for (var i = 0; i < result.length; i++)
            // console.log(result[i].product_name); 
            console.log(result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity); 
            // console.log(productList); 
    }) 
}

// function welcome () { 
//     inquirer    
//         .prompt ([
//             {
//                 name: "welcome", 
//                 type: "list", 
//                 message: "Welcome to Bamazon! Here are today's Thunderbolt Deals! What would you like to purchase?", 
//                 choices: 
//             }
//         ])
// }