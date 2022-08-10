import React, { useState } from "react";



const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    console.log("Checkbox: ", name, checked);
  
    return (
      <input type={type} name={name} checked={checked} onChange={onChange} />
    );
  };
  
  export default function  CheckboxExample() {
    const [checkedItems, setCheckedItems] = useState({});
  
    const handleChange = event => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked
      });
      console.log("checkedItems: ", checkedItems);
    };
  
    const checkboxes = [
      {
        name: "check-box-1",
        key: "checkBox1",
        label: "Check Box 1"
      },
      {
        name: "check-box-2",
        key: "checkBox2",
        label: "Check Box 2"
      }
    ];
  
    return (
      <div>
        <lable>Checked item name : {checkedItems[0]} </lable> <br />
        {checkboxes.map(item => (
          <label key={item.key}>
            {item.name}
            <Checkbox
              name={item.name}
              checked={checkedItems[item.name]}
              onChange={handleChange}
            />
          </label>
        ))}
      </div>
    );
  };
  
