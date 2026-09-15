const express = require('express');

const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get(
  '/',
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Returns all contacts.'
    #swagger.responses[200] = {
      description: 'Contacts retrieved successfully.'
    }
  */
  contactsController.getAll
);

router.get(
  '/:id',
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Returns a single contact by id.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Contact ID',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Contact retrieved successfully.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }
  */
  contactsController.getSingle
);

router.post(
  '/',
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Creates a new contact.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact information',
      required: true,
      schema: {
        firstName: 'Michael',
        lastName: 'Scott',
        email: 'michael.scott@example.com',
        favoriteColor: 'Blue',
        birthday: '1965-03-15'
      }
    }

    #swagger.responses[201] = {
      description: 'Contact created successfully.'
    }

    #swagger.responses[400] = {
      description: 'All fields are required.'
    }
  */
  contactsController.createContact
);

router.put(
  '/:id',
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Updates an existing contact.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Contact ID',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact information',
      required: true,
      schema: {
        firstName: 'Michael',
        lastName: 'Scott',
        email: 'michael.scott@byu.com',
        favoriteColor: 'Green',
        birthday: '1965-03-15'
      }
    }

    #swagger.responses[204] = {
      description: 'Contact updated successfully.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }
  */
  contactsController.updateContact
);

router.delete(
  '/:id',
  /*
    #swagger.tags = ['Contacts']
    #swagger.description = 'Deletes a contact.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Contact ID',
      required: true,
      type: 'string'
    }

    #swagger.responses[204] = {
      description: 'Contact deleted successfully.'
    }

    #swagger.responses[404] = {
      description: 'Contact not found.'
    }
  */
  contactsController.deleteContact
);

module.exports = router;