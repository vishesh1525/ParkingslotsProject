import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import backgroundImage from '../../assets/contact.jpg'; // Import your background image here
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Contact() {
  const navigate=useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the privacy policy.');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:7000/api/v1/contact', // Update with your backend endpoint
        formData
      );
      setSuccess('Message sent successfully!');
      toast.success("We will reach back to you shortly Thank You ",{
        onClose: () => {
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      });
      
      setError(null);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',
      });
      
    } catch (error) {
      toast.error("Sorry app has Crashed")
      setError('Failed to send message. Please try again.');
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        padding: '6rem 0', 
        backgroundColor: 'white', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ margin: '0 auto', maxWidth: '40rem', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '0.375rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>Contact Us</h2>
        <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', lineHeight: '1.75rem', color: '#6B7280' }}>
          Have questions or need support? Feel free to reach out to us!
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ margin: '4rem auto 0', maxWidth: '32rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '0.375rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          <div>
            <label htmlFor="first-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              First name
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="first-name"
                name="firstname"
                type="text"
                autoComplete="given-name"
                placeholder="John"
                value={formData.firstname}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: 'white',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Last name
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="last-name"
                name="lastname"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                value={formData.lastname}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: 'white',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Email
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: 'white',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone-number" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
              Phone number
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <input
                id="phone-number"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: 'white',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '' }}>
              Message
            </label>
            <div style={{ marginTop: '0.625rem' }}>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                style={{
                  display: 'block',
                  width: '100%',
                  borderRadius: '0.375rem',
                  padding: '0.625rem 0.875rem',
                  color: 'white',
                  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  fontSize: '0.875rem',
                  lineHeight: '1.25rem',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              style={{
                width: '1rem',
                height: '1rem',
                borderRadius: '0.25rem',
                backgroundColor: agreed ? '#4F46E5' : '#E5E7EB',
                border: '1px solid #E5E7EB',
                marginRight: '0.5rem',
                cursor: 'pointer',
              }}
            />
            <label style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#6B7280' }}>
              By selecting this, you agree to our{' '}
              <a href="#" style={{ fontWeight: '600', color: '#4F46E5' }}>
                privacy&nbsp;policy
              </a>
              .
            </label>
          </div>
        </div>
        <div style={{ marginTop: '2.5rem' }}>
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.375rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#4F46E5',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              border: '1px solid transparent',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#4338CA')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4F46E5')}
          >
            Send message
          </button>
          {error && (
            <p style={{ marginTop: '1rem', color: 'red', fontSize: '0.875rem' }}>
              {error}
            </p>
          )}
          {success && (
            <p style={{ marginTop: '1rem', color: 'green', fontSize: '0.875rem' }}>
              {success}
            </p>
          )}
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
}
