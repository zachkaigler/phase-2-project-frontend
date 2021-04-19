function ContributorCard({ orgName, total, industry }) {
    return (
        <div className="contributor-card">
            <h3>{orgName}</h3>
            <p>Total contributions: ${total}</p>
            <p>{industry}</p>
        </div>
    )
}

export default ContributorCard