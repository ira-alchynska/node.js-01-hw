const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message);
    }
    // get current array of contacts
    const contacts = JSON.parse(data);
    return console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    // get current array of contacts and finding needed one
    const contacts = JSON.parse(data);
    const contact = contacts.find(item => item.id === Number(contactId));
    console.log(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    // get current array of contacts and delete contact
    const contacts = JSON.parse(data);
    const currentContacts = contacts.filter(
      ({ id }) => id !== Number(contactId),
    );

    fs.writeFile(contactsPath, JSON.stringify(currentContacts), err => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('Deleted contact');
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    // create a new contact
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };
    // get current array of contacts
    const currentContacts = JSON.parse(data);
    // add new contact to the current array of contacts
    const updatedContacts = [newContact, ...currentContacts];

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), err => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log('The new contact was added', newContact);
    });
  });
}
module.exports = { listContacts, getContactById, removeContact, addContact };
