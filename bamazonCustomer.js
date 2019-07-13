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
  // console.log ("You're in Bamazon!");
});

// GLOBAL VARIABLES
var productList = [];
var itemID = 0;

productDisplay();

// RETRIEVE A LIST OF PRODUCTS AND SAVING THEIR NAMES TO AN EMPTY ARRAY AND LOGGING THEM
function productDisplay() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, result) {
    if (err) throw err;
    // console.log(result);

    console.log("");
    console.log(" _.~'~._.~'~._.~ WELCOME TO BAMAZON! ~._.~'~._.~'~._");
    console.log("");
    console.log("");
    console.log("----------------------------------------------------");
    console.log("Here are today's THUNDERBOLT deals! Happy Shopping!");
    console.log("----------------------------------------------------");
    console.log("");
    console.log("");

    // if (!productList) {
    productList = [];   
    for (var i = 0; i < result.length; i++) {
      // console.log(result[i].product_name);
      // console.log(i);
      // console.log(
      //   result[i].item_id + " | ",
      //   result[i].product_name + " | ",
      //   result[i].department_name + " | ",
      //   result[i].price + " | ",
      //   result[i].stock_quantity
      // );
      var productObject = {
        item_id: result[i].item_id,
        product_name: result[i].product_name,
        department: result[i].department_name,
        price: result[i].price,
        stock_quantity: result[i].stock_quantity
      }
      productList.push(productObject); 
        }
      console.table(productList); 

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

      .then(function(answer) {
        var item = answer.whatItem - 1;
        var itemPick = answer.whatItem;
        var qty = answer.qty;
        var total = result[item].price * qty;

        if (result[item].stock_quantity < qty) {
          console.log("We don't have that many!");

          inquirer
            .prompt([
              {
                name: "buySomethingElse",
                message: "Want to try purchasing something else?",
                type: "confirm"
              }
            ])
            .then(function(answer) {
              // console.log(answer);
              if (answer.buySomethingElse) {
                productDisplay();
              } else {
                console.log("Maybe next time.");
                connection.end();
              }
            });

          // productDisplay();
        } else {
          inquirer
            .prompt([
              {
                name: "enoughStock",
                message:
                  "Are you sure you want to purchase " +
                  qty +
                  " " +
                  result[item].product_name +
                  "'s " +
                  total,
                type: "confirm"
              }
            ])
            .then(function(answer) {
              if (answer.enoughStock) {
                console.log(
                  "Great! Your " +
                    qty +
                    " " +
                    result[item].product_name +
                    "'s will be delivered in 3-5 business"
                );
              } else {
                console.log("you don't want it");
              }

              inquirer
                .prompt([
                  {
                    name: "buySomethingElse",
                    message: "Want to try purchasing something else?",
                    type: "confirm"
                  }
                ])
                .then(function(answer) {
                  // console.log(answer);
                  if (answer.buySomethingElse) {
                    productDisplay();
                  } else {
                    console.log("Maybe next time.");
                    connection.end();
                  }
                });
            });

          connection.query(
            "UPDATE products SET stock_quantity=? WHERE item_id=?",
            [result[item].stock_quantity - qty, itemPick],
            function(err, newInv) {
              if (err) throw err;
              //   console.log(newInv);
              //   console.log(this.sql);
              //   productDisplay();
            }
          );
        }
      });
  });
}
