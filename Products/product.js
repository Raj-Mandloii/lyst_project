  


//url = `https://cors-anywhere.herokuapp.com/https://www.lyst.com/api/rothko/modules/product_feed/?url=https://www.lyst.com/shop/${tag}`  

import {fetchData,append,descri,wish} from "./scripts/fetch.js"

let wishData = JSON.parse(localStorage.getItem("wishdata")) || []


var sortTag;

let filterTag = document.getElementById('noFilters')

async function getData(tag){
  let data = await fetchData()
  let mainData = data[tag].data
  sortTag = tag;
  append(mainData)
  filterTag.innerText = ""
}

let category = document.getElementById("categDrop").children
for(let el of category){ 
  el.addEventListener('click',function(){
    cate(el)
  })
}



async function cate(el){
    console.log(el.id)
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

let sortPrice = document.getElementById("sortPrice")
sortPrice.addEventListener('change',function(){
  sortbyPrice(sortPrice.value)
})

let sortBrand = document.getElementById('sortBrand')
sortBrand.addEventListener('change', function(){
  sortbyBrand(sortBrand.value)
})

let clearall = document.getElementById('clearall')
clearall.addEventListener('click',function(){
  getData(sortTag)
})

async function handlePriceSort(selected){
    let data = await fetchData()
    let mainData = data[sortTag].data
    if(selected=="lowtohigh"){
        mainData.feed_items.sort(function(a,b){
        return Number(a.product_card.full_price_machine_readable_integer_string)-Number(b.product_card.full_price_machine_readable_integer_string);
           
    })
      append(mainData)
    }
    if(selected=="hightolow"){
        mainData.feed_items.sort(function(a,b){
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
    let mainData = data[sortTag].data
  
    var filteredList = mainData.feed_items.filter(function(el){
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

     let n = filteredList.length
     let obj = {"feed_items": filteredList, "feed_count":{"retailer_count": mainData.feed_count.retailer_count,"product_count":n }}
     append(obj)
     if(sort==""){
      getData(sortTag)
    }
     filterTag.innerText = sort
}    

async function sortbyPrice(sort){
  let data = await fetchData()
let mainData = data[sortTag].data

var filteredList = mainData.feed_items.filter(function(el){
  if(sort=='Upto $50'){
      return Number(el.product_card.full_price_machine_readable_integer_string)<=50;
      }
  if(sort=='Upto $100'){
      return Number(el.product_card.full_price_machine_readable_integer_string)<=100;
      }
  if(sort=='Upto $500'){
      return Number(el.product_card.full_price_machine_readable_integer_string)<=500;
      }    
})

let n = filteredList.length
let obj = {"feed_items": filteredList, "feed_count":{"retailer_count": mainData.feed_count.retailer_count,"product_count":n }}
append(obj)
if(sort==""){
  getData(sortTag)
}
filterTag.innerText = sort
}   

async function sortbyBrand(sort){
  let data = await fetchData()
let mainData = data[sortTag].data

var filteredList = mainData.feed_items.filter(function(el){
  if(sort=='Nasty Gal'){
      return (el.product_card.retailer_name)=='Nasty Gal';
      }
  if(sort=='Mytheresa'){
      return (el.product_card.retailer_name)=='Mytheresa';
      }
  if(sort=='Gilt'){
      return (el.product_card.retailer_name)=='Gilt';
      }    
})

let n = filteredList.length
let obj = {"feed_items": filteredList, "feed_count":{"retailer_count": mainData.feed_count.retailer_count,"product_count":n }}
append(obj)
if(sort==""){
  getData(sortTag)
}
filterTag.innerText = sort
} 


let wishlist = document.getElementById("wishlist")



