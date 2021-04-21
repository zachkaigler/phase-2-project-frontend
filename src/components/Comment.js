function Comment({ name, comment, id, getDeletedId }) {

    function handleClick() {
        fetch(`http://localhost:4000/comments/${id}`, {
            method: "DELETE"
        })
        getDeletedId(id)
    }

    return (
        <div className="comments" id="comment">
            <h4>{name}</h4>
            <p>{comment}</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default Comment