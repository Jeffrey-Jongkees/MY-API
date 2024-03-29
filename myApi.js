import express from "express";
import Joi from "joi";

const app = express();

app.use(express.json());

// Function to validate data
function validateItem(item) {
    const schema = Joi.object({name: Joi.string().min(3).required()});
    const validation = schema.validate(item);
    return validation;
};

// Array 
const gymEquipment = [
  {
    item: "Sportbag",
    size: "S",
    quantity: 1,
    id: 1
  },
  {
    item: "Bidon",
    color: "Red",
    quantity: 1,
    id: 2
  },
  {
    item: "Jump rope",
    color: "Black",
    quantity: 1,
    id: 3
  },
  {
    item: "Barbell lock",
    quantity: 2,
    id: 4
  },
  {
    item: "Towel",
    quantity: 1,
    color: "Blue",
    id: 5

  }
];

// Port 5001
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`listening on port ${port}...`));



// GET request handler
app.get("/", (req, res) => {
  res.send(
    "Checkout our website for free testautomation courses: https://learnautomatedtesting.com/"
  );
});


// GET request handler for getting all fruit items
app.get("/api/gymEquipment", (req, res) => {
  res.send(gymEquipment);
});


// GET request handler for getting one fruit item by its id
app.get("/api/gymEquipment/:id", (req, res) => {
  const item = gymEquipment.find((c) => c.id === parseInt(req.params.id));
  if (!item) res.status(404).send("Item not found");
  res.send(item);
});


// CREATE/POST Request handler
app.post("/api/gymEquipment", (req, res)=> {
    const {error} = validateItem(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    return;
    }
    const item = {
        item: req.body.item,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity,
        id: gymEquipment.length + 1,
    };
    gymEquipment.push(item);
    res.send(item);
});

// UPDATE request handler
app.put("/api/gymEquipment/:id", (req, res) => {
  const item = gymEquipment.find((c) => c.id === parseInt(req.params.id));
  if (!item) res.status(404).send("Item not found");

  const {error} = validateItem(req.body);
  if(error){
    res.status(400).send(error.details[0].message)
  return;
  }
  item.name = req.body.name;
  res.send(item);
});


// DELETE request handler

app.delete("/api/gymEquipment/:id", (req, res) => {
  const item = gymEquipment.find((c) => c.id === parseInt(req.params.id));
  if (!item) res.status(404).send("Item not found");
  const index = gymEquipment.indexOf(item);
  gymEquipment.splice(index, 1);
  res.send(item);

});

