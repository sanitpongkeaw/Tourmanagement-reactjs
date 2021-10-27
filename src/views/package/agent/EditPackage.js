import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { API_URL } from "API_URL";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroup,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import LinearProgress from '@material-ui/core/LinearProgress';
import swal from 'sweetalert2';
import Select from 'react-select'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// core components
import HeaderEmtry from "components/Headers/HeaderEmtry";

const EditPackage = (props) => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [idDataTour, setIdDataTour] = useState('');
    const [idPackage, setIdPackage] = useState('');
    const [tourEdit, setTourEdit] = useState([]);
    const [tourName, setTourName] = useState('');
    const [tourNameList, setTourNameList] = useState([]);
    const [packageName, setPackageName] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [minimum_person, setMinimumPerson] = useState('');
    const [numberOfTicket, setNumberOfTicket] = useState('');
    const [cutOff, setCutOff] = useState('');
    const [mulPriceAdult, setMulPriceAdult] = useState('');
    const [mulPriceChild, setMulPriceChild] = useState('');
    const [onePriceAdult, setOnePriceAdult] = useState('');
    const [onePriceChild, setOnePriceChild] = useState('');
    const [packageDetails, setPackageDetails] = useState('');
    const [checkTypeTour, setCheckTypeTour] = useState(true);

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
            setIdPackage(props.match.params.id_package);
            getTourPackage();
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const getTourPackage = async () => {
        setCheckTypeTour(true);
        try {
            const res_getTourPackage = await fetch(`${API_URL}/api/backend/package/getTourPackage/${props.match.params.id_package}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getTourPackage.ok) {
                const r_getTourPackage = await res_getTourPackage.json();
                if (r_getTourPackage.tourListEdit[0].type === '1' || r_getTourPackage.tourListEdit[0].type === 'Half') {
                    setCheckTypeTour(false);
                }
                else {
                    setDateStart(r_getTourPackage.package[0].date_start);
                    setDateEnd(r_getTourPackage.package[0].date_end);
                    setMinimumPerson(r_getTourPackage.package[0].minimum_person);
                    setNumberOfTicket(r_getTourPackage.package[0].number_of_ticket);
                    setCutOff(r_getTourPackage.package[0].cut_off);
                    setMulPriceAdult(r_getTourPackage.package[0].mulPriceAdult);
                    setMulPriceChild(r_getTourPackage.package[0].mulPriceChild);
                    setOnePriceAdult(r_getTourPackage.package[0].onePriceAdult);
                    setOnePriceChild(r_getTourPackage.package[0].onePriceChild);
                }
                if (r_getTourPackage.status === 1) {
                    setIdDataTour(r_getTourPackage.tourListEdit[0].id_data_tour);
                    setTourName(r_getTourPackage.tourListEdit[0].tour_name);
                    tourEdit.push({
                        value: r_getTourPackage.tourListEdit[0].id_data_tour, 
                        label: r_getTourPackage.tourListEdit[0].tour_name,
                        type: r_getTourPackage.tourListEdit[0].type
                    });
                    for (const data of r_getTourPackage.tour) {
                        tourNameList.push({
                            value: data.id_data_tour, 
                            label: data.tour_name,
                            type: data.type
                        });
                    }
                    setPackageName(r_getTourPackage.package[0].package_name);
                    setPackageDetails(r_getTourPackage.package[0].package_detail);
                    setCheckProcess(false);
                }
                else if (r_getTourPackage.status === 0) {
                    setCheckProcess(false);
                    swal.fire("", "Get tour list edit failed", "warning");
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

    const getValueTourList = (data) => {
        setIdDataTour(data.value);
        setTourName(data.label);
        if(data.type === '1' || data.type === 'Half') {
            setCheckTypeTour(false);
        }
        else {
            setCheckTypeTour(true);
        }
    };

    const getPackageDetails = (val) => {
        setPackageDetails(val);
    }

    const submitPackage = async (e) => { 
        e.preventDefault();

        try {
            const res_updatePackage = await fetch(`${API_URL}/api/backend/package/updatePackage`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    idPackage: idPackage,
                    id_data_tour: idDataTour,
                    tourName: tourName,
                    packageName: packageName,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    minimum_person: minimum_person,
                    numberOfTicket: numberOfTicket,
                    cutOff: cutOff,
                    mulPriceAdult: mulPriceAdult,
                    mulPriceChild: mulPriceChild,
                    onePriceAdult: onePriceAdult,
                    onePriceChild: onePriceChild,
                    packageDetails: packageDetails
                })
            });
            if (res_updatePackage.ok) {
                const r_updatePackage = await res_updatePackage.json();
                if (r_updatePackage.status === 1) {
                    getTourPackage();
                    swal.fire("", "Update package success", "success");
                }
                else if (r_updatePackage.status === 0) {
                    swal.fire("", "Update package failed", "warning");
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
                                    <h3 className="mb-0">Add Package Details</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form role="form" onSubmit={submitPackage}>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Tour Name<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <Select 
                                                        style={{width: '100%'}} 
                                                        defaultValue={tourEdit[0]}
                                                        options={tourNameList} 
                                                        onChange={getValueTourList}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Package Name<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            placeholder="Package Name" 
                                                            type="text"
                                                            required
                                                            value={packageName}
                                                            onChange={(e) => setPackageName(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {
                                        checkTypeTour?
                                        <div>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Date Start<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            type="date"
                                                            required
                                                            value={dateStart}
                                                            onChange={(e) => setDateStart(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Date End<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input 
                                                            type="date"
                                                            required
                                                            value={dateEnd}
                                                            onChange={(e) => setDateEnd(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Minimum Person<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input  
                                                            type="number"
                                                            required
                                                            value={minimum_person}
                                                            onChange={(e) => setMinimumPerson(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Number Of Ticket<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input  
                                                            type="number"
                                                            required
                                                            value={numberOfTicket}
                                                            onChange={(e) => setNumberOfTicket(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Cut Off<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input  
                                                            type="number"
                                                            required
                                                            value={cutOff}
                                                            onChange={(e) => setCutOff(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>
                                                <p>2-3 Person Per Room</p>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Price (Adult)<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input  
                                                            type="number"
                                                            required
                                                            value={mulPriceAdult}
                                                            onChange={(e) => setMulPriceAdult(e.target.value)} 
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Price (Child)<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input  
                                                            type="number"
                                                            required
                                                            value={mulPriceChild}
                                                            onChange={(e) => setMulPriceChild(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                            <Col>
                                                <p>1 Person Per Room</p>
                                            </Col>
                                        </Row>
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Price (Adult)<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input  
                                                            type="number"
                                                            required
                                                            value={onePriceAdult}
                                                            onChange={(e) => setOnePriceAdult(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Price (Child)<span style={{color: 'red'}}> * </span>:</p>
                                            </Col>
                                            <Col lg="4" md="12">
                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <Input  
                                                            type="number"
                                                            required
                                                            value={onePriceChild}
                                                            onChange={(e) => setOnePriceChild(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <hr />
                                        </div>
                                        : null
                                        }
                                        <Row style={{alignItems: 'center'}}>
                                            <Col lg="2" md="12">
                                                <p className="text-muted">Package Detail :</p>
                                            </Col>
                                            <Col lg="10" md="12">
                                                <FormGroup>
                                                    <ReactQuill 
                                                        value={packageDetails}
                                                        onChange={getPackageDetails} 
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                        <Col className="text-center">
                                            <Button className="mt-4" color="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
};

export default EditPackage;
