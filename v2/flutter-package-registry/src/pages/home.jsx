import { getDocs, getDoc, collection, arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import React, { useEffect, useState } from "react";

function Home() {
    const [packageList, setPackageList] = useState([]);
    const packagesCollectionsRef = collection(db, "highlights");

    useEffect(() => {
        const getPackages = async () => {
            const data = await getDocs(packagesCollectionsRef);
            setPackageList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPackages();
    }, []);

    return (
        <div className="homePage">
            <section className="hero">
                <div className="headerBox">
                    <h1>Help Preserve These Flutter Packages</h1>
                    <p>This website features a collection of popular Flutter packages that haven’t been updated in over a year.</p>
                    <p>If you’re able to contribute, please consider helping to keep these packages alive and maintained.</p>
                    <h3>Be sure to follow the contribution guidelines for each individual package.</h3>
                </div>
            </section>

            <main>
                <h3>Outdated but Popular Packages</h3>
                <p>
                    This list highlights Flutter packages that have surpassed 100,000 downloads but have not received any updates or maintenance in over a year. These packages remain widely used despite their age, often due to their usefulness, simplicity, or lack of alternatives.
                </p>
                <p>
                    While they continue to serve many developers, it's important to be cautious when relying on unmaintained packages. They may be incompatible with newer versions of Flutter or pose security risks. This list is refreshed weekly to help you stay informed and make responsible decisions when selecting dependencies for your projects.
                </p>

                <section className="highlights">
                    <h3>Highlighted Packages</h3>
                    <p>
                        Each week, a select few packages are carefully chosen to spotlight those most in need of community support. These highlights aim to draw attention to packages that are still highly valued but may be at risk of falling into obscurity without maintenance.
                    </p>
                    <section className="card-container">
                        {packageList.map((post) => (
                            <div className="card" key={post.id}>
                                <h3>{post.name}</h3>
                                <p>Issues: {post.issues}</p>
                                <a href={post.url} target="_blank" rel="noopener noreferrer">Package Page</a><br/>
                                <p className="card-last-update">Last Updated: {post.last_scraped}</p>
                            </div>
                        ))}
                    </section>
                    <p>
                        If you know of any packages that deserve to be featured, feel free to reach out and suggest them!
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Home;
