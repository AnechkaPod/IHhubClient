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
  const handleFieldChange = (field, value) => {
    console.log("columns");
    console.log(columns);
    console.log("select field changed");
    // Create a copy of the selectedOption to avoid mutating state directly
    const updatedSelectedOption = { ...selectedOption };
    console.log("updatedSelectedOption");
    console.log(updatedSelectedOption);
    console.log("selectedOption");
    console.log(selectedOption);
    console.log("field");
    console.log(field);
    console.log("value");
    console.log(value);
    updatedSelectedOption[field] = value;
    console.log("updatedSelectedOption");
    console.log(updatedSelectedOption);
   // raws[0] = updatedSelectedOption;
    const index = raws.findIndex((item) => item.id === updatedSelectedOption.id);
    raws[index] = updatedSelectedOption;
    setSelectedOption(updatedSelectedOption);
    console.log("raws");
    console.log(raws);
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
    <div style={{ position: 'relative', width: "100%" }}>

      {addMode == false &&
        <Button color="primary" startIcon={<DeleteIcon />} style={{
          position: 'absolutey',
          top: 0,
          right: 226,
        }} onClick={DeleteRow}>
          Delete record
        </Button>}
      {addMode == false &&
        <Button color="primary" startIcon={<AddIcon />} style={{
          position: 'absolute',
          top: 0,
          right: 85,
        }} onClick={AddRaw}>
          Add record
        </Button>}
      <Button onClick={OnSave} color="primary" startIcon={<SaveIcon />} style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}>
        Save
      </Button>
      {addMode === true && (
        <div style={{ position: 'absolute', top: 0, right: 0 }}>

          <Button color="primary" startIcon={<CancelIcon />} onClick={CanelAddRaw} style={{
            position: 'absolute',
            top: 0,
            right: 85,
          }}>
            Cancel
          </Button>
        </div>
      )}
      {addMode == false &&
        <Select style={{ width: '200px' }} value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value); }}>
          {
            raws.map((raw) => (
              <MenuItem value={raw}>{raw[comboField]}</MenuItem >
            ))}
        </Select>}
      

      <Box style={{
        position: 'absolute',
        top: 70,
        right: 0,
        margin: 0
      }}
        component="form"

        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {columns.map((item, index) => {
            var fieldValue = selectedOption && selectedOption[item.field] !== null ? selectedOption[item.field] : '';

            return (
              item.field !== "id" && (item.type=="string"||item.type=="number")  && <TextField
                required
                type={item.type}
                key={index}
                id="outlined-required"
                label={item.headerName}
                value={fieldValue} // Use the 'value' prop here
                onChange={(e) => handleFieldChange(item.field, e.target.value)}
              />
              ||
              item.field !== "id" && (item.type=="singleSelect")  && <Select
              key={index}
              style={{
                margin: '8px', // Adjust the margin as needed
                width: '200px', // Adjust the width as needed
              }}
              id="outlined-required"
              label={item.headerName}
              value={fieldValue} // Use the 'value' prop here
              onChange={(e) => handleFieldChange(item.field, e.target.value)}
            >
               {item.valueOptions.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role[item.optionsPropertyToDisplay] }
                  </MenuItem>
                ))}
              </Select>
            );
          })}
        </div>
      </Box>
    </div>
  )
}

export default FormComponent