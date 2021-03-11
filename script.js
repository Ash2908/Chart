let nutrientList = {};
let ulAvoid = document.querySelector('.avoid');
let ulAdvice = document.querySelector('.advice');

// Fetch json on load
async function listJSONData() {
    let response = await fetch('data.json');
    nutrientList = await response.json();
    // nutrientList = JSON.parse(data);
    createAvoidList();
    createAdviceList();
}

function createAvoidList() {
    //Selecting list of avoided nutrients from json file
    const arr1 = nutrientList.nutrientsAvoid;
    createList(arr1);
}

function createAdviceList() {
     //Selecting list of adviced nutrients from json file
    const arr2 = nutrientList.nutrientsAdvice;
    createList(arr2);
    //Add event Listeners to the entire chart
    addCount();
}

function createList(arr) {
    //Creating div for each list element in chart
    for (let i =0, n=arr.length; i<n; i++) {
       let mainDiv = document.createElement('div');
       mainDiv.setAttribute("class", "nutrient-info");    
       let div1= document.createElement('div');
       div1.innerHTML = `<p class="numbers">${arr[i].endorseUsers<10?'0'+arr[i].endorseUsers:arr[i].endorseUsers}</p> <p class='nutrient'>${arr[i].nutrient}</p>`;
       let div2=document.createElement('div');
       div2.innerHTML = `<p class="plus" id=${arr[i].id}>+</p> <img src="Avatar.svg" width='20' height='20'>`;
       mainDiv.appendChild(div1);
       mainDiv.appendChild(div2);
       if(n===4){
       ulAvoid.appendChild(mainDiv);
       }
       else{
       ulAdvice.appendChild(mainDiv);
       }
       }
   }

// Add or Subtract endorse users
function addCount() {
    let addCount = document.querySelectorAll('.plus');
    //Adding event listener for every '+' sign
    for(let j=0; j<addCount.length;j++){
    addCount[j].addEventListener('click', function() {
        // Selecting endorse value of clicked element
        let users = addCount[j].parentElement.previousSibling.querySelector('.numbers').innerHTML;
        // Adding endorse user 
        if(addCount[j].innerHTML!=='-') {
            addCount[j].innerHTML='-';
            users= Number(users)+1;
            addCount[j].parentElement.previousSibling.querySelector('.numbers').innerHTML=users<10?0+String(users):users;
            //Store updated value in local storage
            localStorage.setItem('updatedEndorsedValue', JSON.stringify({updatedUsers: users, id: j}));
         }
        //  Subtracting endorse user
        else {
        addCount[j].innerHTML='+';
            users= Number(users)-1;
            addCount[j].parentElement.previousSibling.querySelector('.numbers').innerHTML=users<10?0+String(users):users;
            //Store updated value in local storage
            localStorage.setItem('updatedEndorsedValue', JSON.stringify({updatedUsers: users, id: j}));
        }
    })
}  
}

//On load
window.addEventListener('load', listJSONData);


