// INCLUDING NPM PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require("cli-table2");
require("console.table"); 

// DATABASE CONNECTION VAR AND FUNCTION
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
//   console.log ("You're in Bamazon!");
});

// GLOBAL VARIABLES
var productList = []; 
var item = answer.whatItem - 1;
var itemPick = answer.whatItem;
var qty = answer.qty;
var total = result[item].price * qty;
var t = total.toFixed(2); 

productDisplay (); 

function productDisplay() {
    console.log("");
    console.log(" _.~'~._.~'~._.~ WELCOME TO BAMAZON! ~._.~'~._.~'~._");
    console.log("");
    console.log("");
    console.log("----------------------------------------------------");
    console.log("Here are today's THUNDERBOLT deals! Happy Shopping!");
    console.log("----------------------------------------------------");
    console.log("");
    console.log("");

    var query = "SELECT * FROM products";

    connection.query(query, function(err,res){
        if (err) throw err; 

        // EMPTIES THE PRODUCT LIST VALUE 
        productList = []; 

        for (var i = 0; i < res.length; i++) {
            var productObject = {
                item_id: res[i].item_id,
                product_name: res[i].product_name,
                department: res[i].department_name,
                price: res[i].price,
                // stock_quantity: result[i].stock_quantity
              }

              productList.push(productObject); 
        }

        console.table(productList);
        
        purchaseFlow(); 
    })
}

function purchaseFlow() {
    inquirer
      .prompt([
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
      .then (function(answer) {
        // var item = answer.whatItem - 1;
        // var itemPick = answer.whatItem;
        // var qty = answer.qty;
        // var total = result[item].price * qty;
        // var t = total.toFixed(2); 

      if (res[item].stock_quantity < qty) {
          console.log("you win"); 
      }  
      })
}