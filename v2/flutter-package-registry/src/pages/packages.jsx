import { getDocs, getDoc, collection, arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import React, { useEffect, useState } from "react";

function Packages() {
    const [packageList, setPackageList] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);

    const packagesCollectionsRef = collection(db, "packages");
    const usersCollectionsRef = collection(db, "users");

    useEffect(() => {
        // Fetch packages and set the package list
        const getPackages = async () => {
            const data = await getDocs(packagesCollectionsRef);
            setPackageList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPackages();

        // Fetch the current user's favorites list
        const getUserFavorites = async () => {
            if (auth.currentUser) {
                const docRef = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserFavorites(userData.favorites || []);
                }
            }
        };
        getUserFavorites();
    }, []);

    // Function to check if the package is in the user's favorites
    const isPackageInFavorites = (name, issues, url) => {
        return userFavorites.some(
            (favorite) => favorite.name === name && favorite.issues === issues && favorite.url === url
        );
    };

    const toggleFavorite = async (name, issues, url) => {
        if (auth.currentUser != null) {
            const docRef = doc(db, "users", auth.currentUser.uid); // Reference to user's document

            const packageData = { 
                name,
                issues,
                url
            };

            // Check if the package is already a favorite
            if (isPackageInFavorites(name, issues, url)) {
                // If it's a favorite, remove it from favorites
                await updateDoc(docRef, {
                    favorites: arrayRemove(packageData)
                });
            } else {
                // If it's not a favorite, add it to favorites
                await updateDoc(docRef, {
                    favorites: arrayUnion(packageData)
                });
            }

            // Refresh the user's favorites list after adding/removing
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserFavorites(userData.favorites || []);
            }
        } else {
            alert("You must be logged in to save packages");
        }
    };

    return (
        <div>
            <h1>Packages Page</h1>
            {packageList.map((post) => {
                const isFavorite = isPackageInFavorites(post.name, post.issues, post.url); // Check if the current package is a favorite
                return (
                    <div className="post" key={post.id}>
                        <h3>{post.name}</h3>
                        <p>Last Updated: {post.last_scraped}</p>
                        <p>Issues: {post.issues}</p>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">Link</a>
                        <button onClick={() => toggleFavorite(post.name, post.issues, post.url)}>
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default Packages;
