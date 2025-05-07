import { getDocs, collection} from "firebase/firestore";
import { db } from "../firebase-config";
import React, { useEffect, useState } from "react";

function Packages(){

    const [packageList, setPackageList] = useState([]);

    const packagesCollectionsRef = collection(db, "packages");

    useEffect (() => {
        const getPackages = async () => {
            const data = await getDocs(packagesCollectionsRef);
            setPackageList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }   
        getPackages();
    }, []);

    return <div>
        <h1>Packages Page</h1>
        {packageList.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <h3>{post.name}</h3>
                    </div>
                );
            })}
    </div>;
}

export default Packages;