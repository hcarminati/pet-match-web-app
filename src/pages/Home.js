import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import SearchCourse from "../Components/searchCourses/SearchCourse";
import './Home.css';
import Button from "../components/common/Button";

import { scrapeNEU } from '../services/parser/neuCourseScraper';

async function main() {
    try {
        const result = await scrapeNEU();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

function Home() {
    main().then(r => console.log(r));

    return (
        <div className="home-container">
            <Header/>
            <div className="home-search-content">
                <SearchCourse/>
            </div>

            <div className="home-sign-up-call">
                <div className="home-sign-up-call-content">
                    <h3>Ready to share your course load experience and help others?</h3>
                    <p>Sign up now and submit your semester's course load rating to help
                        future students plan their schedules more effectively.</p>
                    <Button linkTo="" nameClass="basic-button pink-hover home-sign-up"
                            text="Sign Up"/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
