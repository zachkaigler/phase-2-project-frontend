import CommentSection from "./CommentSection";
import ContributorCard from "./ContributorCard";
import ContributorFilter from "./ContributorFilter";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Comment from "./Comment";

function PoliticianInfo( {updatedIsWatched} ) {
    const [politicianData, setPoliticianData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    // State variable to toggle text of Watch button **
    const [isWatched, setIsWatched] = useState(politicianData.isWatched)
    const [commentsArray, setCommentsArray] = useState([])
    const params = useParams()

    // Sets in state the politician data corresponding to the page we are on in
    // url/politicianinfo. Also triggers the DOM to render the necessary elements when the page is loaded.
    // Finally, updates the value of isWatched to match the value of that politician on the server. **
    useEffect(() => {
        fetch(`http://localhost:4000/politicians/${params.id}?_embed=comments`)
            .then(resp => resp.json())
            .then(function(politicianServerData) {
                setPoliticianData(politicianServerData)
                setIsLoaded(true)
                setIsWatched(politicianServerData.isWatched)
                setCommentsArray(politicianServerData.comments)
            })
    }, [params.id])

    // Makes a PATCH request to the server when isWatched is updated, and updates the value to match **
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
    // state variable above to tell the politiciansArray state variable to update **
    function handleClick() {
        setIsWatched(!isWatched)
        updatedIsWatched()
    }

    // Passed down to CommentSection. Recieves the newComment object and posts it to
    // the comments resource on the server, then updates the commentsArray state variable
    // on the DOM.
    function getNewPost(newComment) {
        fetch("http://localhost:4000/comments", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newComment)
        })
            .then(resp => resp.json())
            .then(function(newCommentServerObj) {
                setCommentsArray([...commentsArray, newCommentServerObj])
            })
    }

    // If the page is loaded, we map and create an array of ContributorCard components for each
    // contributor in the politician's database. Otherwise it is just an empty array.
    let contributorCardArray
    let commentComponentArray
    let sum = 0
    if (isLoaded) {
        contributorCardArray = politicianData.contributors.map(function(contributorObj) {
            return <ContributorCard 
                    key={contributorObj.orgName}
                    orgName={contributorObj.orgName}
                    total={contributorObj.total}
                    industry={contributorObj.industry}
                  />
            })
        commentComponentArray = commentsArray.map(function(commentObj) {
            return <Comment 
                    key={commentObj.id}
                    name={commentObj.commenterName}
                    comment={commentObj.comment}
                  />
        })
        politicianData.contributors.forEach(function(contributor) {
            sum = sum + contributor.total
        })
    } else {
        contributorCardArray = []
        commentComponentArray = []
    }

    // If the page is loaded, we render the proper elements, otherwise we display a loading message.
    if (isLoaded) {
        return (
            <div className="main-page" id="politician-info">
                <h1>{politicianData.name}</h1>
                <img src={politicianData.image} alt={politicianData.name} style={{width: "400px"}}/>
                <br/>
                <br/>
                <div id="politician-details">
                    {isWatched ? 
                        <button onClick={handleClick}>Unwatch</button> :
                        <button onClick={handleClick}>Watch</button>
                    }
                    <p>
                        <strong>Party:</strong> {politicianData.party}
                        <br/>
                        <strong>District:</strong> {politicianData.district}
                        <br/>
                        <strong>Total contributions:</strong> ${sum}
                    </p>
                </div>
                <div id="contributor-details">
                    <h3>Contributor Details</h3>
                    <ContributorFilter />
                    <ul className="contributors-list">
                        {contributorCardArray}
                    </ul>
                </div>
                <CommentSection commentComponentArray={commentComponentArray} getNewPost={getNewPost} params={params}/>
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }
}

export default PoliticianInfo