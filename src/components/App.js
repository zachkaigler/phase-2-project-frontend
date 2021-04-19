import React, {useState, useEffect} from "react"
import PoliticianInfo from "./PoliticianInfo";
import PoliticianCard from "./PoliticianCard"
import Politicians from "./Politicians";
import SideBar from "./SideBar";
import Watchlist from "./Watchlist";
import { Grid } from "semantic-ui-react"
import { Switch, Route } from "react-router-dom";

function App() {
  const [politiciansArray, setPoliticiansArray] = useState([])
  const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/politicians")
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticiansArray(politicianServerData)
            })
    }, [])

    useEffect(() => {
      fetch("http://localhost:4000/politicians")
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticiansArray(politicianServerData)
            })
    }, [toggle])

    function updatedIsWatched() {
      setToggle(!toggle)
    }

    const politicianCardsArray = politiciansArray.map(function(politicianObj) {
        return <PoliticianCard 
                    key={politicianObj.id}
                    id={politicianObj.id}
                    politicianObj={politicianObj}
                    name={politicianObj.name}
                    party={politicianObj.party}
                    district={politicianObj.district}
                    image={politicianObj.image}
                    contributorsArray={politicianObj.contributors}
                    isWatched={politicianObj.isWatched}
               />
    })

    const watchedListArray = politiciansArray.filter(function(politicianObj) {
      return politicianObj.isWatched
    })

    const watchedArrayPoliticianCards = watchedListArray.map(function(politicianObj) {
      return <PoliticianCard 
                    key={politicianObj.id}
                    id={politicianObj.id}
                    politicianObj={politicianObj}
                    name={politicianObj.name}
                    party={politicianObj.party}
                    district={politicianObj.district}
                    image={politicianObj.image}
                    contributorsArray={politicianObj.contributors}
                    isWatched={politicianObj.isWatched}
               />
    })

  return (
    <div className="App">
      <Grid>
        <Grid.Column width={4}>
          <SideBar />
        </Grid.Column>
        <Grid.Column width={12}>
      {/* These will use React Router as pages */}
        <Switch>
          <Route exact path="/">
            <Watchlist watchedArrayPoliticianCards={watchedArrayPoliticianCards}/>
          </Route>
          <Route exact path="/politicians">
            <Politicians politicianCardsArray={politicianCardsArray}/>
          </Route>
          <Route exact path="/politicianinfo/:id">
            <PoliticianInfo updatedIsWatched={updatedIsWatched}/>
          </Route>
        </Switch>
          </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
