import React, { useEffect, useState } from "react";
import SearchCourse from "../searchCourses/SearchCourse";
import AnimalCard from "../AnimalCard";
import "./index.css";
import { getAvailablePets } from "../Admin/client";
import * as profileClient from "../Profile/client";

function HomePage() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await profileClient.getAccount();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setUserLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAnimals = async () => {
            // Fetch animals when the component mounts
            getAvailablePets()
                .then((data) => {
                    // Update the state with the fetched animals
                    setAnimals(data);
                    setLoading(false); // Update loading state when data is fetched
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false); // Update loading state if there's an error
                });
        };

        fetchAnimals();
    }, []);

    if (userLoading) {
        return <div>Loading user...</div>;
    }

    return (
        <div className="home-container">
            <div className="home-search-content">
                {
                    user && user.role === 'GUEST'
                    ? <SearchCourse/>
                    : <></>
                }
            </div>

            <div className="home-content">
                {user && user.role === 'ADMIN' &&
                 <div>
                     <h4 className="mt-4">Recently Added by You</h4>
                     <div className="list-group d-flex flex-row flex-wrap">
                         {loading ? (
                             <p>Loading...</p>
                         ) : (
                              animals.slice(0, 4).map((animal) => (
                                  <AnimalCard key={animal._id} animal={animal} add={false} />
                              ))
                          )}
                     </div>
                 </div>
                }
                {user && user.role === 'UPLOADER' &&
                 <div>
                     <h4 className="mt-4">Recently Uploaded by You</h4>
                     <div className="list-group d-flex flex-row flex-wrap">
                         {loading ? (
                             <p>Loading...</p>
                         ) : (
                              animals.slice(0, 4).map((animal) => (
                                  <AnimalCard key={animal._id} animal={animal} add={false} />
                              ))
                          )}
                     </div>
                 </div>
                }
                {user && user.role === 'ADOPTER' &&
                 <div>
                     <h4 className="mt-4">Recently Adopted by You</h4>
                     <div className="list-group d-flex flex-row flex-wrap">
                         {loading ? (
                             <p>Loading...</p>
                         ) : (
                              animals.slice(0, 4).map((animal) => (
                                  <AnimalCard key={animal._id} animal={animal} add={false} />
                              ))
                          )}
                     </div>
                 </div>
                }

                <h4 className="mt-4">Recently Added</h4>
                <div className="list-group d-flex flex-row flex-wrap">
                    {Array.isArray(animals) && animals.length > 0 ? (
                        <div className="list-group d-flex flex-row flex-wrap">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                 animals.slice(0, 4).map((animal) => (
                                     <AnimalCard key={animal._id} animal={animal} add={false} />
                                 ))
                             )}
                        </div>
                    ) : (
                         <p>No animals found.</p>
                     )}
                </div>

                <h4>Recently Adopted</h4>
                <div className="list-group d-flex flex-row flex-wrap">
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                    {/*<AnimalCard/>*/}
                </div>
            </div>

        </div>
    );
}

export default HomePage;
