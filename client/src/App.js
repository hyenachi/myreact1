import React from 'react';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableRow } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { ClassNames } from '@emotion/react';

/*function App() {
  return (
    <Customer/>

  );

    1. constructor()
    2. componentWillMount()
    3. render()
    4. componentDidMount()

    props or state => shouldComponentUpdate()
.my-menu {
    margin-top: 15;
    margin-bottom: 15;
    display: flex;
    justify-content: center;
}
}*/

const styles = theme =>({
  root: {
    width:'100%',
    minWidth:1080  
  },

  table: {
    minWidth:1080  
  }
});

const Mymenu = styled('div')(({ theme }) => ({
  
  marginTop: 15,
  marginBottom: 15,
  display: 'flex',
  justifyContent: 'center'
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customers : ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers:''
    });
    this.callApi()
    .then (res => this.setState({customers : res}))
    .catch(err => console.log(err));

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
    
    const cellList = ['번호', '이미지', '이름', '생일', '성별', '직업', '설정'];
    return (
      <div>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography   variant="h6"  noWrap  component="div"  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            고객 관리
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
        <Mymenu>
          <CustomerAdd stateRefresh={this.stateRefresh}/> 
        </Mymenu>
        <TableContainer>
          <Table sx={{ minWidth: 1080 }}>
            <TableHead>
              {cellList.map(x=>{
                return (
                  <TableCell>{x}</TableCell>
                )
              })}
            </TableHead>
            <TableBody>
            { this.state.customers ? this.state.customers.map(x=> {
              return (
                <Customer stateRefresh={this.stateRefresh} key={x.id} id={x.id} image={x.image} name={x.name} birthday={x.birthday} gender={x.gender} job={x.job} />
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

      </div>

      
    )
  }
}

export default App;  
