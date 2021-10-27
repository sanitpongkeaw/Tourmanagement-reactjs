import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from "API_URL";
import { Link } from 'react-router-dom';
//component
import HeaderEmtry from "components/Headers/HeaderEmtry";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";

import swal from 'sweetalert2';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import LinearProgress from '@material-ui/core/LinearProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const ToursAdmin = () => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [dataTours, setDataTours] = useState('');

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
          //continue
          getTours();
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const getTours = async () => {
        setCheckProcess(true);
        try {
            const r_getTours = await fetch(`${API_URL}/api/backend/getTours`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(r_getTours.ok) {
                const r_dataTours = await r_getTours.json();
                if(r_dataTours.status === 1) {
                    setDataTours(r_dataTours.tours);
                }
                else if(r_dataTours.status === 2) {
                    setCheckProcess(false);
                    swal.fire("", "get data failed", "error");
                }
                else {
                    setCheckProcess(false)
                    swal.fire("", "Please refresh page", "error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
            setCheckProcess(false);
        } catch (error) {
            setCheckProcess(false)
            swal.fire("", "Please refresh page", "error");
            console.log(error)
        }
    }

    const permission = (cell, row) => { 
        let button_color = "";
        let id_change_status = 0;
        if (row.id_status_approve === 1) {
            button_color = "success";
            id_change_status = 2;
        }
        else {
            button_color = "danger";
            id_change_status = 1;
        }
        return (
            <div className="text-center">
                <Button 
                    value={id_change_status} 
                    color={button_color} 
                    style={{width: "100px", height: "50px", fontSize: "14px", textAlign: "center"}}
                    onClick={async () => {
                        try {
                            const button_approve = await swal.fire({
                                title: "",
                                text: "Are you sure you want to update status this account?",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            });
                            if(button_approve.isConfirmed) {
                                const res_updateStatus = await fetch(`${API_URL}/api/backend/tour/updateStatusTour`, {
                                    method: "PATCH",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    },
                                    body: JSON.stringify({
                                        id_data_tour: cell,
                                        id_status_approve: id_change_status
                                    })
                                });
                                if (res_updateStatus.ok) {
                                    const r_updateStatus = await res_updateStatus.json();
                                    if (r_updateStatus.status === 1) {
                                        getTours();
                                        swal.fire("","Update status successfully","success");
                                    }
                                    else if (r_updateStatus.status === 0) {
                                        swal.fire("","Update Status Fail!","error");
                                    }
                                    else {
                                        swal.fire("","Your status is wrong","error");
                                        localStorage.clear();
                                        history.push('/auth/login');
                                    }
                                }
                            }
                        } catch (error) {
                            swal.fire("","Please try again","warning");
                            localStorage.clear();
                            history.push('/auth/login');
                            console.log(error);
                        }
                    }}
                >
                    {row.id_status_approve === 1 ? 'Apporve' : 'Wait'}
                </Button>
            </div>
        );
    }

    const action = (cell, row) => {
        const link_edit_tour = `/admin/editTour/${cell}`;
        return(
            <div className="text-center">
                <Link to={link_edit_tour}>
                    <Button color="warning" style={{padding: "10px",fontSize: "14px",margin: "7px"}}>
                        <BorderColorIcon />
                    </Button>
                </Link>
                <button className="btn btn-danger" value={cell} style={{padding: "10px",fontSize: "14px"}} onClick={ async () => {
                    const button_del = await swal.fire({
                        title: "",
                        text: "Are you sure you want to delete this account?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                    if(button_del.isConfirmed) {
                        const res_del = await fetch(`${API_URL}/api/backend/deleteTour`, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                id_data_tour: cell
                            })
                        });
                        if(res_del.ok) {
                            const r_del = await res_del.json();
                            if (r_del.status === 1) {
                                getTours();
                                swal.fire("", "Delete tour successfully", "success");
                            }
                            else if (r_del.status === 2) {
                                swal.fire("","Delete tour failed","warning");
                            }
                            else {
                                swal.fire("","Your status is wrong","error");
                                localStorage.clear();
                                history.push('/auth/login');
                            }
                        }
                        else {
                            swal.fire("","Please try again","warning");
                        }
                    }
                }}>
                <DeleteIcon />
                </button>
            </div>
        );
    }
  
    if(checkProcess) {
        return(
            <div style={{width: '100%'}}>
                <HeaderEmtry />
                <LinearProgress />
            </div>
        );
    }
    else {
        return (
            <>
                <HeaderEmtry />
                {/* Page content */}
                <Container className="mt--6" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <h3 className="mb-0">Tours</h3>
                                </CardHeader>
                                <CardBody>
                                    <div style={{overflow: "auto"}}>
                                        <BootstrapTable data={dataTours} version="4" striped hover pagination search>
                                            <TableHeaderColumn isKey dataField="no" width='100' dataSort>No.</TableHeaderColumn>
                                            <TableHeaderColumn dataField="tour_name" width='240' dataSort>Tour Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField="last_insert_tour" width='140' dataSort>Last login</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_data_tour" width='150' dataSort dataFormat={permission}>Status</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_data_tour" width='160' dataSort dataFormat={action}>Action</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
};

export default ToursAdmin;
