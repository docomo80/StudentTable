import React from 'react';

export default function LabelText(prop) {
  return (
    <div className="form-row" >
      <label htmlFor={prop.name}/>
	  {prop.label}:
      <input type="text" id={prop.name}
	  onChange={prop.onChange}
	  value={prop.value}/>
    </div>
  );
}

