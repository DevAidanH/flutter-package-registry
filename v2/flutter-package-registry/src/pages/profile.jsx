import { auth, db } from "../firebase-config";
import React, { useEffect, useState } from "react";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";

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

    const deleteFavoriate = async (name) => {
        await updateDoc(usersCollectionsRef, {
            favorites: arrayRemove(name)
        });

        setFavoritesList(favoritesList.filter((fav) => fav !== name));
    }
    

    return <div>
        <h1>User: {name}</h1>
        <h2>Your Favorites: </h2>
        {favoritesList.length > 0 ? (
            <div>
                {favoritesList.map((favorite) => (
                    <div key={favorite.id}>
                        <div>{favorite.name} - Issues: {favorite.issues} - <a href={favorite.url} target="_blank">Link</a> <button onClick={() => deleteFavoriate(favorite)}>Delete</button></div> 
                    </div>
                ))}
            </div>
        ) : (
            <p>No favorites found yet.</p>
        )}
    </div>;
}

export default Profile;