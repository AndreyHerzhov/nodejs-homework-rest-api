const fs = require('fs/promises')
const path = require("path");
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async() => {
    const result = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(result)
}

const getContactById = async(contactId) => {
    const contacts = await listContacts()
    const id = String(contactId)
    const result = contacts.find(el => el.id === id)
    return result || null
}

const addContact = async({name, email, phone}) => {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }

    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
}

const removeContact = async(id) => {
    const contacts = await listContacts()
    const contactId = String(id)
    const index = contacts.findIndex(el => el.id === contactId)
    if(index === -1) {
        return null
    }
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts()
    const index = contacts.findIndex(el => el.id === contactId)
    if(index === -1) {
        return null;
    }
    contacts[index] = {id: contactId, ...body}
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)) 
    return contacts[index];
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
