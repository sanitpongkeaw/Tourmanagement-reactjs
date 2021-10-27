import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from "API_URL";
import parse from 'html-react-parser';
//component
import HeaderEmtry from "components/Headers/HeaderEmtry";
// reactstrap components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  FormGroup,
  Button,
  Input,
  Form,
  Col,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
} from "reactstrap";

import swal from 'sweetalert2';
import Select from 'react-select'
import LinearProgress from '@material-ui/core/LinearProgress';

const CalendarThanMoreOneAgent = () => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [idDataTour, setIdDataTour] = useState('');
    const [tourNameList, setTourNameList] = useState([]);
    const [packageList, setPackageList] = useState([]);
    const [idPackage, setIdPackage] = useState('');
    const [today, setToday] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [listDatePeriod, setListDatePeriod] = useState([]);
    const [listDateCompare, setListDateCompare] = useState([]);
    const [dataCalendar, setDataCalendar] = useState([]);
    const [checkGetCalendar, setCheckGetCalendar] = useState(false);
    const [checkModalTicket, setCheckModalTicket] = useState(false);
    // const [stopSell, setStopSell] = useState('1');
    // const [fromDate, setFromDate] = useState('');
    // const [toDate, setToDate] = useState('');
    // const [inventoryUpdate, setInventoryUpdate] = useState('');
    // const [checkModalCutOffDay, setCheckModalCutOffDay] = useState(false);
    // const [cutOffDay, setCutOffDay] = useState('');
    // const [checkModalCutOffHours, setCheckModalCutOffHours] = useState(false);
    // const [cutOffHours, setCutOffHours] = useState('');
    // const [checkModalBookingBefore, setCheckModalBookingBefore] = useState(false);
    // const [bookingBefore, setBookingBefore] = useState('');
    // const [checkModalPromotionCode, setCheckPromotionCode] = useState(false);
    // const [promotionCode, setPromotionCode] = useState('');
    // const [checkModalPriceAdult, setCheckModalPriceAdult] = useState(false);
    // const [priceAdult, setPriceAdult] = useState('');
    // const [checkModalPriceChild, setCheckModalPriceChild] = useState(false);
    // const [priceChild, setPriceChild] = useState('');

    const [idPackageTour, setIdPackageTour] = useState('');
    const [idStopSell, setIdStopSell] = useState('1');
    const [mulAdult, setMulAdult] = useState('');
    const [mulChild, setMulChild] = useState('');
    const [inventory, setInventory] = useState('');
    const [oneAdult, setOneAdult] = useState('');
    const [oneChild, setOneChild] = useState('');
    const [packageName, setPackageName] = useState('');

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
          getToursName();
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
          const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          setToday(`${year}-${month}-${day}`);
          setStartDate(`${year}-${month}-${day}`);
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const styleP = {
        fontSize: '17px', 
        fontWeight: 'normal',
        lineHeight: '4px'
    }

    const styleThead =  {
        fontWeight: 'bold', 
        backgroundColor: '#5E72E4', 
        color: '#FFFFFF', 
        minWidth: '250px',
        height: '100px'
    }

    const styleTd = { 
        fontWeight: 'bold',
        padding: '10px' ,
        minWidth: '250px'
    }

    const styleTdStopSell = {
        backgroundColor: '#f2584e'
    }

    const styleTdHaveNotData = {
        backgroundColor: '#3391f5'
    }

    const styleWarning = {
        fontWeight: 'bold',
        color: 'red',
        justifyContent: 'center',
        textAlign: 'center'
    }

    const getToursName = async () => {
        setCheckProcess(true);
        try {
            const res_getToursName = await fetch(`${API_URL}/api/backend/calendarMore/getTourList`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getToursName.ok) {
                const r_getToursName = await res_getToursName.json();
                if (r_getToursName.status === 1) {
                    tourNameList.splice(0, tourNameList.length);
                    for (const data of r_getToursName.tour) {
                        tourNameList.push({
                            value: data.id_data_tour, 
                            label: data.tour_name,
                            type: data.type
                        });
                    }
                    setCheckProcess(false);
                }
                else if (r_getToursName.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Get tour list failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    }

    const getValueTourList = async (data) => {
        setIdDataTour(data.value);
        const id_data_tour = data.value;

        try {
            const res_getPackage = await fetch(`${API_URL}/api/backend/package/getPackageList/${id_data_tour}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getPackage.ok) {
                const r_getPackage = await res_getPackage.json();
                if (r_getPackage.status === 1) {
                    packageList.splice(0, packageList.length);
                    for (const data of r_getPackage.package) {
                        packageList.push({
                            value: data.id_package_tour, 
                            label: data.package_name
                        });
                    }
                }
                else if (r_getPackage.status === 0) {
                    swal.fire("", "Get package list failed", "warning");
                }
                else {
                    swal.fire("", "Please refresh page", "error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    };

    const getDates = (startDate, endDate) => {
        let dates = [],
            currentDate = startDate,
            addDays = function(days) {
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    const submitCalendar = (e) => {
        e.preventDefault();

        if (idDataTour === '') {
            swal.fire("", "Please select Tour", "warning");
        }
        else {
            let arr_date_split = [];
            let split_start_date = startDate.split("-");
            let split_to_date = endDate.split("-");
            let dates = getDates(new Date(split_start_date[0],(split_start_date[1] - 1),split_start_date[2]), new Date(split_to_date[0],(split_to_date[1] - 1),split_to_date[2]));
            listDateCompare.splice(0, listDateCompare.length);
            dates.map((date) => {
                let date_split_for_compare = date.toString().substring(0, 16) + "24:00:00 GMT+0700 (Indochina Time)";
                let format_date_for_compare = new Date(date_split_for_compare).toISOString();
                let date_for_compare = format_date_for_compare.split("T", 1);
                listDateCompare.push(date_for_compare[0]);
    
                let date_split = date.toString().split(" ", 4);
                arr_date_split.push(`${date_split[0]} ${date_split[2]} ${date_split[1]} ${date_split[3]}`);
            });
            setListDatePeriod(arr_date_split);

            updateCalendar();
        }
    }

    const updateCalendar = async () => {
        setCheckProcess(true);
        try {
            const res_getCaladar = await fetch(`${API_URL}/api/backend/calendarMore/getCalendar/${startDate}/${endDate}/${idDataTour}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getCaladar.ok) {
                const r_getCalendar = await res_getCaladar.json();
                if (r_getCalendar.status === 1) {
                    // setDataCalendar(r_getCalendar.package)
                    dataCalendar.splice(0, dataCalendar.length);
                    r_getCalendar.package.map((value,index) => { 
                        let data = [];
                        for (let i = 0; i < listDateCompare.length; i++) {
                            if (listDateCompare[i] === value.date_start) {
                                data.push({
                                    date_start: value.date_start,
                                    id_package_tour: value.id_package_tour,
                                    id_status_stop_sell: value.id_status_stop_sell,
                                    mulAdult: value.mulAdult,
                                    mulChild: value.mulChild,
                                    number_of_ticket: value.number_of_ticket,
                                    oneAdult: value.oneAdult,
                                    oneChild: value.oneChild,
                                    package_name: value.package_name,
                                    type: value.type,
                                    packageNameTd: value.package_name
                                })
                                i = i + (parseInt(value.type)-1);
                            }
                            else {
                                data.push({
                                    date_start: 'NULL',
                                    id_package_tour: value.id_package_tour,
                                    id_status_stop_sell: 'NULL',
                                    mulAdult: 'NULL',
                                    mulChild: 'NULL',
                                    number_of_ticket: 'NULL',
                                    oneAdult: 'NULL',
                                    oneChild: 'NULL',
                                    package_name: 'NULL',
                                    type: 'NULL',
                                    packageNameTd: value.package_name
                                })
                            }
                            if (i === listDateCompare.length-1) {
                                dataCalendar.push(data);
                            }
                        }
                    })
                    setCheckGetCalendar(true);
                    setCheckProcess(false);
                }
                else if (r_getCalendar.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Get package calendar failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    }

    const calendar = () => {
        if (listDatePeriod.length > 0 && idDataTour !== "") {
            return(
                <>
                    <div style={{ position:'relative', overflow:'auto' }}>
                        <table width="" border="1" style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <td colSpan='2' style={styleThead}>Package name</td>
                                    {listDatePeriod.map((value, index) => { 
                                        return <td style={{ fontWeight: 'bold', backgroundColor: '#BDC3C7' }} key={index}>{value}</td>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {dataCalendar.map((value, index) => {
                                    const found = value.find(ele => ele.date_start !== 'NULL');
                                    return (
                                        <>
                                        <tr>
                                            {listDateCompare.map((v, i) => {
                                                if (i >= value.length) {
                                                    return
                                                }
                                                if (i === 0) {
                                                    let count = i;
                                                    if (v === value[index].date_start) {
                                                        i = i + parseInt(value[i].type)-1;
                                                    }
                                                    return (
                                                       <>
                                                            <td key={i} colSpan='2'><Button className="float-right" color="info" onClick={() => showModalPackage(found)}>Edit</Button>{value[index].packageNameTd}</td>
                                                            {v === value[index].date_start ? <td key={count+1} colSpan={value[count].type.toString()} style={value[count].id_status_stop_sell === 1 ? null : styleTdStopSell}>{value[count].number_of_ticket}</td> : <td key={count+1} style={styleTdHaveNotData}></td>}
                                                        </>
                                                    )
                                                }
                                                if (i > 0) {
                                                    if (v === value[i].date_start) {
                                                        let count = i;
                                                        i = i + parseInt(value[i].type)-1;
                                                        return (
                                                            <>
                                                                <td key={count+1} colSpan={value[count].type.toString()} style={value[count].id_status_stop_sell === 1 ? null : styleTdStopSell}>{value[count].number_of_ticket}</td>
                                                            </>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <>
                                                                <td key={i+1} style={styleTdHaveNotData}></td>
                                                            </>
                                                        )
                                                    }
                                                }
                                            })}
                                        </tr>
                                        </>
                                    )
                                })}


                                {/* {dataCalendar.map((value, index) => {
                                    let data = '';
                                    for(let i = 0; i < listDateCompare.length; i++) {
                                        if (i === 0) {
                                            data += `
                                                <tr>
                                                <td key={${index}} colSpan='2'><button class="float-right btn btn-info" onclick="showModalPackage()" value="${value.id_package_tour}">Edit</button>${value.package_name}</td>
                                            `
                                        }
                                        if (listDateCompare[i] === value.date_start) {
                                            data += `<td key={${i}} colSpan="${value.type.toString()}">${value.number_of_ticket}</td>`
                                            i = i + (parseInt(value.type)-1);
                                        }
                                        else {
                                            data += `<td key={${i}} style="${styleTdHaveNotData}"></td>`
                                        }
                                        if (i === listDateCompare.length-1) {
                                            data += `<tr>`
                                        }
                                    }
                                    // console.log(data)
                                    return parse(data)
                                })} */}
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                </>
            )
        }
    }

    /* ----------------------------- Modal package ----------------------------- */

    const hideModalTicket = () => {
        setCheckModalTicket(false);
    }

    const submitInventory = async (e) => {
        setCheckProcess(true);
        e.preventDefault();

        try {
            const res_updatePackage = await fetch(`${API_URL}/api/backend/calendarMore/updatePackage`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackageTour: idPackageTour,
                    idStopSell: idStopSell,
                    mulAdult: mulAdult,
                    mulChild: mulChild,
                    inventory: inventory,
                    oneAdult: oneAdult,
                    oneChild: oneChild
                })
            });
            if (res_updatePackage.ok) {
                const r_updatePackage = await res_updatePackage.json();
                if (r_updatePackage.status === 1) {
                    setIdStopSell('1');
                    updateCalendar();
                    swal.fire("", "update package successfully", "success");
                }
                else if (r_updatePackage.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "update package failed", "warning");
                }
                else {
                    setCheckProcess(false);
                    swal.fire("", "Please refresh page", "error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error);
        }
    }

    const showModalPackage = (data) => {
        setCheckModalTicket(true);
        setIdPackageTour(data.id_package_tour);
        setPackageName(data.package_name);
        setMulAdult(data.mulAdult);
        setMulChild(data.mulChild);
        setInventory(data.number_of_ticket);
        setOneAdult(data.oneAdult);
        setOneChild(data.oneChild);
    }

    /* --------------------------- End Modal package --------------------------- */

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
                                    <h3 className="mb-0">Calendar</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form role="form" onSubmit={submitCalendar}>
                                        <Row style={{justifyContent: 'center'}} className="mb-4">
                                            <Col lg="4" md="9">
                                                <p style={styleP}>Tour</p>
                                                <Select 
                                                    placeholder="Select Tour" 
                                                    required
                                                    options={tourNameList} 
                                                    onChange={getValueTourList}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}} className="mb-4">
                                            <Col lg="4" md="9">
                                                <p style={styleP}>Date Start</p>
                                                <Input 
                                                    type="date"
                                                    required
                                                    value={startDate}
                                                    onChange={(e) => setStartDate(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{justifyContent: 'center'}} className="mb-4">
                                            <Col lg="4" md="9">
                                                <p style={styleP}>Date End</p>
                                                <Input 
                                                    type="date"
                                                    required
                                                    value={endDate}
                                                    onChange={(e) => setEndDate(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <Button className="mt-4 mb-4" color="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                    {checkGetCalendar? calendar() : null}
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>

                {/* Modal update package */}
                <Modal isOpen={checkModalTicket} toggle={hideModalTicket}>
                    <Form role="form" onSubmit={submitInventory}>
                        <ModalHeader 
                            toggle={hideModalTicket}>
                            {packageName}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col lg="4" md="12">
                                    Inventory update *
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                            <Input 
                                                type="number"
                                                min="0"
                                                required
                                                value={inventory}
                                                onChange={(e) => setInventory(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" className="mb-3">
                                    <p style={{fontWeight: 'bold'}}>2-3 Persons per room :</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12" style={{textAlign: 'right'}}>
                                    Price(Adult)*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="number"
                                            min="0"
                                            required
                                            value={mulAdult}
                                            onChange={(e) => setMulAdult(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12" style={{textAlign: 'right'}}>
                                    Price(Child)*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="number"
                                            min="0"
                                            required
                                            value={mulChild}
                                            onChange={(e) => setMulChild(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" className="mb-3">
                                    <p style={{fontWeight: 'bold'}}>1 Persons per room :</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12" style={{textAlign: 'right'}}>
                                    Price(Adult)*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="number"
                                            min="0"
                                            required
                                            value={oneAdult}
                                            onChange={(e) => setOneAdult(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12" style={{textAlign: 'right'}}>
                                    Price(Child)*
                                </Col>
                                <Col lg="8" md="12">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-3">
                                        <Input 
                                            type="number"
                                            min="0"
                                            required
                                            value={oneChild}
                                            onChange={(e) => setOneChild(e.target.value)}
                                        />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="4" md="12">
                                    Stop sell*
                                </Col>
                                <Col lg="8" md="12">
                                    <div onChange={(e) => setIdStopSell(e.target.value)}>
                                        <div className="form-check form-check-inline">
                                            <Input className="form-check-input" type="radio" name="stop_sell" value="2"/>
                                            <label className="form-check-label">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Input className="form-check-input" type="radio" name="stop_sell" value="1" defaultChecked={"checked"} />
                                            <label className="form-check-label">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                type="submit"
                                color="primary" 
                                onClick={hideModalTicket}>
                                Submit
                            </Button>
                            <Button 
                                color="secondary" 
                                onClick={hideModalTicket}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        );
    }
};

export default CalendarThanMoreOneAgent;
