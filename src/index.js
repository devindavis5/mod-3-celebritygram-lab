//Get image
fetch('http://localhost:3000/images/1')
.then(function(res){
    return res.json()
})
.then(function(image){
    renderImage(image)
})

//add image to page
function renderImage(photo) {
    const imgTitle = document.querySelector('.title')
    imgTitle.innerHTML = photo.title
    const img = document.querySelector('.image')
    img.src = photo.image
    const ul = document.querySelector('.comments')
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    const comments = photo.comments
    for(let i = 0; i < comments.length; i++) {
        renderComment(comments[i], ul)
    }
    const likes = document.querySelector('.likes')
    renderLikes(photo)
    const likebtn = document.querySelector('.like-button')
    likebtn.addEventListener('click', function(e) {
        e.preventDefault()
        //numLikes has to be in here because then it will be set each time the button is pushed rather than just once when the image is rendered
        const numLikes = parseInt(likes.innerHTML)
        addLike(numLikes)
    })
    const dislikebtn = document.createElement('button')
    dislikebtn.innerHTML = "😡"
    const likesSection = document.querySelector('.likes-section')
    likesSection.append(dislikebtn)
    dislikebtn.addEventListener('click', function(e) {
        alert("You can't dislike The Rock, sorry..")
    })

    const comForm = document.querySelector('.comment-form')
    comForm.addEventListener('submit', function(e){
        e.preventDefault()
        addComment(e.target, ul, photo)
        comForm.reset()
    })
}
//Add like to database and then reflect change on page
function addLike(numLikes) {
    const newLikes = numLikes + 1
    fetch('http://localhost:3000/images/1', {
        method: 'PATCH', 
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            likes: newLikes
        })
    })
    .then(function(res){
        return res.json()
    })
    .then(function(photo){
        renderLikes(photo)
    })
}
//render photo likes to page
function renderLikes(photo) {
    const likes = document.querySelector('.likes')
    likes.innerHTML = `${photo.likes} likes`
}

//add comment to database and then render comment
function addComment(form, ul) {
    const comment = form.comment.value
    fetch('http://localhost:3000/comments', {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            imageId: 1,
            content: comment
        })
    })
    .then(function(res){
        return res.json()
    })
    .then(function(comm){
        renderComment(comm, ul)
    })
}

//first delete from database and then remove comment li
function deleteComment(comment, commentLi) {
    fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: 'DELETE'  
    })
    .then(function() {
        commentLi.remove()
    })
}

function renderComment(comm, ul) {
    const li = document.createElement('li')
    li.innerHTML = comm.content
    const deletebtn = document.createElement('button')
    deletebtn.innerHTML = "x"
    deletebtn.addEventListener('click', function(e) {
            e.preventDefault()
            deleteComment(comm, li)
        })
    li.append(deletebtn)
    ul.append(li)
}