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
import { grey } from '@mui/material/colors';
var rowsUrl;
var clumnsUrl;

const FormTableComponents = (props) => {

  const [formType, setFormType] = React.useState('table');
  const [rows, setRows] = useState([]);
  const [columns, setClumns] = useState([]);
  const [deleteIDAfterSave, SetDeleteIDAfterSave] = useState(false);
  const [idField, SetIdField] = useState('');


  const handleChange = (val) => {
    setFormType(val);
  };

  useEffect(() => {
    if (props.menu != undefined) {
      rowsUrl = props.url + props.menu.rowsUrl;
      clumnsUrl = props.url + props.menu.columnsUrl;
      if (props.menu.rowsUrl !== undefined && props.menu.columnsUrl !== undefined) {
        getAllColumns()
          .then((cols) => {
            // After the first function completes, call the second function.
            return getAllRows(cols);
          })
          .catch((error) => {
            // Handle any errors that occurred during execution of the functions.
            console.error("Error in useEffect:", error);
          });
      }
    }
  }, [props.menu]);

  const addRow = (obj) => {
    addItem(rowsUrl, obj).then((response) => {
      response.data.id = response.data[idField];
      setRows([...rows, response.data]);
    }).catch((error) => {
      console.error("An error occurred in deleteRow:", error);
    });
  }
  const deleteRow = (id) => {
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
      }
    }
    ).catch((error) => {
      // Handle the error here
      console.error("An error occurred in updateItem:", error);
    });

  }

  const getAllRows = async (cols) => {
    try {
      const response = await getAll(rowsUrl);
      const rowsArr = response.data;
      const result = cols.find((element) => element.isPrimaryKey === true);
      if (result.field !== "id") {
        SetDeleteIDAfterSave(true);
       
      }

      SetIdField(result.field);
      rowsArr.forEach((row) => {
        row.id = row[result.field];
      });
      setRows(rowsArr);
      console.log("rows",rowsArr);

      const filteredCols = cols.filter(x => x.isPrimaryKey !== true || x.identity===false );
      setClumns(filteredCols);

    } catch (error) {
      // Handle the error here
      console.error("An error occurred in getAllRows:", error);
    }
  };

  const getAllColumns = async () => {
    try {
      const response = await getAll(clumnsUrl);
    
      for (const element of response.data.objectsList) {
        if (element.type === "singleSelect") {
          const res = await getAll(element.valueOptionsUrl);
          const valueOptions = res.data;
          element.valueOptions = valueOptions;
          element.renderEditCell = (params) => (
            <Select
              value={params.value}
              onChange={(e) => {
                console.log("combo changed");
                console.log("valueOptions", valueOptions);
                console.log("element", element);
                console.log("element.filteringProps", element.filteringProps);
                console.log("params", params);

                const filtered = valueOptions.filter((op) => op[element.filteringProps] === params.row[element.filteringProps]);
                console.log("filtered", filtered);
                params.api.setEditCellValue({ ...params, value: e.target.value });
              }}
              fullWidth
            >

              {
                element.filteringProps == null || element.filteringProps == undefined
                  ?
                  valueOptions

                    .map((role) => (
                      <MenuItem key={role[element.optionsPrimaryKey]} value={role[element.optionsPrimaryKey]}>
                        {role[element.optionsPropertyToDisplay]}
                      </MenuItem>
                    )) :
                  valueOptions
                    .filter((op) => op[element.filteringProps] === params.row[element.filteringProps])
                    .map((role) => (
                      <MenuItem key={role[element.optionsPrimaryKey]} value={role[element.optionsPrimaryKey]}>
                        {role[element.optionsPropertyToDisplay]}
                      </MenuItem>
                    ))

              }
            </Select>
          );
          element.valueFormatter = (params) => {
            const role = valueOptions.find((r) => r[element.optionsPrimaryKey] === params.value);
            return role ? role[element.optionsPropertyToDisplay] : "";
          }
          console.log(valueOptions);
        }
      }

      console.log("columns",response.data.objectsList)
      return response.data.objectsList;
    } catch (error) {
      // Handle the error here
      console.error("An error occurred in getAllColumns:", error);
    }
  };


  return (


    <div style={{
      background:"white",
      margin: '0 auto',  // Center the Box horizontally
      height:  '100%',
      minHeight:  '100%',
      width: '90%',
      position: 'relative',
      display: 'grid',
      width: '100%',
      minWidth: '100%',
      backgroundSize: 'cover',
      background:'#f0f0f1',
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