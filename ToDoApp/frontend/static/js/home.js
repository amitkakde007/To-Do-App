function BuildList(){
    const wrapper =document.getElementById('list-wrapper')
    let url='http://localhost:8000/api/tasklist/'
    
    listData =fetch(url)
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
                        <button class="btn btn-sm btn-outline-info">Edit</button>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-danger"> Delete</button>
                    </div>
                </div>
            `
        wrapper.innerHTML+=items
        }
    })
}

BuildList()