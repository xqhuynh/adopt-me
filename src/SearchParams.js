import { useState, useEffect } from "react";
import Pet from "./Pet";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    // Set empty array for breeds
    const breeds = [];
    // Pets state
    const [pets, setPets] = useState([])

    useEffect(() => {
        requestPets();
    }, []);

    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    {/* Controlled input, onChange is in input tag. Uncontrolled is if onSubmit is in form tag */}
                    <input
                        id="location"
                        value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>

                {/* Drop down options */}
                <label htmlFor="animal">
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                    >
                        {/* Optional but allows the first selection to be empty */}
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Breed  */}
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        onBlur={(e) => setBreed(e.target.value)}
                    >
                        {/* Optional but allows the first selection to be empty */}
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>

                <button>Submit</button>
            </form>

            {/* One way data-binding. Location passed from useState 
            <div>
                Location: {location}
            </div> */}
        </div>
    );
};

export default SearchParams;