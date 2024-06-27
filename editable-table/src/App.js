// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    // Fetch initial data from the backend
    axios.get('http://localhost:5000/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id, field, value) => {
    // Update the specific cell's field with the new value
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
    // Track edited data separately for saving
    setEditedData({ ...editedData, [id]: { ...editedData[id], [field]: value } });
  };

  const handleSave = (id) => {
    if (editedData[id]) {
      const currentDateTime = new Date().toISOString();
      axios.put(`http://localhost:5000/data/${id}`, { 
        ...editedData[id], 
        editedBy: username, 
        editedWhen: currentDateTime 
      })
        .then(() => {
          console.log('Data saved successfully');
          setEditedData({ ...editedData, [id]: null });
        })
        .catch(error => console.error('Error saving data:', error));
    }
  };

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!isUsernameSet ? (
        <div className="flex justify-center items-center h-screen">
          <form onSubmit={handleUsernameSubmit} className="bg-white p-4 rounded shadow-md">
            <label className="block text-sm font-medium text-gray-700">Enter your username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mt-2 w-full"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Editable Table</h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Quantity</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Posting Year</th>
                <th className="py-2">Posting Month</th>
                <th className="py-2">Action Type</th>
                <th className="py-2">Action Number</th>
                <th className="py-2">Action Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Edited By</th>
                <th className="py-2">Edited When</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.amount}</td>
                  <td className="border px-4 py-2">{item.postingYear}</td>
                  <td className="border px-4 py-2">{item.postingMonth}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={item.actionType}
                      onChange={(e) => handleEdit(item.id, 'actionType', e.target.value)}
                      className="border p-1"
                    >
                      <option value="venue">Venue</option>
                      <option value="revenue">Revenue</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">{item.actionNumber}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={item.actionName}
                      onChange={(e) => handleEdit(item.id, 'actionName', e.target.value)}
                      className="border p-1"
                    >
                      <option value="currency">Currency</option>
                      <option value="vehicles">Vehicles</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">{item.status}</td>
                  <td className="border px-4 py-2">{item.editedBy}</td>
                  <td className="border px-4 py-2">{item.editedWhen}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleSave(item.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
