import './SignUpForm.css';
import {Form, Button} from 'react-bootstrap';

const SignUpForm=()=>{
    return(
        <Form>
            <div className='SignUpHead'>
                <h3>Sign Up Form</h3>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='Answer'>ID를 입력해주세요.</Form.Label>
                <div className='IDInputLine'>
                    <Form.Control className='Input' type="ID" placeholder="Enter ID" />
                    <Button className='IDButton' style={{borderColor: "#353535", backgroundColor: "#353535"}}>
                        중복 확인
                    </Button>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='Answer'>Password를 입력해주세요.</Form.Label >
                <Form.Control className='Input' type="password" placeholder="Password" />
                <Form.Label className='Answer'>Password를 다시 한 번 입력해주세요.</Form.Label>
                <Form.Control className='Input' type="password" placeholder="Password" />
            </Form.Group>

            <div className='SignUpBottom'>
                <Button type="submit" href='/' className='SubmitButton'
                style={{borderColor: "#353535", backgroundColor: "#353535"}}>
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default SignUpForm;