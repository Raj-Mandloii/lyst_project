let wishData = JSON.parse(localStorage.getItem("wishdata")) || []

let descData = JSON.parse(localStorage.getItem("descdata")) || []

async function fetchData(){
    let url = `./Data/product.json`
    let res = await fetch(url)
    let data = await res.json()
    return data;
  }
 
function wish(data){
    wishData.push(data)
    localStorage.setItem("wishdata",JSON.stringify(wishData))
}  

function descri(data){
    descData.push(data)
    localStorage.setItem("descdata",JSON.stringify(descData))
} 
  

  function append(data){
    let container = document.getElementById("products")
    container.innerHTML = "";
    data.forEach(({product_card:{link_id,image_url,designer_name,short_description,full_price_with_currency_symbol,sale_price_with_currency_symbol,retailer_name,discount_info}}) => {
        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src = image_url
      //heart button created here
        var favList = document.createElement("i")
                       favList.addEventListener("click",trackFunc)
          
        let saved = `<p class="heartIcon"><i class='fas fa-heart' style='font-size:28px; color:red;'></i></p>`
        let track = `<p class="heartIcon"><i class='far fa-heart' style='font-size:28px'></i></p>`
        favList.innerHTML = track
        favList.id="heart"
        let i = 0
        let wishArr = []
        // function for adding data of wishlist in local storages
        function trackFunc() {
            if (i == 0) {
               favList.innerHTML = saved
                wishArr.push(data)
                // localStorage.setItem("trackDeals", JSON.stringify(wishArr))
                i++
            } else if (i == 1) {
               favList.innerHTML = track
                wishArr.splice(data, 1)
                // window.localStorage.removeItem("trackDeals")
                // localStorage.setItem('trackDeals', JSON.stringify(wishArr));
                i = 0
            }
        }


        let title = document.createElement("h4")
        title.innerText = designer_name
        title.addEventListener("click",function(){
            descri({product_card:{image_url,designer_name,short_description,full_price_with_currency_symbol,sale_price_with_currency_symbol,retailer_name,discount_info}})
        })
        let desc = document.createElement("p")
        desc.innerText = short_description
        let price = document.createElement("h3")
        price.style.color="#938899"
        if(sale_price_with_currency_symbol===null){
            price.innerHTML = full_price_with_currency_symbol
        }else{
            price.innerHTML = `<del>${full_price_with_currency_symbol}</del> &nbsp  <span id="midM">${sale_price_with_currency_symbol}</span> ${discount_info}`
        }
        let retailerDiv=document.createElement('div')
        retailerDiv.id='retDiv';
        let retailer = document.createElement("p")
        let linksgv=document.createElement("p")
        linksgv.innerHTML=`<i class="fa-solid fa-link"></i>`
        
        retailer.innerText= ` ${retailer_name}`
        retailer.id= 'ret'
        retailerDiv.append(linksgv,retailer)

        div.append(img,favList,title,desc,price,retailerDiv)
        container.append(div)
    });
}  

  export {fetchData,append,wish,descri} 