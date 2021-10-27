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

const AddPackage = () => {

    const [checkProcess, setCheckProcess] = useState(true);
    const [idDataTour, setIdDataTour] = useState('');
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
    // const [test, setTest] = useState({ value: 'vanilla', label: 'Vanilla' });

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
          getToursName();
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const getToursName = async () => {
        setCheckProcess(true);
        try {
            const res_getToursName = await fetch(`${API_URL}/api/backend/package/getTourList`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res_getToursName.ok) {
                const r_getToursName = await res_getToursName.json();
                if (r_getToursName.status === 1) {
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
            const res_addPackage = await fetch(`${API_URL}/api/backend/package/addPackage`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
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
            if (res_addPackage.ok) {
                const r_addPackage = await res_addPackage.json();
                if (r_addPackage.status === 1) {
                    const success = await swal.fire("", "Add package success", "success");
                    if (success) {
                        history.goBack();
                    }
                }
                else if (r_addPackage.status === 0) {
                    swal.fire("", "Add package failed", "warning");
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
                                                        // defaultValue={test}
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

export default AddPackage;
