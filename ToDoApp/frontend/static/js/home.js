let activeItemid=null;

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');


function BuildList(){
    const wrapper =document.getElementById('list-wrapper')
    let fetchUrl='http://localhost:8000/api/tasklist/'
    document.getElementById('form').reset()
    wrapper.innerHTML=''
    listData =fetch(fetchUrl)
    .then((res)=>res.json())
    .then((data)=>{
        listData=data
        for (let i in listData){
            const items=
                `<div id="data-row-${i}" class="task-wrapper flex-wrapper">
                    <div style="flex:7">
                        <span class= "title">${listData[i].Title}</span>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-secondary edit">Edit</button>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-danger delete"> Delete</button>
                    </div>
                </div>
            `
        wrapper.innerHTML+=items
        }  
        for (i in listData){
            let editTask = document.getElementsByClassName('edit')[i]
            
            editTask.addEventListener('click',((event)=>()=>UpdateList(event))(listData[i]))
        }
    })
}

function UpdateList(e){
    document.getElementById('title').value=e.Title
    activeItemid=e.id
}

    let form = document.getElementById('form-wrapper')
    form.addEventListener('submit',(e)=>{

    let title = document.getElementById('title').value
    e.preventDefault()
    console.log(activeItemid)
    postUrl='http://localhost:8000/api/taskcreate/'

    if (activeItemid!=null){
        postUrl=`http://localhost:8000/api/taskupdate/${activeItemid}/`
    }
    
    fetch(postUrl,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'Title':title})
        
        }).then((res)=>{BuildList(),
        document.getElementById('form').reset()})
    })



BuildList()