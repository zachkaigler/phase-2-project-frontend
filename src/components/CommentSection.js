import { useState } from "react"

function CommentSection({ commentComponentArray, getNewPost, params }) {
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        const newComment = {
            commenterName: name,
            comment: comment,
            politicianId: parseInt(params.id, 10)
        }
        setName("")
        setComment("")
        getNewPost(newComment)
    }
    
    return (
        <div className="comments">
            <h3>Comments</h3>
            <form className="comments" onSubmit={handleSubmit}>
                <input type= "text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <br/>
                <textarea rows="5" cols="46" name="comment" form="usrform" id="comment" placeholder="Add a comment" maxLength="150" value={comment} onChange={(e) => setComment(e.target.value)} required/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
            <br/>
            <div id="comment-section">
                {commentComponentArray}
            </div>
        </div>
    )
}

export default CommentSection