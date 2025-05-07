function Home() {
    return (
        <div className="homePage">
            <section class="header">
                <div class="headerImage">
                    <img src="images/undraw_open-source_g069.svg" alt="Two people contributing to an open source project"/>
                </div>
                <div class="headerBox">
                    <h1>Help Preserve These Flutter Packages</h1>
                    <p>This website features a collection of popular Flutter packages that haven’t been updated in over a year.</p>
                    <p>If you’re able to contribute, please consider helping to keep these packages alive and maintained.</p>
                    <h3>Be sure to follow the contribution guidelines for each individual package.</h3>
                </div>
            </section>

            <section class="packages" id="packages">
                <div>
                    <h1>Packages</h1>
                    <p>This list features packages that have over 100,000 downloads but haven't been updated or maintained in over a year. The list is updated weekly.</p>
                    <p>Click the link on any tile to visit its official page.</p> 
                </div>           
                <ul id="package-list"></ul>
                <script src="read_data.js"></script>
            </section>

            <section class="footer">
                <img src="images/profileT.png"/>
                <h3>Created by <span>Dev Aidan H</span></h3>
                <a target="_blank" href="https://github.com/DevAidanH">
                    GitHub
                </a>
                <h3>Credit to Reddit users <span>u/AHostOfIssues</span> and <span>u/Financial_Willow4221</span> for the idea</h3>
            </section>
        </div>
    );
}

export default Home;
