// Custom hook to fetch breed list

import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        // if no animal exists, return empty array
        if (!animal) {
            setBreedList([]);
            // else if aimimal exists, return localCache
        } else if (localCache[animal]) {
            setBreedList(localCache[animal]);
            // else request breedList if animal is not in localCache
        } else {
            requestBreedList();
        }

        async function requestBreedList() {
            setBreedList([]);
            setStatus("loading");
            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );
            const json = await res.json();
            // gives back breed in local cache OR empty array
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    }, [animal]);

    return [breedList, status];
}