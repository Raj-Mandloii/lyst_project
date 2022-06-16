
// function for display product details 
let display = (data, ProductImages, productMainImage, productDetails) => {

    document.title = `${data.designer_name} ${data.short_description} | Lyst`
    // const ProductImages = document.querySelector('#ProductImages');

    const smallImage = document.createElement('img');
    smallImage.id = "smallImage"
    smallImage.src = data.image_url;

    ProductImages.append(smallImage)

    // const productMainImage = document.querySelector('#productMainImage');
    const mainImage = document.createElement('img');
    mainImage.id = "mainImage"
    mainImage.src = data.image_url;

    productMainImage.append(mainImage)

    // const productDetails = document.querySelector('#productDetails');
    const brand = document.createElement('h2');
    brand.id = "brand"
    brand.innerText = data.designer_name;

    const detail = document.createElement('p');
    detail.id = "detail"
    detail.innerText = data.short_description

    const priceAndFrom = document.createElement('div');
    priceAndFrom.id = "priceAndFrom"

    const priceDiv = document.createElement('div');
    priceDiv.id = "priceDiv"

    const price = document.createElement('h3');
    price.id = "price"
    price.innerText = data.sale_price_with_currency_symbol

    const oldPrice = document.createElement('h4');
    oldPrice.id = "oldPrice"
    oldPrice.innerText = data.full_price_with_currency_symbol

    priceDiv.append(price, oldPrice)

    const fromDiv = document.createElement('div');
    fromDiv.id = "fromDiv"

    const fromSpan = document.createElement('span');
    fromSpan.id = "fromSpan"
    fromSpan.innerText = data.retailer_name

    const from = document.createElement('p');
    from.id = "from"
    from.innerText = "From "
    from.append(fromSpan)

    fromDiv.append(from)

    priceAndFrom.append(priceDiv, fromDiv)

    const shopNowDiv = document.createElement('div');
    shopNowDiv.id = "shopNowDiv"

    const shopNow = document.createElement('div');
    shopNow.id = "shopNow"
    shopNow.innerText = "Shop Now"

    const shopNow1 = document.createElement('div');
    shopNow1.id = "shopNow1"
    shopNow1.innerText = "Shop Now"

    const shopNow2 = document.createElement('div');
    shopNow2.id = "shopNow2"
    shopNow2.innerText = "Shop Now"

    shopNowDiv.append(shopNow, shopNow1, shopNow2)
    shopNowDiv.addEventListener("click", shopNowFunc)

    // function for do shopping 
    function shopNowFunc() {
        let a = data.link_id
        window.location.href = `https://www.lyst.com/track/lead/${a}`
    }

    const trackDiv = document.createElement('div');
    trackDiv.id = "trackDiv"

    trackDiv.addEventListener("click", trackFunc)

    let s = `<p class="heartIcon"><i class='fas fa-heart' style='font-size:28px'></i></p>
    <p id="trackDeals">Saved</p>`

    let t = `<p class="heartIcon"><i class='far fa-heart' style='font-size:28px'></i></p>
    <p id="trackDeals">Track Deals</p>`
    
    trackDiv.innerHTML = t
    let i = 0
    // function for adding data of wishlist in local storage
    function trackFunc() {

        if(i == 0){
            trackDiv.innerHTML = s
            localStorage.setItem("trackDeals", JSON.stringify(data))
            i++
        }else if(i == 1){
            trackDiv.innerHTML = t
            window.localStorage.removeItem('trackDeals');
            i=0
        }
        
    }

    productDetails.append(brand, detail, priceAndFrom, shopNowDiv, trackDiv)
}

export default display