let Product = require('mongoose').model('Product');
let errorHandler = require('./helpers/error-handler'); // error handling never changes, so let's make it general


module.exports = {
    index(req, res) {
        Product.find(req.body)
            .then(products => res.json(products)) // all responses just spit json
            .catch(errorHandler.bind(res)); // .bind ensures this will refer to the response object and not the errorHandler function
    },
    show(req, res) {
        Product.findById(req.params.id)
            .sort({createAt: -1})
            .then(product => res.json(product))
            .catch(errorHandler.bind(res));
    },
    create(req, res) {

        Product.find({name: req.body.name})
            .then(product => { 
                if (product.length < 1) {
                    Product.create(req.body)
                    .then(product => res.json(product))
                    .catch(errorHandler.bind(res));
                }
                else {
                    res.json({errors: ['Product name must be unique'],
                    err: true})
                }
            } )
            .catch(errorHandler.bind(res))
    },
    update(req, res) {
        let oldName; 
        Product.findById({_id: req.params.id})
            .then(product => {
                oldName = product.name;

                if (oldName == req.body.name) {

                    Product.updateOne(
                        { _id: req.params.id },
                        {
                            name: req.body.name,
                            quantity: req.body.quantity,
                            price: req.body.price,
                        }, 
                        {runValidators: true}
                    )
                        .then(product => res.json(product))
                        .catch(errorHandler.bind(res));

                }
                else {

                    Product.find({name: req.body.name})
                    .then(product => { 
                        if (product.length < 1 ) {

                            Product.updateOne(
                                { _id: req.params.id },
                                {
                                    name: req.body.name,
                                    quantity: req.body.quantity,
                                    price: req.body.price,
                                }, 
                                {runValidators: true}
                            )
                                .then(product => res.json(product))
                                .catch(errorHandler.bind(res));
                        }
                        else {
                            res.json({errors: ['Product name must be unique'],
                            err: true});
                            
                        }

                    } )
                    .catch(errorHandler.bind(res))

                }

            })
            .catch(errorHandler.bind(res))

    },
    destroy(req, res) {
        Product.findByIdAndRemove(req.params.id)
            .then(result => res.json(result))
            .catch(errorHandler.bind(res));
    },
};