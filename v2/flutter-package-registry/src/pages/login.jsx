import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'

function Login({setIsAuth}){

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            setIsAuth(true);
            localStorage.setItem("isAuth", true);
            navigate("/")
        })
    }   

    return <div className="login-container">
    <div className="login-card">
        <h2 className="login-title">Welcome</h2>
        <p className="login-description">Please sign in with Google to access your personal dashboard</p>
        <p className="login-note">We only use your account for secure sign-in - nothing else.</p>
        <div className="login-btn-wrapper">
            <GoogleButton className="login-btn" onClick={signInWithGoogle} />
        </div>
                    
    </div>
</div>
}

export default Login;