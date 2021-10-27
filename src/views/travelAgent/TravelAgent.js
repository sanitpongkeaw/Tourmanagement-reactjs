import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from "API_URL";
import MapLink from "./MapLink";
//component
import HeaderEmtry from "components/Headers/HeaderEmtry";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";

import swal from 'sweetalert2';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import LinearProgress from '@material-ui/core/LinearProgress';

const TravelAgent = () => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [dataMembers, setDataMembers] = useState('');

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
          //continue
          getMembers();
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const getMembers = async () => {
        setCheckProcess(true);
        try {
            const r_getMembers = await fetch(`${API_URL}/api/backend/getmembers`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(r_getMembers.ok) {
                const r_dataMembers = await r_getMembers.json();
                if(r_dataMembers.status === 1) {
                    setDataMembers(r_dataMembers.members);
                }
                else if(r_dataMembers.status === 2) {
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

    const name = (cell, row) => {
        return(
            <div>
                <p>{`${row.fname} ${row.lname}`}</p>
            </div>
        )
    }

    const permission = (cell, row) => { 
        let update_approve = 0;
        let className_on = "";
        let height_button = "";

        if (row.id_status_member_on === 1) {
            update_approve = 2;
            className_on = "btn btn-success";
            height_button = "40px";
        } 
        else {
            update_approve = 1;
            className_on = "btn btn-warning";
            height_button = "50px";
        }
        return (
            <div>
                <button className={className_on} value={cell} style={{width: "100px", height: height_button, fontSize: "14px", textAlign: "center"}} onClick={ async () => {
                    try {
                        const button_approve = await swal.fire({
                            title: "",
                            text: "Are you sure you want to update status this account?",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });
                        if(button_approve.isConfirmed) {
                            const res_approve = await fetch(`${API_URL}/api/backend/updateStatusAccount`, {
                                method: "PATCH",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                },
                                body: JSON.stringify({
                                    id_member : cell,
                                    id_status_member_on: update_approve,
                                    status: localStorage.getItem("status")
                                })
                            });
                            if(res_approve.ok) {
                                const r_approve = await res_approve.json();
                                if(r_approve.status === 1) {
                                    swal.fire("","Update status successfully","success");
                                    getMembers();
                                }
                                else if(r_approve.status === 2) {
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
                }}>
                {row.id_status_member_on === 1 ? 'Apporve' : 'Wait'}
                </button>
            </div>
        );
    }

    const getFiles = (cell, row) => {
        return <MapLink id_account={cell} />
    }

    const actionDelete = (cell, row) => {
        return(
            <div>
                <button className="btn btn-danger" value={cell} style={{padding: "10px",fontSize: "14px"}} onClick={ async () => {
                    const button_del = await swal.fire({
                        title: "",
                        text: "Are you sure you want to delete this account?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                    if(button_del.isConfirmed) {
                        const res_del = await fetch(`${API_URL}/api/backend/deleteAccount`, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                id_account: cell
                            })
                        });
                        if(res_del.ok) {
                            const r_del = await res_del.json();
                            if (r_del.status === 1) {
                                getMembers();
                                swal.fire("", "Delete account successfully", "success");
                            }
                            else if (r_del.status === 2) {
                                swal.fire("","Delete account failed","warning");
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
                Delete
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
                                    <h3 className="mb-0">Travel Agents</h3>
                                </CardHeader>
                                <CardBody>
                                    <div style={{overflow: "auto"}}>
                                        <BootstrapTable data={dataMembers} version="4" striped hover pagination search>
                                            <TableHeaderColumn isKey dataField="no" width='120' dataSort>No.</TableHeaderColumn>
                                            <TableHeaderColumn dataField="fname" width='120' dataSort dataFormat={name}>Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField="email_member" width='220' dataSort>Email</TableHeaderColumn>
                                            <TableHeaderColumn dataField="company" width='120' dataSort>Company</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_account" width='450' dataSort dataFormat={getFiles}>Attach File</TableHeaderColumn>
                                            <TableHeaderColumn dataField="last_login" width='140' dataSort>Last login</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_member" width='150' dataSort dataFormat={permission}>Permission</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_member" width='120' dataSort dataFormat={actionDelete}>Action</TableHeaderColumn>
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

export default TravelAgent;
