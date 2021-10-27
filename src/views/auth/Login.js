import React, { useEffect, useState } from "react";

import swal from 'sweetalert2';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';
import { API_URL } from '../../API_URL';
import { useHistory } from 'react-router-dom';

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

const Login = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [openLinear, setOpenLinear] = useState(false);

  const history = useHistory();

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
  
  const login = (e) => {
    e.preventDefault();
    setOpenLinear(true);
    if (email !== '' || password !== '') {
      fetch(`${API_URL}/api/backend/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(result => {
          setOpenLinear(false);
          if(result.status === 1) {
            if (result.id_status_member === 1729384732) {
              localStorage.setItem(`token`, result.token);
              localStorage.setItem(`status`, result.id_status_member);
              history.push('/admin/index');
            }
            else {
              localStorage.setItem(`token`, result.token);
              localStorage.setItem(`status`, result.id_status_member);
              history.push('/agent/Tours');
            }
          }
          else if(result.status === 2) {
            //not approved
            swal.fire("", "You can't sign in your accout. Until our team reviews the information, it will take 6-12 hours. Once confirmed, you will receive an email notification again.", "warning")
          }
          else {
            swal.fire("", "You entered an incorrect email or password", "error");
          }
        })
        .catch(err => {
          setOpenLinear(false);
          swal.fire("","Please try again","error");
          console.log(err);
        })
    }
    else {
      setOpenLinear(false);
      swal.fire("", "You entered an incorrect email or password", "error");
    }
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
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <p>Sign in</p>
              </div>
              <Form role="form" onSubmit={login}>
                <FormGroup className="mb-3">
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
                      onChange={
                        (e) => setEmail(e.target.value)
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
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
                      onChange={
                        (e) => setPassword(e.target.value)
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6"></Col>
            <Col className="text-right" xs="6">
              <Link to="/auth/register">
                <div className="text-light">
                  <small>Create new account</small>
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
};

export default Login;
