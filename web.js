showNotes();
let btn = document.getElementById('btn');
btn.addEventListener("click", function (e) {
    let title = document.getElementById('title');
    let addTxt = document.getElementById("txt");
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let obj = {title:title.value, text:addTxt.value};
    notesObj.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    title.value="";
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
});

function showNotes() {
    
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj); 
    let html = "";
    notesObj.forEach(function (element, index) {
        
        html += `
            <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-no">Note ${index+1} </h5>
              <img id="a" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png" height="5" width="5" onclick=func(this)>
              <h6 class="card-title">Title - ${element.title} </h6>
              <h6 class="card-text"> Desciption - ${element.text} </h6>
              <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete note</button>
            </div>
          </div>  ` ;
          
          console.log(index);
    }); 
    let notesEle = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `Nothing to show! Use "Add a note" section to add notes`;
    }
}
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
let search =  document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value.toLowerCase();
    let noteCard = document.getElementsByClassName('notecard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})
function func(elem){
    let src = ($(elem).attr('src')==="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png")? "https://media.istockphoto.com/id/817521398/vector/star-vector-icon-on-white-background-flat-rank-yellow-favorite-symbol.jpg?s=612x612&w=0&k=20&c=Fnrk0FDL1OgSLC0AMxlMXubTz39Fc2DR_64dkJPKlxA=" : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png" ;
    $(elem).attr('src', src);
}
