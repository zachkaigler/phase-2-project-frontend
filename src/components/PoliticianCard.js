function PoliticianCard({ id, politicianObj, name, party, district, image, contributorsArray, isWatched}) {
    return (
        <div className="politician-card">
            <h3>{name}</h3>
            <img src={image} alt={name} style={{width: "100px"}}/>
            <p>{party}</p>
            <p>{district}</p>
        </div>    
    )
}

export default PoliticianCard