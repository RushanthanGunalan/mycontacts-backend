const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
// const validateToken = require("../middleware/validateTokenHandler");//Only Temporary

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage });

// router.use(validateToken);//Only Temporary

//Getting all Data from End Point
//Adding New Data and posting it to the End point
router.route("/").get(getContacts).post(upload.single("image"), createContact);

//Getting specific Data from the Endpoint based on the ID
//Editng the exisitng data based on the ID and updating through Endpoint
//Deleting particular data based on Id from Endpoint
router
  .route("/:id")
  .get(getContact)
  .put(upload.single("image"), updateContact)
  .delete(deleteContact);

module.exports = router;
