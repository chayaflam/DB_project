import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { UserContext } from "../main";
import { GrEdit, GrAdd, GrTrash } from "react-icons/gr";

const URL = `http://localhost:8080/comments`

export default function Comments() {

    const [comments, setComments] = useState([])
    const [user] = useContext(UserContext)
    const post = useLocation().state;


    useEffect(() => {
        console.log(post.id)
        if (!comments.length) {
            fetch(`${URL}/${post.id}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(json => (comments != json) ? setComments(json.data) : console.log(json.data))
        }
        else setComments([])
    }, [])


    function editComment(comment, index) {
        let newCommentName = prompt(`edit comment ${comment.id} new name:`, comment.name)
        if (newCommentName) {
            let newCommentBody = prompt(`edit comment ${comment.id} new body:`, comment.body)
            if (newCommentBody && (newCommentBody != comment.body || newCommentName != comment.name)) {
                let newComments = comments.slice()
                newComments[index].name = newCommentName
                newComments[index].body = newCommentBody
                fetch(`${URL}/${comment.id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newCommentName, body: newCommentBody })
                }).then((response) => response.json())
                    .then(() => setComments(newComments))
                    .catch((error) => console.error("Error:", error));
            }
        }
    }

    function deleteComment(commentId) {
        fetch(`${URL}/${commentId}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentId)
        }).then((response) => response.json())
            .then(() => setComments(comments.filter(c => c.id != commentId)))
            .catch((error) => console.error("Error:", error));
    }

    const addComment = () => {
        let status;
        let newCommentName = prompt('Add new comment:', 'enter comment name')
        if (newCommentName && newCommentName != 'enter comment name') {
            let newCommentBody = prompt('Add new comment:', 'enter comment body')
            if (newCommentBody && newCommentBody != 'enter comment body') {
                fetch(`${URL}/${post.id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "postId": post.id, "name": newCommentName, "email": user.email, "body": newCommentBody })
                }).then(response => {
                    status = response.status;
                    return response.json()
                }).then(dataFromServer => {
                    if (status != 200) throw dataFromServer.error;
                    setComments(prev => ([...prev,
                    {
                        "id": dataFromServer.id,
                        "postId": post.id,
                        "name": newCommentName,
                        "email": user.email,
                        "body": newCommentBody
                    }]));
                }).catch(error => console.log("Error", error))
            }
        }
    }

    return <>
        {comments.length > 0 && <h2>comments</h2>}
        <button onClick={() => addComment()}>add comment <GrAdd /></button>
        {comments.length > 0 && comments.map((comment, i) => {
            return <div key={i}>
                <h3>comment Id: {comment.id}   comment Name: {comment.name}  Email: {comment.email}</h3>
                <p>comment Body: {comment.body}</p>
                {user.email == comment.email && <><button onClick={() => editComment(comment, i)}><GrEdit /></button>
                    <button onClick={() => deleteComment(comment.id)}><GrTrash /></button></>}
            </div>
        })}
    </>
}