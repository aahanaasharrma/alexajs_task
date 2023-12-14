const readline = require('readline');

const AddressDirectoryModule = (() => {
  let directory = [];

  class Contact {
    constructor(name, phoneNumber) {
      this.name = name;
      this.phoneNumber = phoneNumber;
    }

    getFormattedContact() {
      return Name: ${this.name}, Phone Number: ${this.phoneNumber};
    }
  }

  const addContact = (name, phoneNumber) => {
    try {
      validateDataTypes(name, phoneNumber);

      const newContact = new Contact(name, phoneNumber);

      directory = [...directory, newContact];
      console.log(${name} has been added to the address directory.);

      viewDirectory();
    } catch (error) {
      console.error(Error: ${error.message});
    }
  };

  const viewDirectory = () => {
    if (directory.length === 0) {
      console.log('The address directory is empty.');
    } else {
      console.log('Address Directory:');
      directory.forEach(contact => {
        console.log(contact.getFormattedContact());
      });
    }
  };

  const validateDataTypes = (name, phoneNumber) => {
    if (typeof name !== 'string' || typeof phoneNumber !== 'string') {
      throw new Error('Name and phone number must be strings.');
    }
  };

  const validatePhoneNumber = phoneNumber => {
    if (!/^\d+$/.test(phoneNumber)) {
      throw new Error('Phone number must contain only numerical digits.');
    }
  };

  const getUserInput = () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter name (or type "exit" to quit): ', name => {
      if (name.toLowerCase() === 'exit') {
        rl.close();
      } else {
        rl.question('Enter phone number: ', phoneNumber => {
          try {
            validatePhoneNumber(phoneNumber);
            addContact(name, phoneNumber);
          } catch (error) {
            console.error(Error: ${error.message});
          } finally {
            getUserInput();
          }
        });
      }
    });
  };

  return {
    getUserInput,
    viewDirectory,
  };
})();

AddressDirectoryModule.getUserInput();