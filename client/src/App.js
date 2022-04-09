import React from 'react';
import Customer from './components/Customer'
import './App.css';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';

/*function App() {
  return (
    <Customer/>

  );
}*/

const customers = [
 {
  'id':1,
  'image':'https://placeimg.com/64/64/1',
  'name':'박미안',
  'birthday':'770210',
  'gender':'male',
  'job':'대학생'
 },
 {
  'id':2,
  'image':'https://placeimg.com/64/64/2',
  'name':'박미1',
  'birthday':'770210',
  'gender':'male',
  'job':'대학생'
 },
 {
  'id':3,
  'image':'https://placeimg.com/64/64/3',
  'name':'박미2',
  'birthday':'770210',
  'gender':'male',
  'job':'대학생'
 }
]


class App extends React.Component {
  render() {

    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableHead>
          <TableBody>
          { customers.map(x=> {
            return (
              <Customer 
                key={x.id}
                id={x.id} 
                image={x.image}
                name={x.name}
                birthday={x.birthday}
                gender={x.gender}
                job={x.job}
              />
            );
          }) }
          </TableBody>
        </Table>
      </TableContainer>
      
    )
  }
}

export default  App ;
