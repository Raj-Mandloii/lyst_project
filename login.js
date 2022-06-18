var ar = JSON.parse(localStorage.getItem("user")) || []

let a1=document.querySelector("#box11")
let a2=document.querySelector("#box221")

let new1 = document.getElementById("s1")
let new2 = document.getElementById("s2")

let m1 = document.getElementById("mail1")
let m2 = document.getElementById("mail")
let pass = document.getElementById("pa")
let cb=document.querySelector(".cb")
function ntl()
{
    new1.style.backgroundColor="black";
    new1.style.color="white"
    new2.style.backgroundColor="white";
    new2.style.color="black"
    
    a1.style.display="none"
    a2.style.display="flex"

    
}
function aam()
{

    new1.style.backgroundColor="white";
    new1.style.color="black"
    new2.style.backgroundColor="black";
    new2.style.color="white"
    a1.style.display="flex"
    a2.style.display="none"
    
}

function jl()
{
    if(m1.value=="" || pass.value=="")
    {
        alert("Fill all the empty boxes..!!")
    }
    else
    {
        alert("Sign Up Successfull")
        var obj = {
            email:m1.value,
            pass:pass.value
        }
        ar.push(obj)
        localStorage.setItem("user",JSON.stringify(ar))
        // window.open("index.html","_self")
    }
}

function si()
{
    if(m2.value=="")
    {
        alert("Enter valid email address..!!")
    }
    else if(ar)
    {
        var z = 0
        for(var i=0;i<ar.length;i++) {
            if(m2.value==ar[i].email)
            {
                alert("Sign In Successfull")
                window.open("index.html","_self")
                z++
                break;
            }
        }
        if(z==0)
        {
            alert("User doesn't exist..!!")
        }
    }
}
