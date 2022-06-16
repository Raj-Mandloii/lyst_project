
// function for working wishlist icon
const wishLists = document.querySelector('#wishList');
wishLists.addEventListener("click", wishList)
function wishList() {
    window.location.href = "./track.html"
}

// getting track/wishlist data from local storage
let trackDeals = JSON.parse(localStorage.getItem("trackDeals"))

// importing displayTrack for showing data of track/wishlist
import displayTrack from "../components/displayTrackData.js"

// importing displayNoTrack for display some details and instructions if no items added into track/wishlist
import displayNoTrack from "../components/displayNoTrack.js"

// condition if items not added into track/wishlist else items added
if (trackDeals == null) {
    const main = document.querySelector('#main');
    let html = displayNoTrack()
    main.innerHTML = html

    // button for redirecting to home page
    const findFav = document.querySelector('#findFav');
    findFav.addEventListener("click", function () {
        window.location.href = "./Product.html"
    })
}
else {
    const main = document.querySelector('#main');
    displayTrack(trackDeals, main)
}
