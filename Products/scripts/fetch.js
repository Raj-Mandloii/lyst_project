let wishData = JSON.parse(localStorage.getItem("wishdata")) || []

let descData = JSON.parse(localStorage.getItem("descdata")) || []

async function fetchData(){
    let url = `Data/product.json`
    let res = await fetch(url)
    let data = await res.json()
    return data;
  }
 
function wish(favList,data){
    var filteredWishlist = wishData.filter(function(item){
        return data.product_card.link_id == item.product_card.link_id;
    });
    if(filteredWishlist.length>0){
        for(var i=0; i<wishData.length; i++){
            if(wishData[i].product_card.link_id === data.product_card.link_id){
                wishData.splice(i, 1)
                favList.innerHTML = `<p class="heartIcon"><i class='far fa-heart' style='font-size:28px'></i></p>`
                localStorage.setItem("wishdata",JSON.stringify(wishData))
                
            }
        }
        
    }
    else{
        wishData.push(data)
        favList.innerHTML = `<p class="heartIcon"><i class='fas fa-heart' style='font-size:28px; color:red;'></i></p>`
        localStorage.setItem("wishdata",JSON.stringify(wishData))
       
    }
}  

function descri(data){
    descData.push(data)
    localStorage.setItem("descdata",JSON.stringify(descData))
} 
  

  function append(data){
    let container = document.getElementById("products")
    container.innerHTML = "";
    let productCount = document.getElementById("products_Count")
    
    productCount.innerText = `${(data.feed_count.product_count).toLocaleString()} Products, ${data.feed_count.retailer_count} Stores`
    
    data.feed_items.forEach(({product_card:{link_id,image_url,designer_name,short_description,full_price_with_currency_symbol,sale_price_with_currency_symbol,retailer_name,discount_info}}) => {
        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src = image_url
      //heart button created here
        var favList = document.createElement("i")
                       favList.addEventListener("click",function(){
                        wish(favList,{product_card:{link_id,image_url,designer_name,short_description,full_price_with_currency_symbol,sale_price_with_currency_symbol,retailer_name,discount_info}})
                       })
          
        let saved = `<p class="heartIcon"><i class='fas fa-heart' style='font-size:28px; color:red;'></i></p>`
        let track = `<p class="heartIcon"><i class='far fa-heart' style='font-size:28px'></i></p>`
        favList.innerHTML = track
        
        for(var j=0; j<wishData.length; j++){
            if(link_id == wishData[j].product_card.link_id){
                favList.innerHTML = saved
            }
        }
        
        
        favList.id="heart"
    
        let title = document.createElement("h4")
        title.innerText = designer_name
        title.addEventListener("click",function(){
            descri({product_card:{link_id,image_url,designer_name,short_description,full_price_with_currency_symbol,sale_price_with_currency_symbol,retailer_name,discount_info}})
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