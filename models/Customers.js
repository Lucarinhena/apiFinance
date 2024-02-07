const { v4: uuidv4 } = require("uuid");

function Customers() {
  customers = [
    {
      cpf: "123.456.789-10",
      name: "<NAME>",
      id: uuidv4(),
      statement: [],
    },
    {
      cpf: "123.456.789-11",
      name: "<NAME>",
      id: uuidv4(),
      statement: [],
    },
  ];
}

module.exports = Customers