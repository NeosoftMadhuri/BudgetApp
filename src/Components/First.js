import React from 'react'
import { Container, Row ,Button,Col} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { BrowserRouter as Router, Link ,useNavigate} from 'react-router-dom';
export default function First() {
    const navigate=useNavigate()
    const componentClicked = () => {
        console.log("facebook btn clicked")
    }
    const responseFacebook = (response) => {
        console.log(response);
        navigate("/dashboard")

    }
   
    return (
        <>
        <Container fluid style={{backgroundColor:"whitesmoke"}}>
               
               <Row>
                   <Col sm={6} md={6} lg={6} xs={6}>
                       <img src="../Image/login1.png" style={{ width: "100%",height:"600px" }} />
                   </Col>
                   <Col sm={6} md={6} lg={6} xs={6} style={{textAlign:"center",marginTop:"100px"}}>
                   <Row>
                       <h3>Budget App</h3>
                   <h4 className="my-3 mb-5">Login to countinue....</h4>
                   </Row>
                   <Row>
                       <FacebookLogin
                           appId="271943194863438"
                           autoLoad={true}
                           fields="name,picture"
                           onClick={componentClicked}
                           callback={responseFacebook}

                       />
                       <br/><br/><small>OR</small><br/><br/>
                    </Row>
                    <Row>
                        <Col sm={3} md={3} lg={3}></Col>
                        <Col sm={6} md={6} lg={6}>
                        <Button type="button"  style={{padding:"20px 50px",backgroundColor:"#000099"}} ><Link to="/login" style={{textDecoration:"none",color:"white",fontSize:"20px"}}>Login With Email</Link></Button>
                        </Col>
                        <Col sm={3} md={3} lg={3}></Col>
                    
                    </Row>
                   </Col>
               </Row>

           </Container>




        {/* <Container fluid>
                <Row>
                    <FacebookLogin
                        appId="271943194863438"
                        autoLoad={true}
                        fields="name,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}

                    />
                </Row>
                <Row>
                    <Button type="button" className="btn btn-secondary" ><Link to="/login">Login With Email</Link></Button>
                </Row>
            </Container> */}
            
        </>
    )
}
