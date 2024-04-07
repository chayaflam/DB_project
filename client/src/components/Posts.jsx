import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
// import { VscTrash } from "react-icons/vsc";
// import { GrEdit, GrAdd } from "react-icons/gr";
// import { SlArrowRight } from "react-icons/sl";
import { UserContext } from "../main";

const URL = "http://localhost:8080/posts"

export default function Posts() {

    const [user] = useContext(UserContext)

    const [posts, setPosts] = useState([])
    const [postsToShow, setPostsToShow] = useState([])
    const [displayPost, setDisplayPost] = useState(null)
    const [displayComments, setDisplayComments] = useState(false)
    const [showSelectByInput, setShowSelectByInput] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        user ? fetch(`${URL}`)
            .then(response => response.json())
            .then(json => {
                if (!posts.length) {
                    setPosts(json)
                    setPostsToShow(json)
                }
            }) : navigate('*')
    }, [])

    function closePost() {
        navigate('../posts')
        setDisplayPost(null)
        setDisplayComments(false)
    }

    const addPost = () => {
        let status;
        let newPostTitle = prompt('Add new post:', 'enter post title')
        if (newPostTitle && newPostTitle != 'enter post title') {
            let newPostBody = prompt(newPostTitle, 'enter post body')
            if (newPostBody && newPostBody != 'enter post body') {
                const newPost = { "userId": user.id, "title": newPostTitle, "body": newPostBody };
                fetch(`${URL}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newPost)
                }).then(response => {
                    status = response.status;
                    return response.json()
                }).then(dataFromServer => {
                    if (status != 200) throw dataFromServer.error;
                    setPosts(prev => ([...prev,
                    {
                        "id": dataFromServer.id,
                        "userId": newPost.id,
                        "title": newPost.title,
                        "body": newPost.body
                    }]));

                    setPostsToShow(prev => ([...prev,
                    {
                        "id": dataFromServer.id,
                        "userId": newPost.id,
                        "title": newPost.title,
                        "body": newPost.body
                    }]))
                }).catch(error => console.log("Error", error))
            }
        }
    }


    function deletePost(postId) {
        fetch(`${URL}/${postId}`, {
            method: "DELETE",
            body: JSON.stringify(postId)
        }).then((response) => response.json())
            .then(() => {
                setPosts(posts.filter(p => p.id != postId))
                setPostsToShow(postsToShow.filter(p => p.id != postId))
            })
            .catch((error) => console.error("Error:", error));
    }

    function editPost(post, index) {
        console.log(post.userId)
        let newPostTitle = prompt(`edit post ${post.id}:`, `${post.title}`)
        if (newPostTitle && newPostTitle != post.title) {
            let newPostBody = prompt(newPostTitle, post.body)
            if (newPostBody && newPostBody != post.body) {
                let newPosts = posts.slice()
                newPosts[index].title = newPostTitle
                newPosts[index].body = newPostBody
                fetch(`${URL}/${post.id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: newPostTitle, body: newPostBody })
                }).then((response) => response.json())
                    .then(() => {
                        setPosts(posts.filter(p => p == post ? newPosts[index] : p))
                        if (showSelectByInput == '') setPostsToShow(postsToShow.filter(p => p == post ? newPosts[index] : p))
                    })
                    .catch((error) => console.error("Error:", error));
            }
        }
    }

    const handleSelectBy = (event) => {
        event.preventDefault()
        switch (event.target.value) {
            case "title": {
                setShowSelectByInput('title')
                break;
            }
            case "id": {
                setShowSelectByInput('id')
                break;
            }
        }
    }
    console.log(posts)

    const searchBy = (event) => {
        event.preventDefault()
        if (event.target.value.length > 0)
            switch (showSelectByInput) {
                case "title": {
                    setPostsToShow(posts.filter(a => a.title.includes(event.target.value)))
                    break;
                }
                case "id": {
                    setPostsToShow(posts.filter(a => a.id==event.target.value))
                    break;
                }
            }
        else setPostsToShow(posts.slice())
    }

    function showComments() {
        setDisplayComments(true)
    }

    function closeComments() {
        setDisplayComments(false)
        navigate('.')
    }

    function setPostToView(post) {
        setDisplayPost(post)
    }

    return <>
        <button onClick={() => addPost()}>add post </button><br />
        {!displayPost && showSelectByInput == '' && <select onChange={handleSelectBy}>
            <option value="" disabled selected hidden>select by...</option>
            <option value="id">Id</option>
            <option value="title">Title</option>
        </select>}
        {showSelectByInput != '' && <input autoFocus onChange={searchBy}></input>}
        {showSelectByInput != '' && <button onClick={() => { setShowSelectByInput(''), setPostsToShow(posts.slice()) }}>back</button>}
        {!displayPost && postsToShow && <h1>Posts:</h1>}
        {!displayPost && postsToShow.map((post, i) => {
            return <div key={i}>
                <h3>id:{post.id}  title:{post.title}</h3>
                {user.id == post.userId && <><button onClick={() => deletePost(post.id)}>delete</button>
                    <button onClick={() => editPost(post, i)}>edit</button></>}
                <button onClick={() => {
                    setPostToView(post)
                    navigate(`./${post.id}`)
                }}>view </button>
            </div>
        })}
        {displayPost && <div>
            <h2>post id: {displayPost.id}</h2>
            <h2>  post Title: {displayPost.title}</h2><br />
            <h2>post Body: {displayPost.body}</h2>
        </div>}
        {displayPost && !displayComments && <Link to={`./comments`} state={displayPost}><button onClick={() => showComments()}>comments</button></Link>}
        {displayComments && <Outlet />}
        {displayComments && <button onClick={() => closeComments()}>close comments</button>}
        {displayPost && <button onClick={() => closePost()}>close post</button>}
    </>
}