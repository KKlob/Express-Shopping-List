const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDb');

router.get("/", function (req, res) {
    return res.json(items);
})

router.post("/", function (req, res, next) {
    try {
        let item = req.body;
        if (item.name && item.price) {
            items.push(item);
            return res.json({ "added": item });
        }
        else {
            throw new ExpressError("Item requires a name and a price: {name: [name_of_item], price:[price_of_item]}", 400);
        }
    } catch (e) {
        next(e)
    }
})

router.get("/:name", function (req, res, next) {
    try {
        let name = req.params.name;
        let found = items.find(item => item.name == name);
        if (found) {
            return res.json(found);
        }
        else {
            throw new ExpressError(`No valid item found with name ${name}`, 400);
        }
    } catch (e) {
        next(e)
    }
})

router.patch('/:name', function (req, res, next) {
    try {
        let item = req.body;
        let name = req.params.name;
        if (item.name && item.price) {
            let index = items.findIndex((entry) => entry.name == name);
            if (index >= 0) {
                items.splice(index, 1, item);
                return res.json({ "updated": item });
            } else {
                throw new ExpressError(`Invalid Requesst: No item found with name ${name}`)
            }
        }
        else {
            throw new ExpressError("Invalid Request: Must include name and price in request");
        }
    } catch (e) {
        next(e);
    }
})

router.delete('/:name', function (req, res, next) {
    try {
        let name = req.params.name;
        let index = items.findIndex(entry => entry.name == name);
        if (index >= 0) {
            items.splice(index, 1);
            return res.json({ "message": `Deleted item ${name}` });
        } else {
            throw new ExpressError(`Invalid Request: No item found with name ${name}`);
        }
    } catch (e) {
        next(e);
    }
})

module.exports = router;