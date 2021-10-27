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
import swal from 'sweetalert2';
// core components
import HeaderEmtry from "components/Headers/HeaderEmtry";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import preview_img from '../../../assets/img/brand/PreviewImage.png';

const AddTour = () => {

    const [tourName, setTourName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [type, setType] = useState('');
    const [star, setStar] = useState('');
    const [email, setEmail] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [photo, setPhoto] = useState([]);
    const [destinationMP1, setDestinationMP1] = useState('');
    const [detailMP1, setDetailMP1] = useState('');
    const [photoMP1, setPhotoMP1] = useState([]);
    const [destinationMP2, setDestinationMP2] = useState('');
    const [detailMP2, setDetailMP2] = useState('');
    const [photoMP2, setPhotoMP2] = useState([]);
    const [highlight, setHighlight] = useState('');
    const [content, setContent] = useState('');
    const [includes, setIncludes] = useState('');
    const [excludes, setExcludes] = useState('');
    const [youNeedToKnow, setYouNeedToKnow] = useState('');
    const [howToTravel, setHowToTravel] = useState('');
    const [cancellationPolicy, setCancellationPolicy] = useState('');

    const history = useHistory();

    useEffect(() => {
        if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
          
        }
        else {
          history.push('/auth/login');
        }
    }, [])

    const showPreviewAndSet = (ele) => {
        var input = ele.target;
        setPreviewImage(input.files[0]);
        var reader = new FileReader();
        if(typeof input.files[0] !== 'undefined'){
            reader.onload = function(){
                var dataURL = reader.result;
                var output = document.getElementById('img_preview');
                output.src = dataURL;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const getHighlight = (val) => {
        setHighlight(val);
    }

    const getContent = (val) => {
        setContent(val);
    }

    const getIncludes = (val) => {
        setIncludes(val);
    }

    const getExcludes = (val) => {
        setExcludes(val);
    }

    const getYouNeedToKnow = (val) => {
        setYouNeedToKnow(val);
    }

    const getHowtoTravel = (val) => {
        setHowToTravel(val);
    }

    const getCancellationPolicy = (val) => {
        setCancellationPolicy(val);
    }

    const submitTour = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        for(let i = 0; i < photo.length; i++) {
            formData.append("photos", photo[i]);
        }

        for(let i = 0; i < photoMP1.length; i++) {
            formData.append("photosMP1", photoMP1[i]);
        }

        for(let i = 0; i < photoMP2.length; i++) {
            formData.append("photosMP2", photoMP2[i]);
        }

        formData.append("tourName", tourName);
        formData.append("address", address);
        formData.append("contact", contact);
        formData.append("type", type);
        formData.append("star", star);
        formData.append("email", email);
        formData.append("previewImage", previewImage);
        formData.append("destinationMP1", destinationMP1);
        formData.append("detailMP1", detailMP1);
        formData.append("destinationMP2", destinationMP2);
        formData.append("detailMP2", detailMP2);
        formData.append("highlight", highlight);
        formData.append("content", content);
        formData.append("includes", includes);
        formData.append("excludes", excludes);
        formData.append("youNeedToKnow", youNeedToKnow);
        formData.append("howToTravel", howToTravel);
        formData.append("cancellationPolicy", cancellationPolicy);
        formData.append("id_status_member", localStorage.getItem('status'));

        try {
            const res_addTour = await fetch(`${API_URL}/api/backend/addTour`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
            if(res_addTour.ok) {
                const r_addTour = await res_addTour.json();
                if (r_addTour.status === 1) {
                    swal.fire("", "Insert tour successfully", "success");
                    history.goBack();
                }
                else if (r_addTour.status === 2){
                    swal.fire("", "Insert tour failed", "error");
                }
                else {
                    swal.fire("","Your status is wrong","error");
                    localStorage.clear();
                    history.push('/auth/login');
                }
            }
        } catch (error) {
            swal.fire("","Please try again","warning");
            localStorage.clear();
            history.push('/auth/login');
            console.log(error)
        }
    }
  
    return (
        <>
            <HeaderEmtry />
            {/* Page content */}
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Add Tour Details</h3>
                            </CardHeader>
                            <CardBody>
                                <Form role="form" onSubmit={submitTour}>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Tour Name<span style={{color: 'red'}}> * </span>:</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Tour Name" 
                                                        type="text"
                                                        required
                                                        onChange={(e) => setTourName(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Address<span style={{color: 'red'}}> * </span>:</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Address" 
                                                        type="text"
                                                        required
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Contact<span style={{color: 'red'}}> * </span>:</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Contact Number" 
                                                        type="text"
                                                        required
                                                        onChange={(e) => setContact(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Type<span style={{color: 'red'}}> * </span>:</p>
                                        </Col>
                                        <Col lg="3" md="6" xs="6">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <select 
                                                        className="form-control" 
                                                        required
                                                        onChange={(e) => (setType(e.target.value))}
                                                    >
                                                        <option value="">Day</option>
                                                        <option value="Half">Half</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col lg="2" md="6" xs="6">
                                            <p className="text-muted">Day Tour</p>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Star<span style={{color: 'red'}}> * </span>:</p>
                                        </Col>
                                        <Col lg="3" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <select 
                                                        className="form-control" 
                                                        required
                                                        onChange={(e) => setStar(e.target.value)}
                                                    >
                                                        <option value="">Star</option>
                                                        <option value="1">1</option>
                                                        <option value="1.5">1.5</option>
                                                        <option value="2">2</option>
                                                        <option value="2.5">2.5</option>
                                                        <option value="3">3</option>
                                                        <option value="3.5">3.5</option>
                                                        <option value="4">4</option>
                                                        <option value="4.5">4.5</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Email<span style={{color: 'red'}}> * </span>:</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Email" 
                                                        type="email"
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Preview Image<span style={{color: 'red'}}>* </span>:</p>
                                        </Col>
                                        <Col lg="6" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        type="file"
                                                        required
                                                        accept="image/jpeg, image/png"
                                                        onChange={(e) => showPreviewAndSet(e)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {
                                    previewImage !== '' ? 
                                    <Row>
                                        <Col lg="2" md="12"></Col>
                                        <Col md="3">
                                            <FormGroup>
                                                <img 
                                                    id="img_preview" 
                                                    src={preview_img}
                                                    style={{width:"100%",height:"150px"}}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    : null
                                    }
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Photos<span style={{color: 'red'}}>* </span>:</p>
                                        </Col>
                                        <Col lg="6" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        id="photo"
                                                        type="file"
                                                        accept="image/jpeg, image/png"
                                                        multiple
                                                        required
                                                        onChange={(e) =>{
                                                            if(e.target.files.length <= 20) {
                                                                setPhoto(e.target.files);
                                                            }
                                                            else {
                                                                document.getElementById('photo').value = '';
                                                                swal.fire("", "Limit 20 photos", "warning");
                                                            }
                                                        }}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col>
                                            <p>Meeting Point 1</p>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Destination :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Destination Meeting Point 1" 
                                                        type="text"
                                                        onChange={(e) => setDestinationMP1(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Detail :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Detail Meeting Point 1" 
                                                        type="text"
                                                        onChange={(e) => setDetailMP1(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Photos :</p>
                                        </Col>
                                        <Col lg="6" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        id="photoMP1"
                                                        type="file"
                                                        accept="image/jpeg, image/png"
                                                        multiple
                                                        onChange={(e) => {
                                                            if(e.target.files.length <= 20) {
                                                                setPhotoMP1(e.target.files);
                                                            }
                                                            else {
                                                                document.getElementById("photoMP1").value = '';
                                                                swal.fire("", "Limit 20 photos", "warning");
                                                            }
                                                        }}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col>
                                            <p>Meeting Point 2</p>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Destination :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Destination Meeting Point 2" 
                                                        type="text"
                                                        onChange={(e) => setDestinationMP2(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Detail :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        placeholder="Detail Meeting Point 2" 
                                                        type="text"
                                                        onChange={(e) => setDetailMP2(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Photos :</p>
                                        </Col>
                                        <Col lg="6" md="12">
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative mb-3">
                                                    <Input 
                                                        id="photoMP2"
                                                        type="file"
                                                        accept="image/jpeg, image/png"
                                                        multiple
                                                        onChange={(e) => {
                                                            if(e.target.files.length <= 20) {
                                                                setPhotoMP2(e.target.files);
                                                            }
                                                            else {
                                                                document.getElementById("photoMP2").value = '';
                                                                swal.fire("", "Limit 20 photos", "warning");
                                                            }
                                                        }}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Highlight :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <ReactQuill onChange={getHighlight} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Content :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <ReactQuill onChange={getContent} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Includes :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <ReactQuill onChange={getIncludes} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Excludes :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <ReactQuill onChange={getExcludes} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">You Need To Know :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <ReactQuill onChange={getYouNeedToKnow} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">How To Travel :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <ReactQuill onChange={getHowtoTravel} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row style={{alignItems: 'center'}}>
                                        <Col lg="2" md="12">
                                            <p className="text-muted">Cancellation Policy :</p>
                                        </Col>
                                        <Col lg="10" md="12">
                                            <FormGroup>
                                                <ReactQuill onChange={getCancellationPolicy} />
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
};

export default AddTour;
