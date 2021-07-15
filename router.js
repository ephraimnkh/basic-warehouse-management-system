var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.send('<h1>Etch Inc. Warehouse Management System</h1><br><br>To add a new item to the warehouse database enter a URL that contains the product name, quantity and price.<br>Template -> http://localhost:8080/newItem/name/quantity/price<br>Example -> <a href="http://localhost:8080/newItem/Tv/20/1500">http://localhost:8080/newItem/Tv/20/1500</a><br><br>To list all items enter the URL <a href="http://localhost:8080/listAllItems">http://localhost:8080/listAllItems</a><br><br>To delete an item go to this address <a href="http://localhost:8080/deleteItem">http://localhost:8080/deleteItem</a><br><br>To get the total value of the warehouse enter this URL <a href="http://localhost:8080/totalValue">http://localhost:8080/totalValue</a>');
});

router.get('/newItem/:name/:quantity/:price', function (req, res) {
    addItem(req.params.name, req.params.quantity, req.params.price);
    let addedItem;
    for (let i = 0; i < db.length; i++) {
        if (db[i].name == req.params.name && db[i].quantity == req.params.quantity && db[i].price == req.params.price)
            addedItem = i;
    }
    res.send(generateList() + '<br><br>' + db[addedItem].id + " | " + db[addedItem].name + " | " + db[addedItem].quantity + " | " + db[addedItem].price + " | " + db[addedItem].quantity * db[addedItem].price + ' has been Added' + '<br><a href="http://localhost:8080">Go Home</a><br><br>');

});

router.get('/listAllItems', function (req, res) {
    res.send(generateList() + '<br><a href="http://localhost:8080">Go Home</a>');
});

router.get('/deleteItem', function (req, res) {
    res.send(generateList() + '<br>To delete an item enter this URL <a href="http://localhost:8080/deleteItem/938">http://localhost:8080/deleteItem/938</a> where 938 is the id to delete<br>' + '<br><a href="http://localhost:8080">Go Home</a>');
});

router.get('/deleteItem/:id', function (req, res) {
    res.send(deleteItem(req.params.id) + '<br>To delete an item enter this URL <a href="http://localhost:8080/deleteItem/938">http://localhost:8080/deleteItem/938</a> where 938 is the id to delete<br>' + '<br><a href="http://localhost:8080">Go Home</a>');
});

router.get('/totalValue', function (req, res) {
    res.send(generateList() + '<br>' + addItUp() + '<br><a href="http://localhost:8080">Go Home</a>');

});

var db = [];
db.push({ id: 938, name: "Microwave", quantity: 18, price: 1500 });
var newRecord;
function addItem(name, quantity, price) {
    newRecord = {
        id: Math.round(Math.random() * 1000),
        name: name,
        quantity: quantity,
        price: price
    }
    db.push(newRecord);
}

function generateList() {
    let list = "id | name  |  quantity  |  price  | cost<br>";
    for (let i = 0; i < db.length; i++) {
        list += db[i].id + " | " + db[i].name + " | " + db[i].quantity + " | " + db[i].price + " | " + db[i].price * db[i].quantity + '<br>';
    }
    return list;
}

function deleteItem(id) {
    let indexToDelete;
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == id)
            indexToDelete = i;
    }
    if (indexToDelete == null) {
        return generateList() + "<br>id not in the Warehouse system<br>";
    }

    let itemDeleted = "<br>Item Deleted: " + db[indexToDelete].id + " | " + db[indexToDelete].name + " | " + db[indexToDelete].quantity + " | " + db[indexToDelete].price + " | " + db[indexToDelete].price * db[indexToDelete].quantity + '<br>'
    db.splice(indexToDelete, 1);
    let list = "id | name  |  quantity  |  price  | cost<br>";
    for (let i = 0; i < db.length; i++) {
        list += db[i].id + " | " + db[i].name + " | " + db[i].quantity + " | " + db[i].price + " | " + db[i].price * db[i].quantity + '<br>';
    }
    return list + itemDeleted;
}

function addItUp() {
    let total = 0;
    for (let i = 0; i < db.length; i++) {
        total += db[i].price * db[i].quantity;
    }
    return "Total value of the warehouse = " + total;
}

//export this router 
module.exports = router;