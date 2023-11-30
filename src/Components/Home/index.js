import React, { useEffect, useState } from "react";
import SearchCourse from "../searchCourses/SearchCourse";
import AnimalCard from "../AnimalCard";
import "./index.css";
import { getAvailablePets } from "../Admin/client";
import * as profileClient from "../Profile/client";
import * as petProfileClient from "../PetProfile/client";
import * as animalCardClient from "../AnimalCard/client";
import {findPetById} from "../AnimalCard/client";
import {Link} from "react-router-dom";

function HomePage() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const [allAdoptedPets, setAllAdoptedPets] = useState([]);
    const [allAdoptedPetsLoading, setAllAdoptedPetsLoading] = useState(true);

    const [adoptedByUser, setAdoptedByUser] = useState([]);
    const [adoptedByUserLoading, setAdoptedByUserLoading] = useState(true);

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

    useEffect(() => {
        const fetchAllAdoptedPets = async () => {
            try {
                const data = await petProfileClient.getAllAdoptedPets();
                const animalDataPromises = data.map(animal => animalCardClient.findPetById(animal.petId));

                Promise.all(animalDataPromises)
                    .then(animalData => {
                        setAllAdoptedPets(animalData);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                setAllAdoptedPetsLoading(false);
            } catch (error) {
                console.error('Error fetching adopted pets:', error);
                setAllAdoptedPetsLoading(false);
            }
        };
        const fetchAdoptedByUser = async () => {
            try {
                const animalDataPromises = allAdoptedPets.filter(animal => animal.userId === user._id);

                Promise.all(animalDataPromises)
                    .then(animalData => {
                        setAdoptedByUser(animalData);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                setAdoptedByUserLoading(false);
            } catch (error) {
                console.error('Error fetching adopted pets:', error);
                setAdoptedByUserLoading(false);
            }
        };

        fetchAllAdoptedPets();
        fetchAdoptedByUser();
    }, []);


    if (userLoading) {
        return <div>Loading user...</div>;
    }

    return (
        <div className="home-container">
            <div className="home-search-content">
                {
                    !user
                    ? <SearchCourse/>
                    : <></>
                }
            </div>

            <div className="home-content">
                {user && user.role === 'ADMIN' &&
                 <div>
                     <h4 className="mt-4">Recently Added by You</h4>
                     <div className="list-group d-flex flex-row flex-wrap">
                         {/*{adoptedByUserLoading ? (*/}
                         {/*    <p>Loading...</p>*/}
                         {/*) : (*/}
                         {/*    adoptedByUser.slice(0, 4).map((animal) => (*/}
                         {/*         <AnimalCard key={animal._id} animal={animal} add={false} />*/}
                         {/*     ))*/}
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
                         {adoptedByUserLoading ? (
                             <p>Loading...</p>
                         ) : (
                             adoptedByUser.slice(0, 4).map((animal) => (
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
                    {Array.isArray(allAdoptedPets) && allAdoptedPets.length > 0 ? (
                        <div className="list-group d-flex flex-row flex-wrap">
                            {allAdoptedPetsLoading ? (
                                <p>Loading...</p>
                            ) : (
                                 allAdoptedPets.slice(0, 4).map((animal) => (
                                     <AnimalCard key={animal._id} animal={animal} add={false} />
                                 ))
                             )}
                        </div>
                    ) : (
                         <p>No animals found.</p>
                     )}
                </div>
            </div>

        </div>
    );
}

export default HomePage;
