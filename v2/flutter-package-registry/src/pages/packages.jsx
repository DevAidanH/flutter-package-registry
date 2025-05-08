import { getDocs, collection, arrayUnion, setDoc, doc} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Packages(){

    const [packageList, setPackageList] = useState([]);

    const packagesCollectionsRef = collection(db, "packages");
    const usersCollectionsRef = collection(db, "users");

    useEffect (() => {
        const getPackages = async () => {
            const data = await getDocs(packagesCollectionsRef);
            setPackageList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }   
        getPackages();
    }, []);

    const addToFavoriates = async (name, issues, url) => {
        if(auth.currentUser != null){
            const docRef = doc(db, "users", auth.currentUser.uid); //Needs a check to confirm package is not alreayd in favoriates

            const packageData = { 
                name,
                issues,
                url
             };
    
             await setDoc(docRef, {
                favorites: arrayUnion(packageData)
              }, { merge: true });
            
              alert("Saved");
        }else{
            alert("You must be logged in to save packages")
        }
    }

    return <div>
        <h1>Packages Page</h1>
        {packageList.map((post) => {
                return (
                    <div className="post" key={post.id}>
                        <h3>{post.name}</h3>
                        <p>Last Updated: {post.last_scraped}</p>
                        <p>Issues: {post.issues}</p>
                        <a href={post.url} target="_blank">Link</a>
                        <button onClick={() => addToFavoriates(post.name, post.issues, post.url)}>Save as a Favoriate</button>
                    </div>
                );
            })}
    </div>;
}

export default Packages;