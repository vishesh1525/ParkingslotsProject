import React, { useState, useEffect } from 'react';
import './Reservations.css'; // Add this line for the CSS file

const Reservations = () => {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    customerId: '',
    spotNumber: '',
    vehicleId: '',
    startTime: '',
    endTime: '',
    reservationStatus: 'active'
  });

  useEffect(() => {
    // Fetch the vehicle IDs from the backend
    fetch('http://localhost:5000/vehicles')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend
    fetch('http://localhost:5000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Reservation created:', data);
      // Clear the form or give feedback to the user
      setForm({
        customerId: '',
        spotNumber: '',
        vehicleId: '',
        startTime: '',
        endTime: '',
        reservationStatus: 'active'
      });
    })
    .catch(error => console.error('Error creating reservation:', error));
  };

  return (
    <div className="form-container">
      <h2>Create Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID:</label>
          <input
            type="text"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Spot Number:</label>
          <input
            type="text"
            name="spotNumber"
            value={form.spotNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle ID:</label>
          <select
            name="vehicleId"
            value={form.vehicleId}
            onChange={handleChange}
            required
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.id}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Reservation Status:</label>
          <select
            name="reservationStatus"
            value={form.reservationStatus}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit">Create Reservation</button>
      </form>
    </div>
  );
};

export default Reservations;
