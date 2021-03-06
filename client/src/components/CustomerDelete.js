import React from "react";
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogTitle} from '@mui/material';
import {DialogContent} from '@mui/material';
import {Button} from '@mui/material';
import { Typography } from "@mui/material";

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = ()=> {
        this.setState({
            open: true
        });
    }

    handleClose = ()=> {
        this.setState({
            open:false
        });
    }

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url,{
            method:'DELETE'
        });
        this.props.stateRefresh();
    }

    buttonClick = (e)=>{
        console.log('delete button click!!');
        this.deleteCustomer(this.props.id);
    }

    render() {
        return (
            <div>
                <Button variant="secondary" color="primary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}> 
                    <DialogTitle>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom> 선택한 고객 정보가 삭제됩니다. </Typography>
                    </DialogContent>
                    <DialogActions>
                            <Button variant="contained" color="primary" onClick={this.buttonClick}>삭제</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
            
        )
    }
}

export default CustomerDelete;