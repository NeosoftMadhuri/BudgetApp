import React, { useRef, useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';

import GoogleLogin from 'react-google-login'
import axios from 'axios';
const User = axios.create({ baseURL: "  http://localhost:3001/User" })
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export default function Login() {
    const navigate = useNavigate();
    const [errors, setError] = useState({ err_email: '', err_pass: '' })
    const [state, setState] = useState({ Userdata: [] })
    const [snak, setSnak] = useState({ open: false, vertical: 'top', horizontal: 'center' })
    const email = useRef('')
    const password = useRef('')
    const { vertical, horizontal, open } = snak;
    //Load Server Data
    useEffect(async () => {
        const res = await User.get();
        setState({ userData: res.data })


    }, [])

    //validation Email & Password
    const handler = (event) => {
        const name = event.target.name;

        switch (name) {
            case 'email':
                const e_email = regForEmail.test(email.current.value) ? '' : 'Email-id is not valid';
                setError({ err_email: e_email })
                break;
            case 'password':
                const e_pass = password.current.value.length < 8 ? 'Password should be 8 char long' : '';
                setError({ err_pass: e_pass })
            default:
                break;
        }
    }

    const adduser = (newstate) => (event) => {
        event.preventDefault();


        {
            state.userData.map(pro => {
                var mail = pro.email;
                if (email.current.value == pro.email) {

                    if (password.current.value == pro.pass) {

                        setSnak({ open: true, ...newstate });
                        console.log(snak.open)
                        alert("Login Successfuly")
                        navigate('/dashboard');

                    }
                    else {
                        alert("Incorrect Password")
                        document.getElementById("email").value = "";
                        document.getElementById("pass").value = "";
                    }
                }
            })
        }
    }

    const handleClose = () => {
        setSnak({ ...snak, open: false });
    };
    return (

        <>

            <Container fluid >
                <Container >
                    <div style={{ marginTop: "40px", borderRadius: "10px 10px 10px 10px", boxShadow: "10px 10px 10px 10px #888888" }}>
                        <Row>
                            <Col sm={5} md={5} lg={5} style={{}}>
                                <Image src="Image/login.jpg" className="img-fluid" style={{ width: "500px", height: "500px" }} />
                            </Col>
                            <Col sm={7} md={7} lg={7} style={{}}>
                                <Form style={{ padding: "30px", height: "300px" }}>
                                    <h4 style={{ textAlign: "center" }}>Login</h4>
                                    <hr style={{ border: "1px solid red" }} />
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Email address*</Form.Label>
                                        <Form.Control type="text" name="email" id="email" ref={email} onChange={handler} placeholder="Enter email id" size="md" />
                                        <span style={{ color: 'red' }}>{errors.err_email}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Password*</Form.Label>
                                        <Form.Control type="password" name="password" id="pass" onChange={handler} ref={password} placeholder="Enter password" />
                                        <span style={{ color: 'red' }}>{errors.err_pass}</span>
                                    </Form.Group>
                                    <Row>
                                        <Col sm={6} md={6} lg={6}>
                                            <div style={{textAlign:"center"}}>
                                            <Button className="btn btn-primary" onClick={adduser({
                                                vertical: 'top',
                                                horizontal: 'center'
                                            })} type="submit">
                                                Submit
                                            </Button>
                                            </div>
                                            <Snackbar
                                                anchorOrigin={{ vertical, horizontal }}
                                                open={open}
                                                autoHideDuration={6000}
                                                onClose={handleClose}
                                                message="Login Successfully"
                                                key={vertical + horizontal}
                                            />
                                        </Col>
                                        <Col sm={6} md={6} lg={6}>
                                            <div style={{textAlign:"center"}}>
                                            <Button className="btn btn-secondary" type="submit">
                                                <Link to="/" style={{ color: "white", textDecoration: "none" }}>Back</Link>
                                            </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                                <hr />
                                <h6>Dont have a Account? <Link to="/register" >Register</Link></h6>
                                <Row>

                                </Row>

                            </Col>

                        </Row>



                    </div>

                </Container>
            </Container>
        </>
    )
}
