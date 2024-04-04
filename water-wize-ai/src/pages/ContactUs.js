import React, { useState } from 'react';
import PageContainer from "../components/PageContainer";
import "../ContactUs.css"; // Import the CSS file

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Message sent successfully
        console.log('Message sent successfully');
      } else {
        // Error handling
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <PageContainer>
      <div className="contact-form">
        <h1>צרו קשר</h1>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Position:</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} required />
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required maxLength={500} />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </PageContainer>
  );
}

export default ContactUs;
