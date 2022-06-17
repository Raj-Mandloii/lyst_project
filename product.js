  


//url = `https://cors-anywhere.herokuapp.com/https://www.lyst.com/api/rothko/modules/product_feed/?url=https://www.lyst.com/shop/${tag}`  

import {fetchData,append,descri,wish} from "./scripts/fetch.js"

let wishData = JSON.parse(localStorage.getItem("wishdata")) || []

let descData = JSON.parse(localStorage.getItem("descdata")) || []

var sortTag;

async function getData(tag){
  let data = await fetchData()
  let mainData = data[tag].data.feed_items
  sortTag = tag;
  append(mainData)
}

let category = document.getElementById("categDrop").children
for(let el of category){ 
  el.addEventListener('click',function(){
    cate(el)
  })
}
async function cate(el){
    getData(el.id)
  }

let sortBy = document.getElementById("sortby")
sortBy.addEventListener("change", function(){
    handlePriceSort(sortBy.value)
})

let sortSale = document.getElementById("sortSale")
sortSale.addEventListener("change", function(){
    sortbyNew(sortSale.value)
}) 


async function handlePriceSort(selected){
    let data = await fetchData()
    let mainData = data[sortTag].data.feed_items
    if(selected=="lowtohigh"){
        mainData.sort(function(a,b){
        return Number(a.product_card.full_price_machine_readable_integer_string)-Number(b.product_card.full_price_machine_readable_integer_string);
           
    })
      append(mainData)
    }
    if(selected=="hightolow"){
        mainData.sort(function(a,b){
        return Number(b.product_card.full_price_machine_readable_integer_string)-Number(a.product_card.full_price_machine_readable_integer_string);   
    })
     append(mainData)
    }
    if(selected=="recommanded"){
      getData(sortTag)
    }
  }

async function sortbyNew(sort){
        let data = await fetchData()
    // console.log(data.sortby[sortTag][sort].data)
    let mainData = data[sortTag].data.feed_items
    var filteredList = mainData.filter(function(el){
        if(sort=="20%off"){
            return el.product_card.sale_discount>20;
            }
        if(sort=="50%off"){
            return el.product_card.sale_discount>50;
            }
        if(sort=="70%off"){
            return el.product_card.sale_discount>=70;
            }
     })
     append(filteredList)
}    


let wishlist = document.getElementById("wishlist")



