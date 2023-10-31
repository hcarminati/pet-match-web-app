import React, { useState } from "react";
import "./index.css";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        console.log("Search term: ", searchTerm);
    };

    return (
        <div className="content content-center">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-secondary" onClick={handleSearch}>
                        Search
                    </button>
            </div>
        </div>
    );
}

export default Search;
