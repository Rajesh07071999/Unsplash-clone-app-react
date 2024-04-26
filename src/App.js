import { useState } from "react";
import "./App.css";
import { MagnifyingGlass } from "react-loader-spinner";
import debounce from "lodash.debounce";
function App() {
  const [searchData, setSearchData] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false); // Initially set to false

  const fetchUserSearchImage = () => {
    setIsLoading(true); // Set isLoading to true when fetching data
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=JaB8wqer4327UqH7oKTwreywreyYvQsd85fddfmDB4343dfAv4fy1QyvWpZlOtrrtyeOJR44jeioKHsdf&query=${searchData}&orientation=squarish&per_page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResult(data.results);
        console.log(data)
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          setIsLoading(false);
        }, 3000);
      });
  };

  const debouncedFetch = debounce(fetchUserSearchImage, 500);

  return (
    <div className="App">
      <div className="search-input">
        <input
          placeholder="Search"
          type="text"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button
          className="waves-effect waves-light btn"
          onClick={fetchUserSearchImage} // Moved onClick to button instead of icon
        >
          <i className="material-icons prefix">search</i> button
        </button>
        <input
          type="number"
          placeholder="Select per page image"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          style={{ marginLeft: "40px" }}
        />
      </div>
      <div className="search-result-data">
        {isLoading ? (
          <div className="loading-spinner">
            <MagnifyingGlass
              visible={true}
              height="600" width="100"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
        ) : (
          result.map((item) => (
            <img
              className="item"
              key={item.id}
              src={item.urls.regular}
              alt="search-img"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;


// ??Add your spash client id to get all images result/
