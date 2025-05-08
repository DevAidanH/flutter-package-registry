import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
        <p>Sign in with Google</p>
        <button className="login-button" onClick={signInWithGoogle}>
            Sign In with Google
        </button>
    </div>
</div>
}

export default Login;