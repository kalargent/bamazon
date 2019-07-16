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
            lowInventory(); 
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
    
    return new Promise( function(resolve, reject) {
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
            resolve(); 

        })
    })
}

// FUNCTION TO CLOSE THE LIST OF PRODUCTS WHEN THE USER IS DONE LOOKING AT THEM
function doneViewing () { 

    viewProducts()
        .then (function(result) {
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
    
}; 

function lowInventory () {
    console.log ("you're in low inventory!"); 
}

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
            },
            
            {
                name: "dept", 
                type: "input", 
                message: "What Department does this product belong in?"
            },

            {
                name: "price", 
                type: "input", 
                message: "How much does the product cost?"
            },

            {
                name: "qty", 
                type: "input", 
                message: "How many products do you have to sell?"
            } 

        ])
        .then (function(answer) {
            var product_name = answer.prodName; 
            var department_name = answer.dept; 
            var price = parseFloat(answer.price); 
            var stock_quantity = parseInt(answer.qty); 

            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";
            

            console.log(query)

            connection.query (query, [product_name, department_name, price, stock_quantity], function (err, res) { 
                if (err) throw err; 
                // console.log("Successfully added a new product to the store!")
            })

            inquirer
                .prompt ([
                    {
                        name: "anotherItem", 
                        type: "confirm", 
                        message: "Do you want to add another item?"
                    }
                ])

                .then(function (ans) { 
                        if (ans.anotherItem) { 
                            addNew(); 
                        }
                        else {
                            doneViewing(); 
                        }
                    })
        })
}
