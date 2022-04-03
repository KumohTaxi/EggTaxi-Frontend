import axios from 'axios';
import {Button} from 'react-bootstrap';
import './LoginForm.css';

const LoginForm =()=>{

    const L_function = () =>{
        var setId = 'asd'
        var setPw = 'asd'
        console.log("asdasd");
        axios({
            method:'post',
            url:'./start',
            data:{id:setId, password:setPw},
            headers:{
                'ContentType':'appliction/json'
            },
        })
        .then(() => {
            alert("성공");
        })
        .catch(() => {
            alert("실패");
        })
    }
  
    return(
        <div className='buttonGroup'>
            <Button className='loginbutton' type="submit"
                style={{margin: "5px", borderColor: "#515151" ,backgroundColor: "#515151"}}>
                SignUp
            </Button>
            <Button className='loginbutton' type="submit" onClick={L_function}
                style={{borderColor: "#353535", backgroundColor: "#353535"}}>
                Login
            </Button>
        </div>
    )
}

export default LoginForm;