import { Link } from "react-router-dom"

function PoliticianCard({ id, politicianObj, name, party, district, image, contributorsArray, isWatched}) {
    // console.log(district)
    return (
        <Link to={`/politicianinfo/${id}`}>
            <div className="politician-card">
                <h3>{name}</h3>
                <img src={image} alt={name} style={{width: "100px"}}/>
                <p>{party} - {district}</p>
            </div>    
        </Link>
    )
}

export default PoliticianCard