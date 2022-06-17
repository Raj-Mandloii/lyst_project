
let displayTrack = (data, main) => {

    const divAfterSaved = document.createElement('div');
    divAfterSaved.id = "divAfterSaved"
    divAfterSaved.innerText = "Create your wishlist from across 12,000 stores in one place. We'll send you an alert when your favorite products go on sale or come back in stock."

    data.forEach(function (elem, index) {
        const appendWishItems = document.createElement('div');
        appendWishItems.id = "appendWishItems"

        const itemBox = document.createElement('div');
        itemBox.setAttribute("class", "itemBox")

        const img = document.createElement('img');
        img.setAttribute("class", "img")
        img.src = elem.image_url

        img.addEventListener("click", goToShop)
        function goToShop() {
            let a = elem.link_id
            window.location.href = `https://www.lyst.com/track/lead/${a}`
        }

        const removeButton = document.createElement('button');
        removeButton.innerText = "X"
        removeButton.setAttribute("class", "removeButton")
        removeButton.addEventListener("click", removeItem)
        function removeItem() {
            
            if (confirm("Are you sure you want to remove this item from your wishlist?")) {
                data.splice(index, 1)
                localStorage.setItem("trackDeals", JSON.stringify(data))
                window.location.reload()
            }
        }

        const brand = document.createElement('h3');
        brand.setAttribute("class", "brand")
        brand.innerText = elem.designer_name;

        brand.addEventListener("click", ToProductByBrand)
        function ToProductByBrand() {
            window.location.href = "./Product.html"
        }

        const detail = document.createElement('p');
        detail.setAttribute("class", "detail")
        detail.innerText = elem.short_description

        detail.addEventListener("click", ToProductByDetail)
        function ToProductByDetail() {
            window.location.href = "./Product.html"
        }

        const priceDiv = document.createElement('div');
        priceDiv.setAttribute("class", "priceDiv")

        const oldPrice = document.createElement('p');
        oldPrice.setAttribute("class", "oldPrice")
        oldPrice.innerText = elem.full_price_with_currency_symbol

        const price = document.createElement('p');
        price.setAttribute("class", "price")
        price.innerText = elem.sale_price_with_currency_symbol

        const off = document.createElement('p');
        off.setAttribute("class", "off")
        off.innerHTML = elem.discount_info

        priceDiv.append(oldPrice, price, off)

        const retailerDiv = document.createElement('div');
        retailerDiv.setAttribute("class", "retailerDiv")

        const linkIcon = document.createElement('p');
        linkIcon.innerHTML = `<i class="fa-solid fa-link"></i>`

        const retailerName = document.createElement('p');
        retailerName.setAttribute("class", "retailerName")
        retailerName.innerText = elem.retailer_name

        retailerDiv.append(linkIcon, retailerName)

        itemBox.append(img, removeButton, brand, detail, priceDiv, retailerDiv)

        appendWishItems.append(itemBox)

        main.append(divAfterSaved, appendWishItems)
    })

}

export default displayTrack