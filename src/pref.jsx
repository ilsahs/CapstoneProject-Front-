import React, { useState } from 'react';

const PreferencesSelector = ({ selectedPreferences, setSelectedPreferences }) => {
    const [currentPreference, setCurrentPreference] = useState('');
  
    const preferences = ['Family Event', 'Female Education', 'Other'];
  
    const handlePreferenceChange = (e) => {
      setCurrentPreference(e.target.value);
    };
  
    const addPreference = () => {
      if (currentPreference && !selectedPreferences.includes(currentPreference)) {
        setSelectedPreferences([...selectedPreferences, currentPreference]);
        setCurrentPreference('');
      }
    };
  
    const removePreference = (preferenceToRemove) => {
      const updatedPreferences = selectedPreferences.filter(
        (preference) => preference !== preferenceToRemove
      );
      setSelectedPreferences(updatedPreferences);
    };
  
  return (
    <div>
      
      <label >
              <strong>Select Preference</strong>
            </label><br></br>
      <label>
      
        <select value={currentPreference} onChange={handlePreferenceChange}>
          <option value="">Select</option>
          {preferences.map((preference) => (
            <option key={preference} value={preference}>
              {preference}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={addPreference}>
        Add Preference
      </button>

      <div>
        {selectedPreferences.map((preference) => (
          <div key={preference} className="preference-item">
            {preference}
            <span onClick={() => removePreference(preference)}>&times;</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .preference-item {
          display: inline-block;
          border: 1px solid #ccc;
          padding: 5px;
          margin: 5px;
          border-radius: 4px;
        }
        .preference-item span {
          cursor: pointer;
          margin-left: 5px;
          color: red;
        }
      `}</style>
    </div>
  );
};

export default PreferencesSelector;
