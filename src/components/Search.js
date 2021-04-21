import { useState } from "react"
import { useHistory } from "react-router"

function Search({politiciansArray}) {
    const [value, setValue] = useState("")
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        politiciansArray.forEach(function(politicianObj) {
            if (politicianObj.name.toLowerCase() === value.toLowerCase()) {
                history.push(`/politicianinfo/${politicianObj.id}`)
            }
        })
        setValue("")
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} id="search-form">
            <input placeholder="Search Politicians" value={value} onChange={(e) => setValue(e.target.value)}></input>
            <input type="submit" value="Go"/>
        </form>
    )
}

export default Search