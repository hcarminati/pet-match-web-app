import React from "react";
import "./index.css";
import {Link} from "react-router-dom";

function Quiz() {
    return (
        <div className="content content-center">
            <div className="col-11 col-sm-12">
                <p className="header-logo-quiz content-center mb-3">
                    Pet
                    <span className="header-logo-quiz-highlight">Match</span>
                    &nbsp;Quiz
                </p>
                <form className="pet-match-quiz mx-auto">
                    <div className="form-group">
                        <label htmlFor="pet-match-quiz-living-situation" className="form-label">
                            What is your living situation?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="APARTMENT">Apartment</option>
                            <option value="HOUSEWYARD">House with a yard</option>
                            <option value="CONDOTOWNHOUSE">Condo or townhouse</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="pet-match-quiz-dedicate-time" className="form-label">
                            How much time can you dedicate to exercise and playtime with your pet
                            each day?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="LESS30MIN">Less than 30 minutes</option>
                            <option value="30MIN1HR">30 minutes to 1 hour</option>
                            <option value="MORE1HR">More than 1 hour</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label">
                            What size of pet are you looking for?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label">
                            Are you comfortable with grooming and maintenance tasks for your pet?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="YESENJOYGROOMING">Yes, I enjoy grooming my pet</option>
                            <option value="BASICGROOMING">I'm okay with basic grooming</option>
                            <option value="LOWMAINTENANCE">I prefer low-maintenance pets</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label">
                            How would you describe your energy level?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="RELAXED">Low energy, prefer a relaxed pet</option>
                            <option value="MODERATEENERGY">Moderate energy, can keep up with an
                                active pet
                            </option>
                            <option value="HIGHENERGY">High energy, looking for an active
                                companion
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label">
                            Are you looking for a specific breed, or are you open to adopting a
                            mixed-breed or rescue pet?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="SPECIFICBREED">I want a specific breed</option>
                            <option value="ANYBREED">I'm open to any breed or mix</option>
                            <option value="RESCUE">I prefer to adopt a rescue or mixed-breed pet
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label">
                            Do you have children in your household?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="YESYOUNG">Yes, young children</option>
                            <option value="YESOLDER">Yes, older children</option>
                            <option value="NO">No children</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label">
                            Are you willing to invest in training and behavior classes if needed?
                        </label>
                        <select className="publish-all-select form-select float-end mb-2 ms-1">
                            <option value="">Select an option</option>
                            <option value="YES">Yes, I'm committed to proper training</option>
                            <option value="OPEN">I'm open to it if necessary</option>
                            <option value="NO">No, I want a pet with minimal training needs</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="text-fields-assignment-name" className="form-label">
                            What is your primary reason for adopting a pet?
                        </label>
                        <select className="publish-all-select form-select">
                            <option value="">Select an option</option>
                            <option value="COMPANIONSHIP">Companionship</option>
                            <option value="EXERCISEOUTDOOR">Exercise and outdoor activities</option>
                            <option value="EMOTIONALSUPPORT">Emotional support</option>
                        </select>
                    </div>
                </form>
                <hr/>

                <div id="footer">
                    <div className="float-end mb-2">
                        <Link to={`/Home`}
                              className="btn btn-secondary mt-2">
                            Cancel
                        </Link>

                        <Link to={`/SearchResults`}>
                            <button
                                className="btn btn-danger ms-2 mt-2"
                            >
                                Save
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
