import React, {useState, useEffect} from "react"
import PoliticianInfo from "./PoliticianInfo";
import PoliticianCard from "./PoliticianCard"
import Politicians from "./Politicians";
import SideBar from "./SideBar";
import Watchlist from "./Watchlist";
import { Grid } from "semantic-ui-react"
import { Switch, Route } from "react-router-dom";

function App() {
  // State variable set to mirror the current contents of the server
  const [politiciansArray, setPoliticiansArray] = useState([])
  // State variable that toggles on Watchlist button click to reload the above state
  // variable
  const [toggle, setToggle] = useState(false)

  // Initial fetch to set state of politiciansArray to match server
  useEffect(() => {
      fetch("http://localhost:4000/politicians")
          .then(resp => resp.json())
          .then(function(politicianServerData) {
              setPoliticiansArray(politicianServerData)
          })
  }, [])

  // Side effect that fires when a politician is added to the Watchlist and updates
  // the politiciansArray to match the new value
  useEffect(() => {
    fetch("http://localhost:4000/politicians")
          .then(resp => resp.json())
          .then(function(politicianServerData) {
              setPoliticiansArray(politicianServerData)
          })
  }, [toggle])

  // Callback function passed to PoliticianInfo that fires when the Watch button is clicked,
  // triggering the side effect to run and update the politiciansArray state variable
  // to match the new contents of the server
  function updatedIsWatched() {
    setToggle(!toggle)
  }

  // Generates an array of PoliticianCard components for each politician object on the server
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

  // Generates a watchedListArray by filtering out ouly the politician objects where the key
  // of isWatched is set to true.
  const watchedListArray = politiciansArray.filter(function(politicianObj) {
    return politicianObj.isWatched
  })

  // Generates PoliticianCard components for each watched politician
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
