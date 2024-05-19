import React, { useState } from 'react';
import axios from 'axios';
import NameAgeForm from './NameAgeForm';
import SymptomForm from './SymptomForm';
import SymptomList from './SymptomList';
import checkmark from './checkmark.png';
import './App.css'; 

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleNameAgeSubmit = (name, age) => {
    setName(name);
    setAge(age);
    setStep(2);
  };

  const addSymptom = (symptom) => {
    setSymptoms([...symptoms, symptom]);
  };

  const removeSymptom = (indexToRemove) => {
    setSymptoms(symptoms.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    const patientData = {
      name,
      age: Number(age),
      symptoms,
    };

    const data = JSON.stringify(patientData);

    try {
      const response = await axios.post(
        'https://us-west-2.aws.neurelo.com/rest/Patients/__one?',
        data,
        {
          headers: {
            'X-API-KEY': 'neurelo_9wKFBp874Z5xFw6ZCfvhXWypyrEBUQsaM1t2HZVp+mMZJY/yB5Wjgwn1jdZk/ziZrlXXAcy8Gi7xGsLHmqyVkIR3hLzsjaSLwrj7SgkL9aX87MuK3xsg4mKAcGElsFoWJn3cFK/iU/oO2tBWkSxIUracSYxf72uO3NX0zXo/n1mzr7noOlWDVrpw1lFJLyRZ_fXHp+SEwJE0/1oIRgSC7shacp6jBbDwiEEFEI+pdgeU=',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Data submitted successfully:', response.data);
      
      
      const prompt = `If a patient states "${symptoms.join(', ')}", what type of doctor is needed to treat them? Answer in one word.`;
      const aiResponse = await axios.post('http://localhost:3001/generate-prompt', { prompt });
      setGeneratedContent(aiResponse.data.text);

      setSubmitted(true);
    } catch (error) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className='App'>
        <div className="rectangle-container">
          <div className="rounded-rectangle">
            <img src={checkmark} alt="logo" className='checkmark-img'/>
            <p className='submitted-title'>Data submitted successfully! Thank you {name}!</p>
          </div>  
        </div>      
      </div>
    );
  }

  return (
    <div className="App">
      {step === 1 ? (
        <NameAgeForm onSubmit={handleNameAgeSubmit} />
      ) : (
        <>
          <h1 className="symptom-title">Symptom Checker</h1>
          <div className="forms-container">
            <div className="rounded-rectangle">
              <h2 className="form-title">Welcome {name}!</h2>
              <h3 className="form-text">Age: {age}</h3>
            </div>
            <div className="form-column">
              <SymptomForm onAddSymptom={addSymptom} />
            </div>
          </div>
          <div className="rectangle-container">
            <div className="rounded-rectangle2">
              <h1 className='symptoms-list-title'>Your Symptoms:</h1>
              <SymptomList symptoms={symptoms} removeSymptom={removeSymptom} />
              <button onClick={handleSubmit} className="add-button">Submit</button>
              {submitError && <p>Error: {submitError}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;