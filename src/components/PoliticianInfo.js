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

    // console.log(isWatched)

    useEffect(() => {
        fetch(`http://localhost:4000/politicians/${params.id}`)
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticianData(politicianServerData)
                setIsLoaded(true)
                setIsWatched(politicianServerData.isWatched)
            })
    }, [params.id])

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

    function handleClick() {
        setIsWatched(!isWatched)
        updatedIsWatched()
    }

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
}

export default PoliticianInfo