// INCLUDING NPM PACKAGES 
var mysql = require("mysql"); 
var inquirer = require("inquirer"); 
var Table = require('cli-table2');

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
    // console.log ("You're in Bamazon!"); 
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

        console.log(""); 
        console.log(" _.~'~._.~'~._.~ WELCOME TO BAMAZON! ~._.~'~._.~'~._")
        console.log(""); 
        console.log(""); 
        console.log("----------------------------------------------------")
        console.log("Here are today's THUNDERBOLT deals! Happy Shopping!")
        console.log("----------------------------------------------------")
        console.log("");
        console.log("");
        
        // var productList = []; 
        for (var i = 0; i < result.length; i++)
            // console.log(result[i].product_name); 
            console.log(result[i].item_id + " | ", result[i].product_name + " | ", result[i].department_name + " | ", result[i].price + " | "); 
            // productList.push(result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity); 
            // console.log(productList);    
    makePurchase(); 
        }) 
}

function makePurchase () { 
    inquirer
        .prompt ([
            {
                name: "whatItem", 
                type: "input", 
                message: "Enter the Item Number for the item you'd like to purchase!"
            }, 
            {
                name: "qty",
                type: "input", 
                message: "How many do you want?"
            }
        ])

        .then (function (answer) {
            console.log("You Picked " + answer.whatItem);
            console.log ("You want to purchase " + answer.qty); 
            
            var item = answer.whatItem; 
            var qty = answer.qty; 

            console.log("you want item " + item + " you want " + qty); 
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