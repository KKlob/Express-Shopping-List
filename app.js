const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require('./items')

const app = express();

// Routes Section

app.use('/items', itemRoutes);


// Error handler Section
app.use((req, res, next) => {
    next(new ExpressError("Page not Found", 404));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({ error: err.message });
});

module.exports = app;