// import React, {useState, useEffect} from "react"
import PoliticianFilter from "./PoliticianFilter"

function Politicians({politicianCardsArray}) {
   
    return (
        <>
            <h1>Politicians</h1>

            <PoliticianFilter />
            <ul>
                {politicianCardsArray}
            </ul>            
        </>
    )
}

export default Politicians