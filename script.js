let elForm = document.querySelector(".forma")
let city = document.querySelector(".city")
let wrapper = document.querySelector(".wrapper")


let arr = ["tashkent, moscow"]

elForm.addEventListener("submit", function (e) {
    e.preventDefault()
    let address = city.value
    fetch(`https://api.weatherapi.com/v1/current.json?key=d6ebff5a04da407d8b444856222111&q=${address}`)
        .then(res => res.json())
        .then(data => render(data))
})




function render(data) {
    if (!data.location?.name) {
        alert("To'g'ri kirit uka")
        return
    }
    wrapper.innerHTML = `
    <button class="plus-btn btn bg-transparent fs-1 fw-bold position-absolute end-0 " id="${data.location?.name}" style="top:-15px">+</button>
    <img src="https:${data.current?.condition.icon}" alt="icon">
    <p class=" text-warning fs-4 fw-bold mb-1">${data.location?.name}</p>
    <p class=" fw-bold mb-1">${data.location?.country}</p>
    <p class=" mb-1">${data.location?.tz_id}</p>
    <p class=" fw-bold">${data.current?.temp_c}C <sup>o</sup></p>
    `
}

$(".wrapper").addEventListener("click", function (e) {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(e.target.id)) {
        cities.push(e.target.id)
        localStorage.setItem("cities", JSON.stringify(cities))
    } else {
        alert("avval qo'shilgan !")
    }
    bookmarkRender(cities)
})


function bookmarkRender(cities) {
    let city = {}

    $(".bookmark").innerHTML = null
    cities.forEach(async (el) => {
        await fetch(`https://api.weatherapi.com/v1/current.json?key=d6ebff5a04da407d8b444856222111&q=${el}`)
            .then(res => res.json())
            .then(data => city = data)

        let div = createElement("div", "weather-card", `
      <img src="https:${city.current?.condition.icon}" alt="icon">
      <p class=" text-warning fs-4 fw-bold mb-1">${city.location?.name}</p>
      <p class=" fw-bold mb-1">${city.location?.country}</p>
      <p class=" mb-1">${city.location?.tz_id}</p>
      <p class=" fw-bold">${city.current?.temp_c}C <sup>o</sup></p>`)

        $(".bookmark").appendChild(div)
    })
}

let a = JSON.parse(localStorage.getItem("cities")) || []
bookmarkRender(a)