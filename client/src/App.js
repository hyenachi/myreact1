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
import CircularProgress from '@mui/material/CircularProgress';

/*function App() {
  return (
    <Customer/>

  );

    1. constructor()
    2. componentWillMount()
    3. render()
    4. componentDidMount()

    props or state => shouldComponentUpdate()

}*/

class App extends React.Component {

  state = {
    customers : ""
  }
  
  componentDidMount() {
    this.callApi()
    .then (res => this.setState({customers : res}))
    .catch(err => console.log(err));

  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }


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
          { this.state.customers ? this.state.customers.map(x=> {
            return (
              <Customer key={x.id} id={x.id} image={x.image} name={x.name} birthday={x.birthday} gender={x.gender} job={x.job} />
            );
          })  : 
            <TableRow> 
              <TableCell colSpan="6" align='center'>
                <CircularProgress />
              </TableCell>
            </TableRow>
              }
          </TableBody>
        </Table>
      </TableContainer>
      
    )
  }
}

export default  App ;
