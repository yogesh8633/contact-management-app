import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import CreateContactModal from '../components/contacts/CreateContactModal';
import { deleteContact } from '../features/contacts/contactSlice';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';

const Contacts: React.FC = () => {
  // Access the contacts array from the Redux store
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  // Function to handle contact deletion with confirmation
  const handleDelete = (id: string) => {
    message.success('Contact deleted successfully.');
    dispatch(deleteContact(id));
  };

  return (
    <div>
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Contacts</h1>
      
      {/* Button to open the modal for creating a new contact */}
      <div className="flex justify-center mb-6">
        <CreateContactModal />
      </div>

      {/* Grid layout to display the list of contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className={`p-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 ${
              contact.status === 'Active' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
            }`}
          >
            {/* Contact name */}
            <h2 className="text-xl font-bold mb-2">
              {contact.firstName} {contact.lastName}
            </h2>
            
            {/* Contact status with conditional styling */}
            <p className={`mb-4 font-medium ${contact.status === 'Active' ? 'text-green-700' : 'text-red-700'}`}>
              Status: {contact.status}
            </p>

            {/* Buttons for editing and deleting the contact */}
            <div className="flex space-x-4">
              <Link 
                to={`/edit-contact/${contact.id}`} 
                className="text-blue-600 hover:underline"
              >
                <Button type="primary">Edit</Button>
              </Link>
              <Button 
                type="default" 
                danger 
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
