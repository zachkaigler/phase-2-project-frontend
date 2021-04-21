import PoliticianFilter from "./PoliticianFilter"
import PoliticianCard from "./PoliticianCard"
import React, {useState, useEffect} from "react"

function Politicians() {
    const [politiciansArray, setPoliticiansArray] = useState([])
    const [party, setParty] = useState("All")
    const [state, setState] = useState("All")

    useEffect(() => {
        fetch("http://localhost:4000/politicians")
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticiansArray(politicianServerData)
                setParty("All")
                setState("All")
            })
    }, [])

    function getPartyValue(newPartyValue) {
        setParty(newPartyValue)
    }
    
    function getStateValue(newStateValue) {
        setState(newStateValue)
    }

    const filteredPoliticians = politiciansArray.filter(function(politicianObj) {
        if (party === "All" && state === "All") {
            return politicianObj
        } else if (party === "All" && state !== "All") {
            return politicianObj.district.includes(state)
        } else if (party !== "All" && state === "All") {
            return politicianObj.party === party
        } else {
            return politicianObj.party === party && politicianObj.district.includes(state)
        }
    })

    const politicianCardsArray = filteredPoliticians.map(function(politicianObj) {
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
        <div className="main-page" id="politicians">
            <h1>Politicians</h1>

            <PoliticianFilter getPartyValue={getPartyValue} getStateValue={getStateValue}/>
            <ul id="politicians-ul">
                {politicianCardsArray}
            </ul>            
        </div>
    )
}

export default Politicians