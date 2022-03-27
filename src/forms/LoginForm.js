import {Form, Button} from 'react-bootstrap';
import './LoginForm.css';

const LoginForm =()=>{
    return(
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='loginlabel'>ID</Form.Label>
                <Form.Control className='logininput' type="ID" placeholder="Enter ID" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='loginlabel'>Password</Form.Label>
                <Form.Control className='logininput' type="password" placeholder="Password" />
            </Form.Group>

            <div className='ButtonGroup'>
                <Button className='loginbutton' type="submit" href='/Main'
                style={{borderColor: "#353535", backgroundColor: "#353535"}}>
                    Login
                </Button>
                <Button className='loginbutton' type="submit" href='/SignUp'
                style={{borderColor: "#515151" ,backgroundColor: "#515151", marginRight: "5px"}}>
                    SignUp
                </Button>
            </div>
        </Form>
    )
}

export default LoginForm;