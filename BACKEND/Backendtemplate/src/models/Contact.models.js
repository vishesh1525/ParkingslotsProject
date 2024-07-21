import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please fill a valid phone number'], // Example for 10 digits
  },
  message: {
    type: String,
    required: true,
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
