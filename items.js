const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

router.get("/", function (req, res) {
    return res.send(items);
})

router.post("/", function (req, res) {
    return res.json({ response: { message: "This is the post route for items" } });
})

router.get("/:name", function (req, res) {
    return res.json({ response: { message: `This is the get route for an item, ${req.params.name}` } });
})

router.patch('/:name', function (req, res) {
    return res.json({ response: { message: `This is the patch route for an item, ${req.params.name}` } });
})

router.delete('/:name', function (req, res) {
    return res.json({ response: { message: `This is the delete route for an item, ${req.params.name}` } });
})

module.exports = router;