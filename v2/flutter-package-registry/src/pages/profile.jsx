import { auth, db } from "../firebase-config";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

function Profile(){

    const [favoritesList, setfavoritesList] = useState([]);
    const [name, setName] = useState("");

    const packagesCollectionsRef = collection(db, "users");

    useEffect (() => {
            const name =  auth.currentUser.displayName
            setName(name)

            const getFavorites = async () => {
                const q = query(packagesCollectionsRef, where("uid", "==", auth.currentUser.uid));
                const data = await getDocs(q);
                if (!data.empty) {
                    setFavoritesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                } else {
                    setFavoritesList([]);
                }
              };
              
              if (auth.currentUser) {
                getFavorites();
              }
        }, []);

    return <div>
        <h1>Welcome {name}</h1>
        <h2>Your Favorites: </h2>
        {favoritesList.length > 0 ? (
            <ul>
            {favoritesList.map((favorite) => (
                <li key={favorite.id}>{favorite.name}</li>
            ))}
            </ul>
        ) : (
            <p>No favorites found yet.</p>
        )}
    </div>;
}

export default Profile;