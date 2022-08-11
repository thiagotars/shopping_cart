const shopDiv = document.getElementById('shop')
const boxDiv = document.getElementById('container')
 
const shopItemData = [
    {
        id:'001',
        name: 'red',
        color: 'red',
        img: '1.jpeg'
    },

    {
        id:'002',
        name: 'blue',
        color: 'blue',
        img: '2.jpeg'
    },

    {
        id:'003',
        name: 'green',
        color: 'green',
        img: '3.jpeg'
    },

    {
        id:'004',
        name: 'purple',
        color: 'purple',
        img: '4.jpeg'
    },

    {
        id:'005',
        name: 'yellow',
        color: 'yellow',
        img: '5.jpeg'
    },

    {
        id:'006',
        name: 'pink',
        color: 'pink',
        img: '6.jpeg'
    }
]

let basket = JSON.parse(localStorage.getItem("data")) || []

const shopContainer = () => {

return (shopDiv.innerHTML = shopItemData.map(item => {
    let {id, name, color, img} = item
    let search = basket.find((x) => x.id === id) || []
    console.log(img)
    return`<div id="product-id-${id}"class="color-container">
            <div class="button-container">
            <button class="minus-btn" onclick="decrementNumber('${id}')">-</button>
            <div id="${id}" class="quantity">${search.units === undefined ? 0 : search.units}</div>
            <button class="plus-btn" onclick="incrementNumber('${id}')">+</button>
        </div>
        <div class="color" style="background-color: ${color}"></div>
        <p class="color-name">${name}</p>
        </div>`
}).join(''))
}

shopContainer()

const incrementNumber = (id) => {
    let itemID = id
    let search = basket.find((x) => x.id === itemID)
    
    if(search === undefined) {
        basket.push({id: itemID, units: 1}) 
    } else {
        search.units += 1
    }
    
    localStorage.setItem("data", JSON.stringify(basket))

    // console.log(basket)
    updateQuantity(itemID)
}

const decrementNumber = (id) => {
    let itemID = id
    let search = basket.find((x) => x.id === itemID)

    if (search === undefined) return;
    if(search.units === 0) return;
    else {
        search.units -= 1
    }

    updateQuantity(itemID)
    basket = basket.filter((x) => x.units !== 0)

    // console.log(basket)
    localStorage.setItem("data", JSON.stringify(basket))
}

const updateQuantity = (id) => {
    let search = basket.find((x)=> x.id === id)
    console.log(search)

    const quantityDiv = document.getElementById(id)
    quantityDiv.textContent = search.units
    console.log(basket)
    calculation()
}

const calculation = () => {

    console.log(basket)
    console.log(basket.map((x)=> x.units).reduce((x,y) => x + y))  
}


