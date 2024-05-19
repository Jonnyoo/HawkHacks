import React, { useState } from 'react';
import './NameAgeForm.css'; 

const NameAgeForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, age);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 className="welcome-title">Welcome To</h2>
        <h1 className="hospital-name">Lazaridis Hospital</h1>
        <div className="input-container">
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full Name..."/>
        </div>
        <div className="input-container">
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="Age..."/>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default NameAgeForm;
