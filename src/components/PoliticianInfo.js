import CommentSection from "./CommentSection";
import ContributorCard from "./ContributorCard";
import ContributorFilter from "./ContributorFilter";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Comment from "./Comment";

function PoliticianInfo() {
    const [politicianData, setPoliticianData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const [commentsArray, setCommentsArray] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("All")
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
                setCommentsArray(politicianServerData.comments)
            })
    }, [params.id])

    // Passed down from App - fires when isWatched is changed and flips the toggle
    // state variable above to tell the politiciansArray state variable to update **
    function handleClick() {
        fetch(`http://localhost:4000/politicians/${params.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                isWatched: !politicianData.isWatched
            })
        })
        .then(resp => resp.json())
        .then(function(updatedPoliticianObj) {
            setPoliticianData(updatedPoliticianObj)
        })
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

    function getFilterValue(value) {
        setSelectedFilter(value)
    }

    // If the page is loaded, we map and create an array of ContributorCard components for each
    // contributor in the politician's database. Otherwise it is just an empty array.
    let contributorCardArray
    let commentComponentArray
    let sum = 0
    if (isLoaded) {
        const filteredContributors = politicianData.contributors.filter(function(contributorObj) {
            if (selectedFilter === "All") {
                return contributorObj
            } else {
                return contributorObj.industry === selectedFilter
            }
        })

        contributorCardArray = filteredContributors.map(function(contributorObj) {
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
                <img src={politicianData.image} alt={politicianData.name} style={{width: "400px"}} id="politician-info-img"/>
                <br/>
                <br/>
                <div id="politician-details">
                    {politicianData.isWatched ? 
                        <button onClick={handleClick} id="btn-unwatch">Unwatch</button> :
                        <button onClick={handleClick} id="btn-watch">WATCH</button>
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
                    <ContributorFilter getFilterValue={getFilterValue}/>
                    <ul className="contributors-list">
                        {contributorCardArray}
                    </ul>
                </div>
                <CommentSection commentComponentArray={commentComponentArray} getNewPost={getNewPost} params={params}/>
            </div>
        )
    } else {
        return (
            null
        )
    }
}

export default PoliticianInfo