import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { getAll, addItem, updateItem, deleteItem } from '../../utils';
import { useState, useEffect } from 'react'
import FormComponent from './FormComponent';
import TableComponent from './TableComponent';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
var rowsUrl;
var clumnsUrl;

const FormTableComponents = (props) => {

  const [formType, setFormType] = React.useState('table');
  const [rows, setRows] = useState([]);
  const [columns, setClumns] = useState([]);

  const handleChange = (val) => {
    setFormType(val);
  };

  useEffect(() => {
    if (props.menu != undefined) {
      rowsUrl = props.url + props.menu.rowsUrl;
      clumnsUrl = props.url + props.menu.columnsUrl;
      if (clumnsUrl !== undefined && rowsUrl !== undefined) {
        getAllRows();
        getAllColumns();
      }
    }
  }, [props.menu]);

  const addRow = (obj) => {
    console.log("addRow");
    obj.id = 0;
    obj[props.idField] = 0;
    console.log(obj);

    addItem(rowsUrl, obj).then((response) => {
      setRows([...rows, response.data]);
    }).catch((error) => {
      console.error("An error occurred in deleteRow:", error);
    });
  }
  const deleteRow = (id) => {
    console.log(" deleteRow  id: " + id);
    deleteItem(rowsUrl, id).then(() => {
      setRows(rows.filter((item) => item.id !== id));
    }).catch((error) => {
      console.error("An error occurred in deleteRow:", error);
    });
  }
  const updateRow = (obj) => {
    updateItem(rowsUrl, obj.id, obj).then(() => {
      const itemIndex = rows.findIndex((item) => item.id === obj.id);
      //set the updated matbea in array
      if (itemIndex !== -1) {
        const updatedItems = [...rows];
        updatedItems[itemIndex] = obj;
        setRows(updatedItems);
        console.log(updatedItems);
      }
    }
    ).catch((error) => {
      // Handle the error here
      console.error("An error occurred in updateItem:", error);
      console.error(" update object:", obj);
      console.error(" update url:", rowsUrl);
    });

  }

  const getAllRows = () => {
    getAll(rowsUrl).then((response) => {
      console.error("ROWS:");
      console.error(response);
      var rows = response.data;
      console.error(rows);
      setRows(rows);

    }).catch((error) => {
      // Handle the error here
      console.error("An error occurred in getAllRows:", error);
    });
  }
  const getAllColumns = () => {
    getAll(clumnsUrl).then((response) => {
      setClumns(response.data.objectsList);
      console.error("COLUMNS");
      console.error(response.data.objectsList);
      response.data.objectsList.forEach(element => {
        if (element.type === "singleSelect") {
          getAll(element.valueOptionsUrl).then((res) => {
            console.log(element);
            console.log("has single select and the values are");
            console.log(res.data);
            var valueOptions = res.data;
            element.valueOptions = valueOptions;
            element.renderEditCell = (params) => (
              <Select
                value={params.value}
                onChange={(e) =>{
                  console.log("combo changed");
                  params.api.setEditCellValue({ ...params, value: e.target.value })
                }}
                fullWidth
              >
                {valueOptions.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.sugMutzar}
                  </MenuItem>
                ))}
              </Select>
            );
            element.valueFormatter = (params) => {
              const role = valueOptions.find((r) => r.id === params.value);
              return role ? role.sugMutzar : "";
            }
            console.log(valueOptions);

          });
        }
      });
    }).catch((error) => {
      // Handle the error here
      console.error("An error occurred in getAllRows:", error);
    });

  }

  return (


    <div style={{
      position: 'relative',
      display: 'grid',
      width: '100%',
      minWidth: '100%',
      backgroundSize: 'cover',
      padding: 0,
      margin: 0,
    }}>
      <div>
        <Radio
          checked={formType === 'form'}
          onChange={(e) => handleChange(e.target.value)}
          value="form"

          name="radio-buttons"
        />Form
        <Radio
          checked={formType === 'table'}
          onChange={(e) => handleChange(e.target.value)}
          value="table"
          name="radio-buttons"
        />Table
      </div>


      {formType === "form" && <FormComponent comboField={props.menu.comboDisplayField} deleteRow={deleteRow} updateRow={updateRow} addRow={addRow} raws={rows} columns={columns} />}
      {formType === "table" && <TableComponent deleteRow={deleteRow} updateRow={updateRow} addRow={addRow} raws={rows} columns={columns} />}
      <br />

    </div>



  )
}

export default FormTableComponents  