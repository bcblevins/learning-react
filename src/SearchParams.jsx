import { useState } from "react";

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
  const breeds = [];

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            {/* 
              Simple: the following is the react equivalent of v-for 
              Complex: map takes an array, applies a function to each element therein, and returns the 
              resulting array. In this case, we are telling map to take each element and make an 
              <option /> react component from it. React then renders each component in the array.
            */}
            <option />
            {ANIMALS.map((animal) => ( /*using ( <option... ) here instead of { return <option... }*/
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={breeds.length===0}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((breed) => ( /*using ( <option... ) here instead of { return <option... }*/
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
