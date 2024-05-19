import React, { useState } from 'react';
import './App.css'; 

const SymptomForm = ({ onAddSymptom }) => {
  const [symptom, setSymptom] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSymptom(symptom);
    setSymptom('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className='symptom-form-title'>Symptom: </label>
        <input type="text" value={symptom} onChange={(e) => setSymptom(e.target.value)} required placeholder="Enter a symptom..."/>
      </div>
      <button type="submit" className="add-button">Add</button>
    </form>
  );
};

export default SymptomForm;
