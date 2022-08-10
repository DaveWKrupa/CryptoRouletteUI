import React, { useState } from "react"



const Checkbox = ({ type = "checkbox", name, value, checked = false, onChange }) => {
    console.log("Checkbox: ", name, checked, value)
    
    return (
        <input type={type} name={name} value={value} checked={checked} onChange={onChange} />
    )

}
  
export default function  PlayerPicksExact2() {
    const [checkedItems, setCheckedItems] = useState({})
  
    const handleChange = event => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked
      })
      console.log("checkedItems: ", checkedItems)
    }
  
    const checkboxes = [
      {
        name: "one",
        value: "1"
      },
      {
        name: "two",
        value: "2"
      },
      {
        name: "three",
        value: "3"
      },
      {
        name: "four",
        value: "4"
      },
      {
        name: "five",
        value: "5"
      },
      {
        name: "six",
        value: "6"
      },
      {
        name: "seven",
        value: "7"
      },
      {
        name: "eight",
        value: "8"
      },
      {
        name: "nine",
        value: "9"
      },
      {
        name: "ten",
        value: "10"
      },
      {
        name: "eleven",
        value: "11"
      },
      {
        name: "twelve",
        value: "12"
      },
      {
        name: "thirteen",
        value: "13"
      },
      {
        name: "fourteen",
        value: "14"
      },
      {
        name: "fifteen",
        value: "15"
      },
      {
        name: "sixteen",
        value: "16"
      },
      {
        name: "seventeen",
        value: "17"
      },
      {
        name: "eighteen",
        value: "18"
      },
      {
        name: "nineteen",
        value: "19"
      },
      {
        name: "twenty",
        value: "20"
      },
      {
        name: "twentyone",
        value: "21"
      },
      {
        name: "twentytwo",
        value: "22"
      },
      {
        name: "twentythree", 
        value: "23"
      },
      {
        name: "twentyfour",
        value: "24"
      },
      {
        name: "twentyfive",
        value: "25"
      },
      {
        name: "twentysix",
        value: "26"
      },
      {
        name: "twentyseven", 
        value: "27"
      },
      {
        name: "twentyeight",
        value: "28"
      },
      {
        name: "twentynine",
        value: "29"
      },
      {
        name: "thirty",
        value: "30"
      },
      {
        name: "thirtyone",
        value: "31"
      },
      {
        name: "thirtytwo",
        value: "32"
      },
      {
        name: "thirtythree",
        value: "33"
      },
      {
        name: "thirtyfour",
        value: "34"
      },
      {
        name: "thirtyfive", 
        value: "35"
      },
      {
        name: "thirtysix",
        value: "36"
      }
    ]
  
    return (
      <div>
        {checkboxes.map(item => (
          <label key={item.name}>
            <Checkbox
              name={item.name}
              value={item.value}
              checked={checkedItems[item.name]}
              onClick={() => setCheckboxValue(item.name, item.value)}
            />
            {item.value}
          </label>
        ))}
      </div>
    )
}
  
