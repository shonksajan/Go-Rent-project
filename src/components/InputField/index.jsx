// src/components/InputField.js
import React from 'react';

function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}

export default InputField;
