{/* <input type="text" id="inputText">
        <button id="searchButton">Serach Hero</button>
        <button id="nextButton">Random Superhero</button>
    <div id="img"><img src="" alt=""></div> */}

const accessToken = '10223569763528853';
const baseURL = `https://superheroapi.com/api.php/${accessToken}`
const emojiArr = ['🧠','💪','🌪️','📶','🔋','⚔️'] 

const imgDiv = document.getElementById('img')
const nextButton = document.getElementById('nextButton')
const searchButton = document.getElementById('searchButton')
const inputText = document.getElementById('inputText')
const nameDiv = document.getElementById('name')
const leftContainer = document.getElementById('leftContainer')
const rightContainer = document.getElementById('rightContainer')

const getSuperheroById = (id,name) =>{
    fetch(`${baseURL}/${id}`)
    .then(response => response.json())
    .then(json =>{
        imgDiv.innerHTML= `<img src='${json.image.url}'>`
        nameDiv.innerHTML= `<span>${json.name}</span>`
        let powerstatsArr = Object.entries(json.powerstats)
        leftContainer.innerHTML =""
        let i=0
        for ([key, value] of powerstatsArr){
            leftContainer.innerHTML +=`<p>${emojiArr[i++]} ${key}: ${value}</p>`    
        } 
    })
    rightContainer.innerHTML='<img src="Boom.png">'
}
const getSuperheroByName = (name) =>{
    fetch(`${baseURL}/search/${name}`)
    .then(response => response.json())
    // .then(json => console.log(Object.keys(json.results).length ))
    .then(json => {
        imgDiv.innerHTML= `<img src='${json.results[Math.floor(Math.random()*(Object.keys(json.results).length))].image.url}'>`
        nameDiv.innerHTML= `<span>${json.results[Math.floor(Math.random()*(Object.keys(json.results).length))].name}</span>` 
        let powerstatsArr = Object.entries(json.results[Math.floor(Math.random()*(Object.keys(json.results).length))].powerstats)
        leftContainer.innerHTML =""
        for ([key, value] of powerstatsArr){
            leftContainer.innerHTML +=`<p>${key}: ${value}</p>`    
        }       
    })
    rightContainer.innerHTML='<img src="Boom.png">'
}

nextButton.onclick = () =>{
    inputText.value=""
    getSuperheroById(Math.ceil(Math.random()*731))   
}
searchButton.onclick = () => getSuperheroByName(inputText.value)

