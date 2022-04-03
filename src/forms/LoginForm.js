import {Button} from 'react-bootstrap';
import './LoginForm.css';

const LoginForm =()=>{
  
    return(
        <div className='buttonGroup'>
            <Button className='loginbutton' type="submit"
                style={{margin: "5px", borderColor: "#515151" ,backgroundColor: "#515151"}}>
                SignUp
            </Button>
            <Button className='loginbutton' type="submit"
                style={{borderColor: "#353535", backgroundColor: "#353535"}}>
                Login
            </Button>
        </div>
    )
}

export default LoginForm;