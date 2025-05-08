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

    return <div>
        <p>Sign in with Google</p>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>;
}

export default Login;