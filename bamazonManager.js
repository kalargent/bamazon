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

function managerConsole() {
  // console.log ("manager console");
  console.log("");
  console.log(
    " _.~'~._.~'~._.~ WELCOME TO BAMAZON'S MANAGER CONSOLE! ~._.~'~._.~'~._"
  );
  console.log("");
  console.log("");

  inquirer
    .prompt([
      {
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add a New Product"
        ]
      }
    ])
    .then(function(answer) {
      var toDo = answer.whatToDo;
    //   console.log("You want to " + toDo);

      switch (toDo) {
        case "View Products for Sale":
        //   console.log("You sure want to " + toDo);
          viewProducts(); 
          break;
      }
    });
}

function viewProducts() { 
    productList = []; 

    var query = "SELECT * FROM products"; 

    connection.query (query, function(err, result) {
        if (err) throw err;  

        for (var i = 0; i < result.length; i++) { 
            var productObject = { 
                item_id: result[i].item_id, 
                product_name: result[i].product_name, 
                department: result[i].department_name, 
                price: result[i].price, 
                stock_quantity: result[i].stock_quantity
            }
            productList.push(productObject); 

        }

        console.log(""); 
        console.log("");
        console.log("\n Here's a list of all the products currently on sale at Bamazon. \n"); 
        console.table(productList); 

        inquirer
            .prompt ([
                {
                    name: "doneViewing", 
                    type: "confirm", 
                    message: "Do you want to complete another task?"

                }
            
            ])
            .then (function(answer) { 
                if (answer.doneViewing) { 
                    managerConsole(); 
                }
                else { 
                    console.log("\n OK! Have a great day, Ms. Manager! \n"); 
                    connection.end(); 
                }
            })
    })
    
}
