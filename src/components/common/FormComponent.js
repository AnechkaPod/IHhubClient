import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';



const FormComponent = (props) => {
  const [raws, setRaws] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [addMode, setAddMode] = useState(false);
  const [rowBeforChange, setRowBeforChange] = useState({});
  const [comboField, setComboField] = useState('kodMatbea');

  useEffect(() => {
    setAddMode(false);
    setColumns(props.columns);
    setRaws(props.raws);
    setSelectedOption(props.raws[0]);
    console.log(" before form mounting");
    const comboFieldWithoutSpaces = props.comboField.replace(/\s/g, '');
    setComboField(comboFieldWithoutSpaces);
    console.log(" after form mounting");
    console.log(props.columns);
  }, [props]);


  const DeleteRow = () => {
    props.deleteRow(selectedOption.id);
    if (raws.length !== 0)
      setSelectedOption(raws[0]);
  };
  const AddRaw = () => {
    setRowBeforChange(selectedOption);
    var newrow = {};
    columns.map((item, index) => {
      newrow[item.field] = null;
    });
    setRaws([...raws, newrow]);
    setSelectedOption(raws[raws.length]);
    setAddMode(true);
  };

  const CanelAddRaw = () => {
    setRaws(raws => raws.slice(0, -1));
    setAddMode(false);
    setSelectedOption(rowBeforChange);
  };
  const handleFieldChange = (item, value) => {
    console.log("handleFieldChange");
    console.log("columns", columns);
    // Create a copy of the selectedOption to avoid mutating state directly
    const updatedSelectedOption = { ...selectedOption };
    console.log("updatedSelectedOption", updatedSelectedOption);
    console.log("selectedOption", selectedOption);
    console.log("itemmm", item);
    console.log("value", value);   //the id
    updatedSelectedOption[item] = value;
    if (item.valueOptions !== undefined) {
      const selectedValueOp = item.valueOptions.find((r) => r.id === value);

      updatedSelectedOption[item + "Navigation"] = selectedValueOp;
    }

    const index = raws.findIndex((i) => i.id === updatedSelectedOption.id);
    raws[index] = updatedSelectedOption;
    setSelectedOption(updatedSelectedOption);

  };

  const OnSave = () => {
    console.log("OnSave");
    console.log(selectedOption);
    if (addMode === true)
      props.addRow(selectedOption);
    else
      props.updateRow(selectedOption);

    setAddMode(false);
  }

  return (
    <div >
      <Box   
       sx={{
        background: "white",
        margin: "0 auto",
        height: 500,
        width: "90%",
        position: "relative", // Make the box position relative
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}

        component="form"

  
        noValidate
        autoComplete="off"
      >
      {addMode == false &&
        <Button color="primary" startIcon={<DeleteIcon />} style={{
          backgroundColor:'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
        }} onClick={DeleteRow}>
          Delete record
        </Button>}
        {addMode == false &&
        <Button color="primary" startIcon={<AddIcon />}
        disabled={addMode || raws.some(raw => columns.some(column => column.required && !selectedOption[column.field]))}
         style={{
          backgroundColor:'transparent',
          position: 'absolute',
          top: 0,
          right: 85,
        }} onClick={AddRaw}>
          Add record
        </Button>}
      <Button onClick={OnSave} color="primary" startIcon={<SaveIcon />}
        disabled={addMode || raws.some(raw => columns.some(column => column.required && !selectedOption[column.field]))}

      
      style={{
         backgroundColor:'transparent',
        position: 'absolute',
        top: 0,
        right: 0,
      }}>
        Save
      </Button>
      {addMode === true && (
        <div style={{ position: 'absolute', top: 0, right: 0 }}>

          <Button color="primary" startIcon={<CancelIcon />} onClick={CanelAddRaw} style={{
            backgroundColor:'transparent',
            position: 'absolute',
            top: 0,
            right: 85,

          }}>
            Cancel
          </Button>
        </div>
      )}

        
              {addMode == false &&
        <Select style={{ width: '200px' }} value={selectedOption} onChange={(e) => { setSelectedOption(e.target.value); }}>
          {
            raws.map((raw) => (
              <MenuItem value={raw}>{raw[comboField]}</MenuItem >
            ))}
        </Select>}
        <div>
          {columns.map((item, index) => {
            var fieldValue = selectedOption && selectedOption[item.field] !== null ? selectedOption[item.field] : '';

            return (
              item.field !== "id" && (item.type == "string" || item.type == "number") && <TextField style={{margin:'10px'}}
                required={item.required}
                error={item.required && (fieldValue=="")}
                type={item.type}
                key={index}
                id="outlined-required"
                label={item.headerName}
                value={fieldValue} // Use the 'value' prop here
                onChange={(e) => handleFieldChange(item.field, e.target.value)}
              />
              ||
              item.field !== "id" && (item.type == "singleSelect") &&
              <Select
                key={index}
                style={{
                  margin: '8px', // Adjust the margin as needed
                  width: '200px', // Adjust the width as needed
                }}
                id="outlined-required"
                label={item.headerName}
                value={fieldValue} // Use the 'value' prop here
                onChange={(e) => {
                  console.log("---------onChange------");
                  console.log("item", item);
                  console.log("e", e);
                  handleFieldChange(item, e.target.value);

                }}
              >
                {
                  /*  item.valueOptions.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role[item.optionsPropertyToDisplay] }
                      </MenuItem>
    
    
    
                    )) */

                  item.filteringProps == null || item.filteringProps == undefined
                    ?
                    item.valueOptions

                      .map((role) => (

                        <MenuItem key={role.id} value={role.id}>
                          {role[item.optionsPropertyToDisplay]}
                        </MenuItem>
                      )) :
                    item.valueOptions
                      .filter((op) => op[item.filteringProps] === selectedOption[item.filteringProps])
                      .map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role[item.optionsPropertyToDisplay]}
                        </MenuItem>
                      ))
                }
              </Select>
            );
          })}
        </div>
      </Box>
    </div>
  )
}

export default FormComponent