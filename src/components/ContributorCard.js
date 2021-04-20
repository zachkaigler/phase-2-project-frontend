function ContributorCard({ orgName, total, industry }) {
    return (
        <div className="contributor-card">
            <h3>{orgName}</h3>
            <p id="contributions">Contributions: ${total}</p>
            <p>{industry}</p>
        </div>
    )
}

export default ContributorCard