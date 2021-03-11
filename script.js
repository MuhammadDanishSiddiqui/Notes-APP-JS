
var addbtn=document.getElementById("addbtn")

addbtn.addEventListener('click',function(){
     var note_title=document.getElementById("title")
     var note_desc=document.getElementById("desc")
     var note={
        title:note_title.value,
        desc:note_desc.value
    }
    if(!note_title.value || !note_desc.value)
    {
        alert("Please fill both the fields")
        return false
    }

    if(localStorage.getItem("notes")==null)
    {
        var notes=[]
        notes.push(note)
        localStorage.setItem("notes",JSON.stringify(notes))
    }
    else{
        var notes=JSON.parse(localStorage.getItem("notes"))
        notes.push(note)
        localStorage.setItem("notes",JSON.stringify(notes))
    }
    note_title.value=""
    note_desc.value=""
    fetchNote()
})
fetchNote()

function fetchNote(){
    if(localStorage.getItem("notes")==null)
    {
        var notes=[]
        var para=document.getElementById("para")
        para.innerHTML="Nothing to show"
    }
    else{
        if(JSON.parse(localStorage.getItem("notes")).length===0)
    {
        var para=document.getElementById("para")
        para.innerHTML="Nothing to show"
        var notes_list=document.getElementById("notes_list")
        notes_list.innerHTML=""
        return
    }
        var para=document.getElementById("para")
        para.innerHTML=""
    
   notes=JSON.parse(localStorage.getItem("notes"))
    var notes_list=document.getElementById("notes_list")
    notes_list.innerHTML=""
   
    notes.forEach((note,index) => {
        notes_list.innerHTML+=` <div class="note_style">
        <div class="note_header">
            <h3>${note.title}</h3>
            <button onclick="deleteNote(${index})" class="deletebtn">Delete Note</button>
        </div>
        <p>${note.desc}</p>
    </div>`
    });
}
}

function deleteNote(index){
    var notes=JSON.parse(localStorage.getItem("notes"))
    notes.splice(index,1)
    localStorage.setItem("notes",JSON.stringify(notes))
    fetchNote()
}

var filter=document.getElementById("search_by")
filter.addEventListener("input",function(){
    var value=filter.value.toLowerCase()
    var notes=document.getElementsByClassName("note_style")
    for(var i=0;i<notes.length;i++){
        var paraEle=notes[i].getElementsByTagName("p")[0].innerHTML.toLowerCase()
        var titleEle=notes[i].getElementsByTagName("h3")[0].innerHTML.toLowerCase()
        if(paraEle.includes(value) || titleEle.includes(value)){
            notes[i].style.display="block"
        }
        else{
            notes[i].style.display="none"
        }
    }
   
})