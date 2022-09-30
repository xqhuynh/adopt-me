import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    // Breeds list from useBreedList component
    const [breeds] = useBreedList(animal);
    // Pets state
    const [pets, setPets] = useState([])

    // Get pets on first render
    useEffect(() => {
        requestPets();
    }, []);

    // function to fetch pets api
    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await res.json();
        setPets(json.pets);
    }

    return (
        <div className="search-params">
            {/* onSubmit listen to request pets, preventDefault will prevent hot reload */}
            <form onSubmit={e => {
                e.preventDefault();
                requestPets();
            }}>
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

                {/* Drop down options for animals */}
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

                {/* Drop down options for breed */}
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

            {/* Results components and pass pets props */}
            <Results pets={pets} />;

            {/* One way data-binding. Location passed from useState 
            <div>
                Location: {location}
            </div> */}
        </div>
    );
};

export default SearchParams;