let path = require('path');
let products = require('./../controllers/products'); // controller require


module.exports = function(app){
    app.get('/products', products.index);
    app.get('/products/:id', products.show);
    app.post('/products/new', products.create);
    app.put('/products/:id/edit', products.update);
    app.delete('/products/:id', products.destroy);
     // passing in controller methods that take req and res can be done this way
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/client/index.html"))
    });
};