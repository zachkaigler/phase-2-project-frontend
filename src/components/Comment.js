function Comment({ name, comment}) {
    return (
        <div className="comments" id="comment">
            <h4>{name}</h4>
            <p>{comment}</p>
        </div>
    )
}

export default Comment