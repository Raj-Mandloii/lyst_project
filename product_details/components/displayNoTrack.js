
// function for display some details and instructions if no items added into track/wishlist
let displayNoTrack = () =>{
    return `<h2 id="savedItems">Saved items</h2>
    <div id="noItem">
        <div id="iconDiv"><i class='fas fa-heart-broken' style='font-size:28px; color: white;'></i></div>
        <div id="noItemText">You haven't saved any items</div>
    </div>
    <div id="createWish"><p>Create your wishlist from across 12,000 stores in one place.</p></div>
    <div id="justTap"><p>Just tap <span><i class='fas fa-heart' style='font-size:18px'></i></span> to track items you love, and we'll send you an alert when they go on sale or come back in stock.</p></div>
    <button id="findFav">Find your favorites</button>`
    
}

export default displayNoTrack