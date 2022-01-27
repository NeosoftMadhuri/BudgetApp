import React, { useRef, useState, useEffect } from 'react'
import { BsCash, BsCreditCard, BsCurrencyDollar } from 'react-icons/bs'
import { Container, Row, Col, Form, Button, Table, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import uuid from "uuid/dist/v4";
import Navs from './Navs';
import Snackbar from '@mui/material/Snackbar';

const initialExpenses = localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses"))
    : [];
const initialBudget = localStorage.getItem("state") ? JSON.parse(localStorage.getItem("state")) :0;
export default function Dashboard() {
    let a, balance = 0;
    const budget = useRef('')
    const expense = useRef('')
    const exp_amo = useRef('')
    const [errors, setError] = useState({ err_budget: '', err_exp_amo: '', err_expense: '' })
    const [state, setState] = useState(initialBudget)
    const [newbudget, setBudget] = useState('')
    const [expenses, setExpenses] = useState(initialExpenses)
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState(0)
    const [snak, setSnak] = useState({ open: false, vertical: 'top', horizontal: 'center' })
    const { vertical, horizontal, open } = snak;
    useEffect(() => {
        console.log("called")
        localStorage.setItem("budget", JSON.stringify(state));
        localStorage.setItem("expenses", JSON.stringify(expenses));

    }, [expenses, state]);


    const handler = (event) => {
        const name = event.target.name;

        switch (name) {
            case 'budget':
                const e_budget = budget.current.value.length > 2 ? '' : 'Enter minimum 3 digit';
                setError({ err_budget: e_budget })
                setBudget(event.target.value)
                break;
            case 'exp_amo':
                setAmount(event.target.value)
                break;
            case 'expense':
                setTitle(event.target.value)
                break;
            default:
                break;
        }
    }

    const addBudget = (newstate) => (event) => {
        event.preventDefault();
        // const newbudget1=newbudget;
        setState(newbudget)
        //let arr = { budget: budget.current.value }
        localStorage.setItem('data', JSON.stringify(budget.current.value))
        setSnak({ open: true, ...newstate });
        document.getElementById("budget").value = ''
    }

    const addExpense = (event) => {
        console.log(state.length)
        event.preventDefault();
        let data = localStorage.getItem('data')
        console.log(data)

        var total = expenses.reduce((acc, curr) => {
            a = acc + parseInt(curr.amount)
            return acc + parseInt(curr.amount);
        }, 0)

        console.log(parseInt(total))

        if (state.length > 0) {
            console.log(parseInt(total) > state)
            const newval=parseInt(a)+parseInt(exp_amo.current.value);
            console.log(newval)
            if (newval > state) {
                alert("Balance is not Sufficient")
            }
            else {
                const singleExpense = { id: new Date().toString(), title, amount };
                // console.log(singleExpense.title)
                setExpenses([...expenses, singleExpense]);
                document.getElementById("expense").value = ''
                document.getElementById("exp_amo").value = ''

            }

        }
        else {
            alert("please enter budget first")
        }



    }


    const update = (id, data) => {
        expense.current.value = data.title
        exp_amo.current.value = data.amount;
        setEdit(true)
        setId(id)

    }
    //Edit Record
    const editExpense = (event) => {
        event.preventDefault();
        const expenseData = expense.current.value;
        const amountData = exp_amo.current.value;
        expenses[id] = { id: id, title: expenseData, amount: amountData }
        setExpenses([...expenses])
        setEdit(false)
        document.getElementById("expense").value = '';
        document.getElementById("exp_amo").value = "";
    }
    //Delete Record
    const handleDelete = id => {
        let tempExpenses = expenses.filter(item => item.id !== id);
        setExpenses(tempExpenses);
    };

    const handleClose = () => {
        setSnak({ ...snak, open: false });
    };
    const logout = () => {
        localStorage.clear()
        setExpenses([]);
    }
    return (
        <>
            {/* <Navs /> */}
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home" style={{ color: "white" }}>Budget App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav style={{ marginLeft: "900px" }}>
                            <Link to="/"><button onClick={logout} className="bg-dark" style={{ color: "white" }}>Logout </button></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col sm={6} md={6} lg={6}>
                        <div style={{ marginTop: "40px", borderRadius: "10px 10px 10px 10px", boxShadow: "10px 10px 10px 10px #888888" }}>
                            <Row>


                                <Form style={{ padding: "30px", height: "280px" }}>
                                    <h4 style={{ textAlign: "center" }} className="mb-3">Budget</h4>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Enter Your Budget *</Form.Label>
                                        <Form.Control type="text" id="budget" name="budget" ref={budget} onChange={handler} placeholder="Enter Your Budget" size="md" className=".inputField" />
                                        <span style={{ color: 'red' }}>{errors.err_budget}</span>
                                    </Form.Group>
                                    <div style={{textAlign:"center"}}>
                                    <Button className="btn btn-primary" onClick={addBudget({ vertical: 'top', horizontal: 'center' })} type="submit">
                                        Submit
                                    </Button>
                                    </div>
                                    <Snackbar
                                        anchorOrigin={{ vertical, horizontal }}
                                        open={open}
                                        onClose={handleClose}
                                        message="Budget Added"
                                        key={vertical + horizontal}
                                    />
                                </Form>

                            </Row>
                        </div>

                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        <div style={{ marginTop: "40px", borderRadius: "10px 10px 10px 10px", boxShadow: "10px 10px 10px 10px #888888" }}>
                            <Row>


                                <Form style={{ padding: "30px", height: "280px" }}>
                                    <h4 style={{ textAlign: "center" }} className="">Expense</h4>

                                    <Form.Group className="mb-3" >
                                        <Form.Label>Enter Your Expense *</Form.Label>
                                        <Form.Control type="text" id="expense" name="expense" ref={expense} onChange={handler} placeholder="Enter Your Expense" size="md" />
                                        <span style={{ color: 'red' }}>{errors.err_expense}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Enter Your Expense Amount *</Form.Label>
                                        <Form.Control type="text" name="exp_amo" id="exp_amo" ref={exp_amo} onChange={handler} placeholder="Enter Your Expense Amount" size="md" />
                                        <span style={{ color: 'red' }}>{errors.err_exp_amo}</span>
                                    </Form.Group>
                                    {edit ?
                                        <Button className="btn btn-primary" onClick={editExpense} >
                                            Edit
                                        </Button>
                                        :
                                        <Button className="btn btn-primary" onClick={addExpense} type="submit" style={{ marginLeft: "200px" }}>
                                            Submit
                                        </Button>}
                                </Form>

                            </Row>
                        </div>

                    </Col>
                </Row>

                <hr />
                <Row style={{ marginTop: "100px" }}>
                    <Col sm={4} md={4} lg={4}>
                        <h5>Budget</h5>
                        <BsCash style={{ fontSize: "100px" }} /><br />
                        <h2>$ {state}</h2>

                    </Col>
                    <Col sm={4} md={4} lg={4}>
                        <h5>Expense</h5>
                        <BsCreditCard style={{ fontSize: "100px" }} /><br />
                        <h2 className="total">

                            $ {expenses.reduce((acc, curr) => {
                                a = acc + parseInt(curr.amount)
                                return acc + parseInt(curr.amount);
                            }, 0)}
                        </h2>
                    </Col>
                    <Col sm={4} md={4} lg={4}>
                        <h5>Balance</h5>
                        <BsCurrencyDollar style={{ fontSize: "100px" }} />

                        {/* <h1>${parseInt((state) - a)}</h1> */}
                        <h3>$ {state - expenses.reduce((acc, curr) => {
                            a = acc + parseInt(curr.amount)
                            return acc + parseInt(curr.amount);
                        }, 0)}</h3>

                    </Col>

                </Row>



                <Row style={{ marginTop: "50px" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Expense Title</th>
                                <th>Expence Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((item, index) =>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button> &nbsp;
                                        <button className="btn btn-warning text-white" onClick={() => { update(index, item) }}>Update</button>
                                    </td>
                                </tr>
                            )}


                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}
