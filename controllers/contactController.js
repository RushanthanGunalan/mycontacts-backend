const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const path = require("path");
const fs = require("fs");

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
  // Ensure req.user is correctly populated
  // const contacts = await Contact.find({ user_id: req.user.id });// Uncomment when user auth is in place
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
  console.log("The Request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const imagePath = req.file ? req.file.path : undefined;
  console.log("The Image path is:", imagePath); // Log the image path

  const contact = await Contact.create({
    name,
    email,
    phone,
    image: imagePath,
    // Ensure req.user.id is available
    // user_id: req.user.id, // Uncomment when user auth is in place
  });
  res.status(201).json(contact);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Ensure req.user.id matches the contact's user_id
  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User does not have permission to update other contacts");
  // }

  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };

  if (req.file) {
    // Delete the old image if exists
    if (contact.image) {
      fs.unlinkSync(contact.image);
    }
    updatedData.image = req.file.path;
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Ensure req.user.id matches the contact's user_id
  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User does not have permission to delete other contacts");
  // }

  if (contact.image) {
    fs.unlinkSync(contact.image);
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

// @desc Toggle favorite status of a contact
// @route PUT /api/contacts/:id/favorite
// @access Private
const toggleFavorite = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Toggle the isFavorite field
  contact.isFavorite = !contact.isFavorite;

  const updatedContact = await contact.save();
  res.status(200).json(updatedContact);
});

// @desc Get all favorite contacts
// @route GET /api/contacts/favorites
// @access Private
const getFavoriteContacts = asyncHandler(async (req, res) => {
  const favoriteContacts = await Contact.find({ isFavorite: true });
  res.status(200).json(favoriteContacts);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  toggleFavorite,
  getFavoriteContacts,
};
