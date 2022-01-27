import React,{useRef, useState,} from 'react'
import { Container,Row,Col,Form,Button } from 'react-bootstrap'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios';
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName=RegExp(/[A-Za-z ]+/)
const User = axios.create({ baseURL: "  http://localhost:3001/User" })
export default function Register() {
    const [errors, setError] = useState({ err_fname:'',err_lname:'', err_uname:'',err_mobile:'',err_email: '', err_pass: '' ,err_cpass:''})
    const fname=useRef();
    const lname=useRef();
    const uname=useRef();
    const mobile=useRef();
    const password=useRef();
    const cpassword=useRef();
    const email=useRef();
    const navigate=useNavigate();

  const  handler=(event)=>{
        const name=event.target.name;
        switch(name){
            case 'fname':
               const e_fname=regForName.test(fname.current.value)?'Name should be  3 char long':'';
               setError({err_fname:e_fname})
                break;
            case 'email':
               const e_email=regForEmail.test(email.current.value)?'':'Email is not valid';
               setError({err_email:e_email})
                break;
            case 'lname':
               const e_lname=lname.current.value.length<3?'Name should be  3 char long':'';
               setError({err_lname:e_lname})
                break;
            case 'password':
               const e_pass=password.current.value.length<8?'Password must be 8 chanrater long':'';
               setError({err_pass:e_pass})
                break;
            case 'cpassword':
               const e_cpass=(password.current.value !== cpassword.current.value)?'Password  not match':'';
               setError({err_cpass:e_cpass})
                break;  
            case 'mobile':
                const e_mobile=mobile.current.value.length<10?'Mobile number should be 10 digit long':'';  
                setError({err_mobile:e_mobile})     
                break;
            case 'uname':
                const e_uname=uname.current.value.length<6?'uname should be 8 digit long':'';  
                setError({err_uname:e_uname})
                break;
                break;
        }
    }
  
   const addEmp=async(event)=>{
        event.preventDefault();
        let formData={id:Math.random,email:email.current.value,fname:fname.current.value,lname:lname.current.value,pass:password.current.value,uname:uname.current.value}
        await User.post("/",formData)
        alert("Registration Successful")
        navigate("/login")
        console.log(formData)
        
        }

  
    return (
        <>
        
        <Container>
                <div>
                
                    <Form onSubmit={addEmp} style={{padding:"30px",border:"1px solid black",marginTop:"50px",borderRadius:"10px 10px 10px 10px",boxShadow:"10px 10px 10px 10px #888888",boxSizing: "border-box"}}>
                        <h2 style={{textAlign:"center"}}>Registration</h2>
                        <Row>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>First Name</Form.Label>
                                     <Form.Control type="text" name="fname" onChange={handler} className="form-control" ref={fname} size="20" />
                                 <span style={{color:'red'}}>{errors.err_fname}</span>
                               </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Last Name</Form.Label>
                                     <Form.Control  type="text" name="lname" onChange={handler} ref={lname} className="form-control" size="20" />
                                     <span style={{color:'red'}}>{errors.err_lname}</span>
                               </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>User Name</Form.Label>
                                     <Form.Control type="text" name="uname" onChange={handler} ref={uname} className="form-control" size="20" />
                                     <span style={{color:'red'}}>{errors.err_uname}</span>
                               </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Mobile</Form.Label>
                                     <Form.Control  type="number" name="mobile" onChange={handler} ref={mobile} className="form-control" size="20" />
                                     <span style={{color:'red'}}>{errors.err_mobile}</span>
                               </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Password</Form.Label>
                                     <Form.Control type="password" name="password" onChange={handler} ref={password} className="form-control" size="20"/>
                                     <span style={{color:'red'}}>{errors.err_pass}</span>
                               </Form.Group>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Confirm Password</Form.Label>
                                     <Form.Control  type="password" name="cpassword" ref={cpassword} onChange={handler} className="form-control" size="20"/>
                                     <span style={{color:'red'}}>{errors.err_cpass}</span>
                               </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12} md={12} lg={12}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                     <Form.Label>Email id</Form.Label>
                                     <Form.Control type="text" name="email" onChange={handler}  ref={email}className="form-control" size="20"/>
                                     <span style={{color:'red'}}>{errors.err_email
                                     
                                     }</span>
                               </Form.Group>
                             </Col>
                        </Row>

                        <Row>
                            <Col sm={6} md={6} lg={6}>
                                <div style={{textAlign:"center"}}>
                                <Button type="submit" className="btn btn-primary mb-3">Submit</Button>
                                </div>
                            </Col>
                            <Col sm={6} md={6} lg={6}>
                                <div style={{textAlign:"center"}}>
                            <Button className="btn btn-secondary" type="submit">
                              <Link to="/login" style={{color:"white",textDecoration:"none"}}>Back</Link>
                             </Button>
                             </div>
                                   
                            </Col>
                        </Row>
                    </Form>
                </div>
                </Container>
            
        </>
    )
}
