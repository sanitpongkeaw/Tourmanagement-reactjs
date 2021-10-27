import React, { useEffect, useState } from "react";

import swal from 'sweetalert2';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import { API_URL } from "API_URL";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Register = () => {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openLinear, setOpenLinear] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(true);
  const [checkEmailEquel, setCheckEmailEquel] = useState(false);
  const [filesConsider, setFilesConsider] = useState([]);
  const [checkListFiles, setCheckListFiles] = useState(false);

  useEffect(() => {
    if((Boolean(localStorage.getItem('status')) && Boolean(localStorage.getItem('token'))) && (localStorage.getItem('status') !== '' && localStorage.getItem('token') !== '')) {
      if (localStorage.getItem('status') === '1729384732') {
        history.push('/admin/index');
      }
      else {
        history.push('/agent/Tours');
      }
    }
    else {
      
    }
  }, []);

  const register = async (e) => {
    e.preventDefault();
    checkEmail();

    if (password.length < 8) {
      swal.fire("", "Passwords must have : Use at least 8 characters", "warning");
    }
    else if (password !== confirmPassword) {
      swal.fire("", "Confirm Passwords not equal", "warning");
    }
    else if (checkPrivacy) {
      swal.fire("", "Please read the Privacy Policy. Click here to indicate that you have read and agree", "warning");
    }
    else if (checkListFiles) {
      swal.fire("", "Please choose flies", "warning");
    }
    else if (checkEmailEquel) {
      swal.fire("", "This email is used", "warning");
    }
    else {
      setOpenLinear(true);
      const formData = new FormData();

      formData.append("company", company);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("address", address);
      formData.append("country", country);
      formData.append("mobile", mobile);

      for (let i = 0; i < filesConsider.length; i++) {
        formData.append("filesConsider", filesConsider[i]);
      }

      try {
        let response = await fetch(`${API_URL}/api/backend/auth/register`, {
          method: "POST",
          body: formData
        })
        if(response.ok) {
          let result = await response.json();
          if(result.status === 1) {
            swal.fire("", "Register successfully", "success");
          }
          else {
            swal.fire("Register Fail!","","error");
          }
          setOpenLinear(false);
        }
      } catch (error) {
        setOpenLinear(false);
        swal.fire("", "Please refresh page", "error");
        console.log(error);
      }
    }
  }

  const checkEmail = () => {
    
    fetch(`${API_URL}/api/backend/checkEmail`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 1) {
          setCheckEmailEquel(false);
        }
        else if (response.status === 2) {
          setCheckEmailEquel(true);
          console.log(checkEmailEquel)
        }
        else {
          //fetch email equal error
        }
      })
      .catch(err => {
        console.log(err);
      }) 
  }

  const updateList = () => {
    let input = document.getElementById('fileConsider');
    let output = document.getElementById('fileList');
    let children = "";
    for (let i = 0; i < input.files.length; ++i) {
        children += '<li>' + input.files.item(i).name + ' (' + Math.ceil((input.files.item(i).size * 0.001)) + 'KB)</li>';
    }
    output.innerHTML = '<ul>'+children+'</ul>';
  }

  const clearFiles = () => {
    let output = document.getElementById("fileList");
    document.getElementById("fileConsider").value = '';
    output.innerHTML = '';
    setCheckListFiles(false);
  }

  if (openLinear) {
    return(
      <div style={{width: '100%'}}>
          <LinearProgress />
      </div>
    )
  }
  else {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <p>Create For Travel Agent</p>
              </div>
              <Form role="form" onSubmit={register}>
                <FormGroup>
                  <p className="text-muted">Company<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-shop" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Company" 
                      type="text" 
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Address<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-square-pin" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Address" 
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                     />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Country<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-pin-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Country"
                      type="text" 
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Mobile Number<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Mobile Number" 
                      type="text" 
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <small>e.g. +66080123456, for Country Code (+66)</small>
                </FormGroup>
                <hr />
                <div className="text-muted mb-4">
                  <p>Account</p>
                </div>
                <FormGroup>
                  <p className="text-muted">First Name<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="First Name" 
                      type="text" 
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Last Name<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input 
                      placeholder="Last Name" 
                      type="text" 
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Email<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <small>e.g. email@example.com</small>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Password<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Confirm Password<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <p className="text-muted">Files<span style={{color: 'red'}}> *</span></p>
                  <InputGroup className="input-group-alternative">
                    <input
                      id="fileConsider"
                      type="file"
                      multiple 
                      required 
                      accept="image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={(e) => {
                        if(e.target.files.length <= 5) {
                          setCheckListFiles(false);
                          setFilesConsider(e.target.files);
                          updateList();
                        }
                        else {
                          setCheckListFiles(true);
                          document.getElementById("fileConsider").value = '';
                          document.getElementById('fileList').innerHTML = '';
                          swal.fire("", "Maximum 5 files.", "warning");
                        }
                        }
                      }
                    />
                  </InputGroup>
                  <div className="row">
                    <div className="col-md-6">
                      <small>Maximum 5 files.</small>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end mt-1">
                      <Button 
                        color="primary" 
                        type="button"
                        onClick={clearFiles}
                      >
                        Clear Files
                      </Button>
                    </div>
                  </div>
                  <div id="fileList"></div>
                </FormGroup>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        onChange={(e) => setCheckPrivacy(!checkPrivacy)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
};

export default Register;
