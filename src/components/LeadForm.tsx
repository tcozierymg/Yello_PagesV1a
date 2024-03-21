import React, { useState } from 'react';
import emailjs from 'emailjs-com';

interface LeadFormProps {
  emailService: string;
  emailTemplate: string;
  emailUserId: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ emailService, emailTemplate, emailUserId }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    description: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await emailjs.send(emailService, emailTemplate, {
        name: formData.name,
        contactInfo: formData.contactInfo,
        description: formData.description,
      }, emailUserId);
  
      console.log('Response from EmailJS:', response);
  
      if (response.status === 200) {
        setSubmissionStatus('success');
        setFormData({
          name: '',
          contactInfo: '',
          description: '',
        });
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      setSubmissionStatus('error');
    }
  };
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">Contact Us</h2>
      {submissionStatus === 'success' && (
        <p className="text-green-600 text-center mb-4">Thank you! We will be in touch shortly!</p>
      )}
      {submissionStatus === 'error' && (
        <p className="text-red-600 text-center mb-4">Failed to submit form. Please try again.</p>
      )}      
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Contact Info (Email or Phone Number)</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Description of Request</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md h-36"
            required
          />
        </div>
        <button
          type="submit"
          className="rounded-md w-full border border-gray-950 text-gray-900 font-semibold px-6 py-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
