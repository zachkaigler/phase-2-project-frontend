function PoliticianFilter({getPartyValue, getStateValue}) {
    return (
        <div className="filter">
            <select className="filter-dropdown" id="party" onChange={(e) => getPartyValue(e.target.value)}>
                <option value="All">Party</option>
                <option value="Republican">Republican</option>
                <option value="Democrat">Democrat</option>
                <option value="Libertarian">Libertarian</option>
            </select>
            <select className="filter-dropdown" id="state" onChange={(e) => getStateValue(e.target.value)}>
                <option value="All">State</option>
                <option value="GA">Georgia</option>
            </select>
        </div>
    )
}

export default PoliticianFilter