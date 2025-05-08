function Home() {
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
            </main>
        </div>
    );
}

export default Home;
