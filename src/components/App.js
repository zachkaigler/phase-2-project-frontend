import React from "react"
import PoliticianInfo from "./PoliticianInfo";
import Politicians from "./Politicians";
import SideBar from "./SideBar";
import Watchlist from "./Watchlist";
import { Grid } from "semantic-ui-react"
import { Switch, Route } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Grid>
        <Grid.Column width={4}>
          <SideBar />
        </Grid.Column>
        <Grid.Column width={12}>
        <Switch>
          <Route exact path="/">
            <Watchlist />
          </Route>
          <Route exact path="/politicians">
            <Politicians />
          </Route>
          <Route exact path="/politicianinfo/:id">
            <PoliticianInfo />
          </Route>
        </Switch>
          </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
