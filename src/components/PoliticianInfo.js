import CommentSection from "./CommentSection";
import ContributorCard from "./ContributorCard";
import ContributorFilter from "./ContributorFilter";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function PoliticianInfo( {updatedIsWatched} ) {
    const [politicianData, setPoliticianData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [isWatched, setIsWatched] = useState(politicianData.isWatched)
    const params = useParams()

    // Sets in state the politician data corresponding to the page we are on in
    // url/politicianinfo. Also triggers the DOM to render the necessary elements when the page is loaded.
    // Finally, updates the value of isWatched to match the value of that politician on the server.
    useEffect(() => {
        fetch(`http://localhost:4000/politicians/${params.id}`)
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticianData(politicianServerData)
                setIsLoaded(true)
                setIsWatched(politicianServerData.isWatched)
            })
    }, [params.id])

    // Makes a PATCH request to the server when isWatched is updated, and updates the value to match
    useEffect(() => {
        fetch(`http://localhost:4000/politicians/${params.id}`, {
            method: "PATCH",
            headers: {
            "content-type": "application/json"
            },
            body: JSON.stringify({
                    isWatched: isWatched
            })
        })
        .then(resp => resp.json())
        .then(function(updatedPoliticianObj) {
        setPoliticianData(updatedPoliticianObj)
        })
    }, [params.id, isWatched])

    // Passed down from App - fires when isWatched is changed and flips the toggle
    // state variable above to tell the politiciansArray state variable to update
    function handleClick() {
        setIsWatched(!isWatched)
        updatedIsWatched()
    }

    // If the page is loaded, we map and create an array of ContributorCard components for each
    // contributor in the politician's database. Otherwise it is just an empty array.
    let contributorCardArray
    if (isLoaded) {
        contributorCardArray = politicianData.contributors.map(function(contributorObj) {
            return <ContributorCard 
                    key={contributorObj.orgName}
                    orgName={contributorObj.orgName}
                    total={contributorObj.total}
                    industry={contributorObj.industry}
                />
        })
    } else {
        contributorCardArray = []
    }

    // If the page is loaded, we render the proper elements, otherwise we display a loading message.
    if (isLoaded) {
        return (
            <div>
                <h1>{politicianData.name}</h1>
                <img src={politicianData.image} alt={politicianData.name} style={{width: "400px"}}/>
                {isWatched ? 
                    <button onClick={handleClick}>Unwatch</button> :
                    <button onClick={handleClick}>Watch</button>
                }

                    {contributorCardArray}
                    <ContributorFilter />
                    <CommentSection />
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default PoliticianInfo