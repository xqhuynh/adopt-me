import Pet from "./Pet";

const Results = ({ pets }) => {
    return (
        <div className="search">
            {/* Ternary, if no pets then show No Pets Found, otherwise render... */}
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ) : (
                pets.map((pet) => {
                    return (
                        <Pet
                            animal={pet.animal}
                            key={pet.id}
                            name={pet.name}
                            breed={pet.breed}
                            images={pet.images}
                            location={`${pet.city}, ${pet.state}`}
                            id={pet.id}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Results;