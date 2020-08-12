function BuildList(){
    url='http://localhost:8000/tasklist/'

    fetch(url)
    .then((res)=>res.json())
    .then((data)=>console.log(data))
}

BuildList()