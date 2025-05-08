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
    

    return <div className="profile-container">
    <h1>Hello {name}</h1>
    <h2>Favourites</h2>

    {favoritesList.length > 0 ? (
        <div className="favorites-list">
            {favoritesList.map((favorite, index) => (
                <div className="favorite-card" key={index}>
                    <div className="favorite-content">
                    <div><strong>{favorite.name}</strong> - Issues: {favorite.issues}</div>
                    <a href={favorite.url} target="_blank" rel="noopener noreferrer">Visit Package Page</a>
                    </div>
                    <button className="delete-btn" onClick={() => deleteFavoriate(favorite)}>Delete</button>
              </div>
            ))}
        </div>
    ) : (
        <p className="no-favorites">No favorites found yet.</p>
    )}
</div>
}

export default Profile;