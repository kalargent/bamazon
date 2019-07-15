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

// FUNCTION WELCOMING THE  USER TO THE MANAGER CONSOLE AND ASKING WHAT THEY'D LIKE TO DO
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
          doneViewing(); 
          break;

        case "View Low Inventory": 
            console.log("view low inv"); 
            break;

        case "Add to Inventory": 
            // console.log("ADDING TO INVENTORY"); 
            addInventory(); 
            break; 

        case "Add a New Product": 
            // console.log("adding new product");
            addNew();  
            break; 
      }
    });
}

//FUNCTION TO DISPLAY A LIST OF PRODUCTS 
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

    })
    
}

// FUNCTION TO CLOSE THE LIST OF PRODUCTS WHEN THE USER IS DONE LOOKING AT THEM
function doneViewing () { 

    viewProducts(); 
    // console.log("you're in doneViewing"); 

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
}; 

//FUNCTION THAT ALLOWS THE USER TO ADD INVENTORY 
function addInventory () { 
    // console.log ("you're adding inventory!"); 

    viewProducts(); 

    // INQUIRER PROMPT ASKING THEM WHICH PRODUCT THEY WOULD LIKE TO UPDATE THE INVENTORY FOR 
    // ANSWER COMPARED TO LIST OF PRODUCTS 
    // CONNECT TO THE DB AND RUN AN UPDATE STATEMENT 
    // SUCCESS MESSAGE 
    
}

function addNew () { 
    console.log("ADDING NEW"); 
    // INQUIRER PROMPT FOR THE PRODUCT NAME, DEPARTMENT, PRICE, QTY 
    inquirer   
        .prompt ([
            {
                name: "prodName", 
                type: "input", 
                message: "What is the name of the product you want to add?"
            }
        ])
    // CONNECT TO THE DATABASE 
    // RUN AN UPDATE STATEMENT TO ADD THE NEW PRODUCT 
    // SUCCESS MESSAGE 
}
