const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    // user_id: {//Only Temporary
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: {
      type: String,
      required: [true, "Please Add the Contact name"],
    },
    email: {
      type: String,
      required: [true, "Please Add the email address"],
    },
    phone: {
      type: String,
      required: [true, "Please Add the phone number"],
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
