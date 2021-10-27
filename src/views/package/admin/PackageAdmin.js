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

const PackageAdmin = () => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [dataPackage, setDataPackage] = useState('');

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
          //continue
          getPackage();
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const getPackage = async () => {
        setCheckProcess(true);
        try {
            const r_getPackage = await fetch(`${API_URL}/api/backend/package/getPackage`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(r_getPackage.ok) {
                const r_dataPackage = await r_getPackage.json();
                if(r_dataPackage.status === 1) {
                    setDataPackage(r_dataPackage.package);
                }
                else if(r_dataPackage.status === 2) {
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
        let color = '';
        let id_status_approve = 0;
        if (row.id_status_approve === 1) {
            color = 'success'
            id_status_approve = 2;
        }
        else {
            color = 'danger'
            id_status_approve = 1;
        }
        return (
            <div>
                <Button color={color} value={cell} style={{padding: "10px",fontSize: "14px", width: "100px"}} onClick={ async () => {
                    const button_updatePackage = await swal.fire({
                        title: "",
                        text: "Are you sure you want to update this package?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                    if(button_updatePackage.isConfirmed) {
                        const res_updatePackage = await fetch(`${API_URL}/api/backend/package/updatePackage`, {
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                id_package: cell,
                                id_status_approve: id_status_approve
                            })
                        });
                        if(res_updatePackage.ok) {
                            const r_updatePackage = await res_updatePackage.json();
                            if (r_updatePackage.status === 1) {
                                getPackage();
                                swal.fire("", "Delete package successfully", "success");
                            }
                            else if (r_updatePackage.status === 0) {
                                swal.fire("","Delete package failed","warning");
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
                {row.id_status_approve === 1 ? 'Apporve' : 'Wait'}
                </Button>
            </div>
        );
    }

    const action = (cell, row) => {
        const link_edit_tour = `/admin/editPackage/${cell}`;
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
                        const res_del = await fetch(`${API_URL}/api/backend/deletePackage`, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                            body: JSON.stringify({
                                id_package: cell
                            })
                        });
                        if(res_del.ok) {
                            const r_del = await res_del.json();
                            if (r_del.status === 1) {
                                getPackage();
                                swal.fire("", "Delete package successfully", "success");
                            }
                            else if (r_del.status === 2) {
                                swal.fire("","Delete package failed","warning");
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

    const creatBy = (cell, row) => {
        return(
            <div>
                <p>{`${row.fname} ${row.lname}`}</p>
            </div>
        )
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
                                        <BootstrapTable data={dataPackage} version="4" striped hover pagination search>
                                            <TableHeaderColumn isKey dataField="no" width='100' dataSort>No.</TableHeaderColumn>
                                            <TableHeaderColumn dataField="tour_name_package" width='250' dataSort>Tour Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField="package_name" width='200' dataSort>Package Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_package_tour" width='200' dataSort dataFormat={creatBy}>Create By</TableHeaderColumn>
                                            <TableHeaderColumn dataField="last_insert_package" width='140' dataSort>Last login</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_package_tour" width='150' dataSort dataFormat={permission}>Status</TableHeaderColumn>
                                            <TableHeaderColumn dataField="id_package_tour" width='160' dataSort dataFormat={action}>Action</TableHeaderColumn>
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

export default PackageAdmin;
