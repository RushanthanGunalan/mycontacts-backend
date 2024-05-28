//@desc Get all contacts
//@route Get /api/contacts
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

//@desc Create all contacts
//@route POST /api/contacts
//@access public

const createContact = (req, res) => {
  console.log("The Request body is:", req.body);
  res.status(200).json({ message: "Create contacts" });
};

//@desc Get contact
//@route GET /api/contacts/:id
//@access public

const getContact = (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
};

//@desc Update contact
//@route PUT /api/contacts:id
//@access public

const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
};

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
