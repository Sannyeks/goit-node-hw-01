const contactsAPI = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsAPI.listContacts();
      return console.table(allContacts);
      break;

    case "get":
      const getContacts = await contactsAPI.getContactById(id);
      return console.table(getContacts);
      break;

    case "add":
      const newContact = await contactsAPI.addContact({ name, email, phone });
      return console.table(newContact);
      break;

    case "remove":
      const removedContact = await contactsAPI.removeContact(id);
      return console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
