function PoliticianFilter() {
    return (
        <div className="filter">
            <select className="filter-dropdown" id="party">
                <option value="All">Party</option>
                <option value="Republican">Republican</option>
                <option value="Democrat">Democrat</option>
                <option value="Libertarian">Libertarian</option>
            </select>
            <select className="filter-dropdown" id="state">
                <option value="All">State</option>
                <option value="Georgia">GA</option>
            </select>
        </div>
    )
}

export default PoliticianFilter