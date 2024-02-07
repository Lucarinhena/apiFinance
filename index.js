const express = require("express");
const { v4: uuidv4 } = require("uuid");
const port = 3000;
const Customer = require("./models/Customers");

//function for example customer
Customer();

//middlewares
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }
  req.customer = customer;
  next();
}

const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
  const { cpf, name } = req.body;
  const customerAlreadyExist = customers.some(
    (customers) => customers.cpf === cpf
  );

  if (customerAlreadyExist) {
    res.status(400).json({ error: "Current CPF exist" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });
  res.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.get("/search", (req, res) => {
  res.send(customers).json();
});

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;
  const statementOperation = {
    description,
    amount,
    date: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOperation);
  res.status(201).send();
  console.log(customer.statement);
});

app.listen(port, () => {
  console.log(`Server running in port ${port}!`);
});
