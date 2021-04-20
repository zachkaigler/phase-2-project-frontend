function ContributorFilter() {
    return (
        <div className="filter" id="contributor-filter">
            <select className="filter-dropdown" id="industry">
                <option value="All">Filter by industry</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Associations">Associations</option>
                <option value="Automotive">Automotive</option>
                <option value="Defense">Defense</option>
                <option value="Education">Education</option>
                <option value="Financial">Financial</option>
                <option value="Government">Government</option>
                <option value="Insurance">Insurance</option>
                <option value="Local business/individual">Local business/individual</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Media">Media</option>
                <option value="Medical">Medical</option>
                <option value="PAC">PAC</option>
                <option value="Philanthropy">Philanthropy</option>
                <option value="Retail">Retail</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Misc">Misc</option>
            </select>
        </div>
    )
}

export default ContributorFilter