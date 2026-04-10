let items = JSON.parse(localStorage.getItem("items"));

if(!items || items.length===0){
items = [
{name:"Wallet",location:"Library",type:"Lost",contact:"raj@vitstudent.ac.in"},
{name:"Water Bottle",location:"Block A",type:"Found",contact:"priya@vitstudent.ac.in"},
{name:"ID Card",location:"Hostel",type:"Lost",contact:"arun@vitstudent.ac.in"},
{name:"Calculator",location:"Lab",type:"Found",contact:"meena@vitstudent.ac.in"}
];
localStorage.setItem("items",JSON.stringify(items));
}

function validEmail(email){
email = email.trim().toLowerCase();
return /^[a-z0-9._%+-]+@vitstudent\.ac\.in$/.test(email);
}

function addItem(){
let name=document.getElementById("name").value.trim();
let location=document.getElementById("location").value.trim();
let type=document.getElementById("type").value;
let contact=document.getElementById("contact").value;

if(name==="" || location===""){
alert("Fill all fields");
return;
}

if(!validEmail(contact)){
alert("Enter valid VIT email");
return;
}

items.push({name,location,type,contact});
localStorage.setItem("items",JSON.stringify(items));

alert("Submitted Successfully");
}

function displayItems(data,searchText=""){
let list=document.getElementById("list");
if(!list) return;

list.innerHTML="";

if(data.length===0){
list.innerHTML="<p>No items found</p>";
return;
}

data.forEach(i=>{
let cls=i.type==="Lost"?"lost":"found";

let name=i.name;
if(searchText){
let regex=new RegExp(`(${searchText})`,"gi");
name=name.replace(regex,"<span class='highlight'>$1</span>");
}

list.innerHTML+=`
<div class="card ${cls}">
<h3>${name}</h3>
<p>${i.type}</p>
<p>${i.location}</p>
<p>${i.contact}</p>
</div>
`;
});
}

function searchItem(){
let value=document.getElementById("search").value.toLowerCase();
let filtered=items.filter(i=>i.name.toLowerCase().includes(value));
displayItems(filtered,value);
}

function loadLostItems(){
let dropdown=document.getElementById("lostItems");
if(!dropdown) return;

dropdown.innerHTML="<option>Select Lost Item</option>";

items.filter(i=>i.type==="Lost").forEach(i=>{
dropdown.innerHTML+=`<option>${i.name}</option>`;
});
}

function sendMail(){
let email=document.getElementById("email").value;
let item=document.getElementById("lostItems").value;
let msg=document.getElementById("msg");

if(!validEmail(email)){
alert("Use VIT email only");
return;
}

if(item==="Select Lost Item"){
alert("Select an item");
return;
}

msg.value=`Hello,

I am a VIT student and I would like to claim the lost item "${item}".

Please let me know the procedure to verify and collect it.

Thank you.`;

alert("Claim request sent");
}

let total=document.getElementById("total");
let lost=document.getElementById("lost");
let found=document.getElementById("found");

if(total){
total.innerText=items.length;
lost.innerText=items.filter(i=>i.type==="Lost").length;
found.innerText=items.filter(i=>i.type==="Found").length;
}

displayItems(items);
loadLostItems();