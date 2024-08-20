import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../features/contacts/contactSlice';
import { Input, Button, Radio, message, Card } from 'antd';
import { RootState } from '../../store/store';

const EditContact: React.FC = () => {
  // Retrieve the contact ID from the URL parameters
  const { id } = useParams();
  
  // Initialize navigation for programmatically navigating after save
  const navigate = useNavigate();
  
  // Set up Redux dispatch
  const dispatch = useDispatch();
  
  // Get the specific contact from the Redux store using the ID
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find((contact) => contact.id === id)
  );

  // Local state to manage form inputs
  const [firstName, setFirstName] = useState(contact?.firstName || '');
  const [lastName, setLastName] = useState(contact?.lastName || '');
  const [status, setStatus] = useState<'Active' | 'Inactive'>(contact?.status || 'Inactive');

  // Handle saving the edited contact
  const handleSave = () => {
    // Validation: Ensure all fields are filled out
    if (!firstName || !lastName || !status) {
      message.error('Please fill in all the details before saving the contact.');
      return;
    }

    // Dispatch the edit contact action with the updated values
    if (contact) {
      dispatch(editContact({ id: contact.id, firstName, lastName, status }));
      
      // Show success notification
      message.success('Contact updated successfully.');
      
      // Navigate back to the main contact list
      navigate('/contacts');
    } else {
      message.error('Contact not found.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center text-indigo-700 mb-6">Edit Contact</h1>
        
        {/* Form inputs for editing the contact */}
        <div className="space-y-4">
          {/* Input field for First Name */}
          <Input 
            placeholder="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="p-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500"
          />
          
          {/* Input field for Last Name */}
          <Input 
            placeholder="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="p-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500"
          />
          
          {/* Radio buttons for Status */}
          <div className="flex items-center">
            <span className="font-medium text-gray-700">Status:</span>
            <Radio.Group 
              className="ml-4"
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="Active" className="mr-2">
                Active
              </Radio.Button>
              <Radio.Button value="Inactive">
                Inactive
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
        
        {/* Save button */}
        <Button 
          type="primary" 
          onClick={handleSave} 
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2"
        >
          Save
        </Button>
      </Card>
    </div>
  );
};

export default EditContact;
