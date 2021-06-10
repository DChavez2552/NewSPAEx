const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizza")

//Create route
router.post('/', (request, response) => {
  const newPizza = new Pizza.model(request.body)
  newPizza.save((err, pizza) => {
    return err ? response.sendStatus(500).json(err) : response.json(pizza)
  });
});

//Read all route
router.get('/', (request, response) => {
  Pizza.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error)
    return response.json(data)
  })
})

//Read one route
router.get('/:id', (request, response) => {
  Pizza.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error)
    return response.json(data)
  })
});

//Delete one route
router.delete('/:id', (request, response) => {
  Pizza.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error)
    return response.json(data)
  })
});

//Update one route
router.put('/:id', (request, response) => {
  Pizza.model.findByIdAndUpdate(
    request.params.id,
    { $set: {	"crust": request.body.crust,
              "cheese": request.body.cheese,
              "sauce": request.body.sauce,
              "toppings": request.body.toppings} },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error)
      return response.json(request.body)
    }
  )
});

module.exports = router;
