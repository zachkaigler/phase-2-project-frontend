import React, {useState, useEffect} from "react"
import PoliticianCard from "./PoliticianCard"

function Watchlist() {
    const [politiciansArray, setPoliticiansArray] = useState([])

    useEffect(() => {
    fetch("http://localhost:4000/politicians")
        .then(resp => resp.json())
        .then(function(politicianServerData) {
            setPoliticiansArray(politicianServerData)
        })
    }, [])

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
        <div className="main-page" id="watchlist">
            <h1>Watchlist</h1>
            
            <ul id="watchlist-ul">
                {watchedArrayPoliticianCards}
            </ul>
        </div>
    )
}

export default Watchlist