import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import backgroundImage from '../../assets/contact.jpg'; // Import your background image here
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
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
      toast.success("We will reach back to you shortly. Thank you!", {
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
      toast.error("Sorry, the app has crashed.");
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
      <div className="mx-auto max-w-2xl text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
        <p className="mt-2 text-lg text-gray-600">
          Have questions or need support? Feel free to reach out to us!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <div className="grid gap-4">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold text-gray-900">
              First name
            </label>
            <input
              id="first-name"
              name="firstname"
              type="text"
              autoComplete="given-name"
              placeholder="John"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-800 text-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold text-gray-900">
              Last name
            </label>
            <input
              id="last-name"
              name="lastname"
              type="text"
              autoComplete="family-name"
              placeholder="Doe"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-800 text-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-800 text-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">
              Phone number
            </label>
            <input
              id="phone-number"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-800 text-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-800 text-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-300 rounded focus:ring-blue-600"
            />
            <label className="text-sm text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-blue-600">
                privacy&nbsp;policy
              </a>
              .
            </label>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Send message
          </button>
          {error && (
            <p className="mt-4 text-red-600 text-sm">
              {error}
            </p>
          )}
          {success && (
            <p className="mt-4 text-green-600 text-sm">
              {success}
            </p>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
