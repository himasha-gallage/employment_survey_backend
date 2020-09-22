const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let servey = new Schema(
  {
    organization_culture: {
      type: Number
    },
    infrastructure: {
      type: Number
    },
    work_environment: {
      type: Number
    },
    suggestions: {
        type: String
    }
  },
  
  { collection: "Employees" }
);

module.exports = mongoose.model("serveys", servey);

