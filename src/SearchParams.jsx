import { useState, useEffect } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // The following destructuring looks odd. useState() returns an array so we assign what it returns to
  // [var1, var2] so that we can reference those vars independently. It is equivalent to:
  // const varHook =  useState("");
  // const var1 = varHook[O];
  // const var2 = varHook[1];
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form onSubmit={e => {
        e.preventDefault();
        requestPets();
      }} >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
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
            {/* 
              Simple: the following is the react equivalent of v-for 
              Complex: map takes an array, applies a function to each element therein, and returns the 
              resulting array. In this case, we are telling map to take each element and make an 
              <option /> react component from it. React then renders each component in the array.
            */}
            <option />
            {ANIMALS.map(
              (
                animal /*using ( <option... ) here instead of { return <option... }*/
              ) => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              )
            )}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length === 0}
            value={breed}
            onChange={(e) => {setBreed(e.target.value);}}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map(
              (
                breed /*using ( <option... ) here instead of { return <option... }*/
              ) => (
                <option key={breed} value={breed} >{breed}</option>
              )
            )}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;
