function ContributorCard({ orgName, total, industry, orgUrl }) {
    return (
        <div className="contributor-card">
            {orgUrl ?
            <a href={orgUrl} target="_blank" rel="noreferrer"><h3>{orgName}</h3></a>
            :
            <h3>{orgName}</h3>
            }
            <p id="contributions">Contributions: ${total}</p>
            <p>{industry}</p>
        </div>
    )
}

export default ContributorCard