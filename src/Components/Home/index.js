import React, {useEffect, useState} from "react";
import SearchCourse from "../searchCourses/SearchCourse";
import AnimalCard from "../AnimalCard";
import "./index.css";
import {getAvailablePets} from "../Admin/client";
import * as profileClient from "../Profile/client";
import * as petProfileClient from "../PetProfile/client";
import * as animalCardClient from "../AnimalCard/client";

function HomePage() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const [allAdoptedPetsMinData, setAllAdoptedPetsMinData] = useState([]);
    const [allAdoptedPets, setAllAdoptedPets] = useState([]);
    const [allAdoptedPetsLoading, setAllAdoptedPetsLoading] = useState(true);

    const [adoptedByUser, setAdoptedByUser] = useState([]);
    const [adoptedByUserLoading, setAdoptedByUserLoading] = useState(true);

    const [uploadedByUser, setUploadedByUser] = useState([]);
    const [uploadedByUserLoading, setUploadedByUserLoading] = useState(true);

    useEffect(() => {
        const fetchAnimals = async () => {
            getAvailablePets()
                .then((data) => {
                    setAnimals(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        };
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

        fetchAnimals();
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAllAdoptedPets = async () => {
            try {
                const data = await petProfileClient.getAllAdoptedPets();
                setAllAdoptedPetsMinData(data);

                const animalDataPromises = data.map(animal => animalCardClient.findPetById(animal.petId));
                const resolvedAnimalData = await Promise.all(animalDataPromises);
                const filteredData = resolvedAnimalData.filter(data => data !== null);

                setAllAdoptedPets(filteredData);
                setAllAdoptedPetsLoading(false);
            } catch (error) {
                console.error('Error fetching adopted pets:', error);
                setAllAdoptedPetsLoading(false);
            }
        };

        fetchAllAdoptedPets();
    }, [user, animals]);

    useEffect(() => {
        const fetchUploadedByUser = async () => {
            try {
                if (user && user._id) {
                    const uploadedPets = animals.filter(animal => animal.uploader === user._id);
                    setUploadedByUser(uploadedPets);
                    setUploadedByUserLoading(false);
                }
            } catch (error) {
                console.error('Error fetching uploaded pets:', error);
            }
        };
        if (user && user._id && animals.length > 0) {
            fetchUploadedByUser();
        }
    }, [user, animals]);

    useEffect(() => {
        const fetchAdoptedByUser = async () => {
            try {
                const adoptedByUser = allAdoptedPetsMinData.filter(
                    animal => animal.userId === user._id);
                const animalDataPromises = adoptedByUser.map(
                    animal => animalCardClient.findPetById(animal.petId));
                Promise.all(animalDataPromises)
                    .then(animalData => {
                        const filteredData = animalData.filter(data => data !== null);
                        setAdoptedByUser(filteredData);
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
        if (user && user._id && animals.length > 0) {
            fetchAdoptedByUser();
        }
    }, [user, allAdoptedPetsMinData]);

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
                         {uploadedByUserLoading ? (
                             <p>Loading...</p>
                         ) : (
                              uploadedByUser.slice(uploadedByUser.length - 4, uploadedByUser.length)
                                  .map((animal) => (
                                      <AnimalCard key={animal._id} animal={animal} add={false}/>
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
                             uploadedByUser.slice(-4).map((animal) => (
                                  <AnimalCard key={animal._id} animal={animal} add={false}/>
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
                              adoptedByUser.slice(-4).map((animal) => (
                                      <AnimalCard key={animal._id} animal={animal} add={false}/>
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
                                 animals.slice(-4).map((animal) => (
                                     <AnimalCard key={animal._id} animal={animal} add={false}/>
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
                                allAdoptedPets ? allAdoptedPets.slice(-4).map((animal) => (
                                     <AnimalCard key={animal._id} animal={animal} add={false}/>
                                 )) : <></>
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
