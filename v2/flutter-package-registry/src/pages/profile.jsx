import { auth, db } from "../firebase-config";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function Profile(){

    const [favoritesList, setFavoritesList] = useState([]);
    const [name, setName] = useState("");

    const usersCollectionsRef = doc(db, "users", auth.currentUser.uid);

    useEffect (() => {
            const name =  auth.currentUser.displayName
            setName(name)

            const getFavorites = async () => {
                const docSnap = await getDoc(usersCollectionsRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    if (userData.favorites) {
                    setFavoritesList(userData.favorites);
                    } else {
                    setFavoritesList([]); 
                    };
                }
            }

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