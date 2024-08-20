import React, { useState } from 'react';
import { Modal, Button, Input, Radio, message } from 'antd';
import { useDispatch } from 'react-redux';
import { addContact } from '../../features/contacts/contactSlice';
import { v4 as uuidv4 } from 'uuid';

const CreateContactModal: React.FC = () => {
  // Local state to manage form inputs and modal visibility
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Inactive');

  const dispatch = useDispatch();

  // Function to handle creating a new contact
  const handleCreate = () => {
    // Check if all fields are filled
    if (!firstName || !lastName || !status) {
      message.error('Please fill in all the details before creating a contact.');
      return;
    }

    // Dispatch action to add a new contact
    dispatch(addContact({ id: uuidv4(), firstName, lastName, status }));

    // Show success notification
    message.success('Contact created successfully.');

    // Reset form and close modal
    setVisible(false);
    setFirstName('');
    setLastName('');
    setStatus('Inactive');
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button 
        type="primary" 
        onClick={() => setVisible(true)} 
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 shadow-lg"
      >
        Create Contact
      </Button>

      {/* Modal for creating a new contact */}
      <Modal
        title={<div className="text-xl font-semibold text-center text-indigo-700">Create New Contact</div>}
        visible={visible}
        onOk={handleCreate}
        onCancel={() => setVisible(false)}
        centered
        okText="Create"
        okButtonProps={{ className: 'bg-green-600 text-white hover:bg-green-700' }}
        cancelButtonProps={{ className: 'hover:text-red-500' }}
        className="rounded-lg shadow-lg"
      >
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          {/* Input field for First Name */}
          <Input 
            placeholder="First Name" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
          />
          
          {/* Input field for Last Name */}
          <Input 
            placeholder="Last Name" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="p-2 border-2 border-gray-300 rounded-lg focus:border-blue-500"
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
      </Modal>
    </>
  );
};

export default CreateContactModal;
