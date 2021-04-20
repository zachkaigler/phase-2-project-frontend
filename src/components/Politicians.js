import PoliticianFilter from "./PoliticianFilter"

function Politicians({politicianCardsArray}) {
   
    return (
        <div className="main-page" id="politicians">
            <h1>Politicians</h1>

            <PoliticianFilter />
            <ul>
                {politicianCardsArray}
            </ul>            
        </div>
    )
}

export default Politicians