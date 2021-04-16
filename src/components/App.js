import React, {useState, useEffect} from "react"
import PoliticianInfo from "./PoliticianInfo";
import PoliticianCard from "./PoliticianCard"
import Politicians from "./Politicians";
import SideBar from "./SideBar";
import Watchlist from "./Watchlist";

function App() {
  const [politiciansArray, setPoliticiansArray] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/politicians")
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticiansArray(politicianServerData)
            })
    }, [])

    const politicianCardsArray = politiciansArray.map(function(politicianObj) {
        return <PoliticianCard 
                    key={politicianObj.id}
                    id={politicianObj.id}
                    politicianObj={politicianObj}
                    name={politicianObj.name}
                    party={politicianObj.party}
                    distric={politicianObj.district}
                    image={politicianObj.image}
                    contributorsArray={politicianObj.contributors}
                    isWatched={politicianObj.isWatched}
               />
    })

  return (
    <div className="App">
      {/* These will use React Router as pages */}
      <SideBar />
      <Politicians politicianCardsArray={politicianCardsArray}/>
      <Watchlist />
      <PoliticianInfo />
    </div>
  );
}

export default App;
