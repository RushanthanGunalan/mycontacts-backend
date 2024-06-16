const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
// const validateToken = require("../middleware/validateTokenHandler");//Only Temporary

// router.use(validateToken);//Only Temporary

//Getting all Data from End Point
//Adding New Data and posting it to the End point
router.route("/").get(getContacts).post(createContact);

//Getting specific Data from the Endpoint based on the ID
//Editng the exisitng data based on the ID and updating through Endpoint
//Deleting particular data based on Id from Endpoint
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
