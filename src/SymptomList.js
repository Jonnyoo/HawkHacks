// SymptomList.js
import React from 'react';
import './App.css'; 

const SymptomList = ({ symptoms, removeSymptom }) => {
  return (
    <ul>
      {symptoms.map((symptom, index) => (
        <li key={index} className="symptom-list">
          <span>{symptom}</span>
          <button onClick={() => removeSymptom(index)} className="button-symptom-list">Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default SymptomList;
