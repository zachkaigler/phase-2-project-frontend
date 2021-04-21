import { Link } from "react-router-dom"

function PoliticianCard({ id, politicianObj, name, party, district, image, contributorsArray, isWatched}) {
    return (
        <Link to={`/politicianinfo/${id}`}>
            <div className="politician-card">
                <h3>{name}</h3>
                <img src={image} alt={name} style={{height: "150px"}} className="politician-img"/>
                <p>{party} - {district}</p>
            </div>    
        </Link>
    )
}

export default PoliticianCard