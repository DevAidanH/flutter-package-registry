import { auth } from "../firebase-config";
import React, { useEffect, useState } from "react";

function Profile(){

    const [name, setName] = useState("");

    useEffect (() => {
            const name =  auth.currentUser.displayName
            setName(name)
        }, []);

    return <div>
        <h1>Welcome {name}</h1>
    </div>;
}

export default Profile;