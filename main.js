//  document.body.innerHTML = 'hello world'
 
//  const a = document.body.innerHTML

//  console.log(a)

let timer
let deleteFirstPhotoDelay


async function start() {
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    const data = await res.json()
    createBreedList(data.message)
 }

start()

function createBreedList(breedList){
    document.getElementById('breed').innerHTML = `
    <select onchange='loadByBreed(this.value)'>
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(breed => {
            return `<option>${breed}</option>
            `
        }).join('')}
    </select>
    
`
}

//prevent the choose a dog breed for show 
// the only job is load the data
async function loadByBreed(breed) {
    if(breed !== 'Choose a dog breed'){
      // fetch a choose of the req // on clide side
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await res.json()
        // document.getElementById('slide').innerHTML = data
        createSlideshow(data.message)
    }
}
function createSlideshow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    
    if (images.length > 1) {
      document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2
    if (images.length == 2) 
    currentPosition = 0
    timer = setInterval(nextSlide, 3000)
    } else {
      document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
    `
    }
  
    function nextSlide() {
      document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
      deleteFirstPhotoDelay = setTimeout(function () {
        document.querySelector(".slide").remove()
      }, 1000)
      if (currentPosition + 1 >= images.length) {
        currentPosition = 0
      } else {
        currentPosition++
      }
    }
  }