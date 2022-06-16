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
        let btn = document.createElement("button")
        btn.innerText = "add to wishlist"
        btn.addEventListener("click", function(){
            wish({product_card:{link_id,image_url,designer_name,short_description,full_price_with_currency_symbol,sale_price_with_currency_symbol,retailer_name,discount_info}})
        })
        let title = document.createElement("h3")
        title.innerText = designer_name
        title.addEventListener("click",function(){
            descri({product_card:{image_url,designer_name,short_description,full_price_with_currency_symbol,sale_price_with_currency_symbol,retailer_name,discount_info}})
        })
        let desc = document.createElement("p")
        desc.innerText = short_description
        let price = document.createElement("h3")
        if(sale_price_with_currency_symbol===null){
            price.innerHTML = full_price_with_currency_symbol
        }else{
            price.innerHTML = `<del>${full_price_with_currency_symbol}</del><br>${sale_price_with_currency_symbol} ${discount_info}`
        }
        
        let retailer = document.createElement("p")
        retailer.innerText= `- ${retailer_name}`

        div.append(img,btn,title,desc,price,retailer)
        container.append(div)
    });
}  


  export {fetchData,append,wish,descri} 