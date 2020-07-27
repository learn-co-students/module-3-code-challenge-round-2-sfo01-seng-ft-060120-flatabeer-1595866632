// Code here
fetch('http://localhost:3000/beers/1')
.then(resp => resp.json())
.then(json => renderBeer(json))

function renderBeer(beer){
    let div = document.querySelector('.beer-details')
    div.innerHTML = `<h2>${beer.name}</h2>
    <img src="${beer.image_url}">

    <form class="description">
      <textarea>${beer.description}</textarea>
      <button>Update Beer</button>
    </form>

    <h3>Leave a Review</h3>
    <form class="review-form">
      <textarea></textarea>
      <input type="submit" value="Submit">
    </form>

    <h3>Customer Reviews</h3>
    <ul class="reviews">
    </ul>`

    let ul = document.querySelector('.reviews')
    beer.reviews.forEach(review => {
        let li = document.createElement('li')
        li.innerText = review
        ul.appendChild(li)
    })
    let updateButton = document.querySelector('button')
    updateButton.className = 'update'
    let button = document.querySelector('.update')
    button.addEventListener('click', (e) => update(e, beer))
}

function update(e, beer){
    e.preventDefault()
    let data = {description: event.target.parentElement[0].value}
    let text = document.querySelector('textarea')
    text = data.description

    fetch(`http://localhost:3000/beers/${beer.id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

document.addEventListener('submit', (e, beer) => comments(e, beer))
function comments(e, beer){
    e.preventDefault()
    console.log(event.target[0].value)
    let ul = document.querySelector('.reviews')
    let li = document.createElement('li')
    li.innerText = event.target[0].value
    ul.appendChild(li)
    // let currentReview = event.target[0].value
    // let reviews = beer.reviews
    // reviews.push(currentReview)
    // let data = {id: beer.id, name: beer.name, description: beer.name, image_url: beer.image_url, reviews: beer.reviews}
    // fetch(`http://localhost:3000/beers/1`, {
    //     method: 'POST', 
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    // })
}