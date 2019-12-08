const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const myGeneralSchema = new Schema({
  name: String,
  created_at: Date
});

const myGeneralModel = model("General", myGeneralSchema);

const sampleSchema = new Schema({
  name: String,
  binary: Buffer,
  living: Boolean,
  created_at: {
    type: Date,
    default: Date.now()
  },
  age: {
    type: Number,
    min: 18,
    max: 35,
    required: true
  },
  referenceId: Schema.Types.ObjectId,
  someArray: [],
  stringArray: [String],
  nested: {
    myKey: {
      type: Number,
      min: 100,
      max: 150,
      required: true
    },
    myString: {
      type: String,
      lowercase: true,
      trim: true
    }
  }
});

const validatorSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: [12, "Too many eggs"],
    required: [true, "Why no eggs?"]
  },
  drink: {
    type: String,
    enum: ["coffee", "tea", "milk"]
  },
  phoneNumber: {
    type: String,
    validate: {
      validator(number) {
        return /\d{3}-\d{3}-\d{4}/.test(number);
      },
      message(props) {
        return props.value + " is not a valid mobile number";
      }
    },
    required: [true, "User phone number is required"]
  }
});

const personSchema = new Schema({
  firstName: String,
  lastName: String
});

personSchema.virtual("fullname").get(function() {
  return this.firstName + " " + this.lastName;
});

const Person = model("Person", personSchema);

Person.find({
  occupation: /host/,
  "name.last": "Ghost",
  age: { $gt: 17, $lt: 66 },
  likes: { $in: ["vaporizing", "talking"] }
})
  .limit(10)
  .sort({ occupation: -1 })
  .select({ name: 1, occupation: 1 })
  .exec();

Person.find({ occupation: /host/ })
  .where("name.last")
  .equals("Ghost")
  .where("age")
  .gt(17)
  .lt(66)
  .where("likes")
  .in(["vaporizing", "talking"])
  .limit(10)
  .sort("-occupation")
  .select("name occupation")
  .exec();
