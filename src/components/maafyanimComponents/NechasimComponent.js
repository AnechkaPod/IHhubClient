import React ,{ useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

const NechasimComponent = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  },[]);

  const getAllUsers = async () => {
    const resp = await axios.get(url);
    setUsers(resp.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:');
    // You can perform further actions here, like sending data to a server
  };

  return (
    <div>
      NechasimComponent
      
         <form onSubmit={handleSubmit}>
         <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </form>
    </div>
  )
}

export default NechasimComponent