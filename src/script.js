// const shopDiv = document.getElementById('shop')
// const boxDiv = document.getElementById('container')

// let basket = JSON.parse(localStorage.getItem("data")) || []

// const shopContainer = () => {

// return (shopDiv.innerHTML = shopItemData.map(item => {
//     let {id, name, color, img} = item
//     let search = basket.find((x) => x.id === id) || []
//     console.log(img)
//     return`<div id="product-id-${id}"class="color-container">
//             <div class="button-container">
//             <button class="minus-btn" onclick="decrementNumber('${id}')">-</button>
//             <div id="${id}" class="quantity">${search.units === undefined ? 0 : search.units}</div>
//             <button class="plus-btn" onclick="incrementNumber('${id}')">+</button>
//         </div>
//         <div class="color" style="background-color: ${color}"></div>
//         <p class="color-name">${name}</p>
//         </div>`
// }).join(''))
// }

// shopContainer()

// const incrementNumber = (id) => {
//     let itemID = id
//     let search = basket.find((x) => x.id === itemID)
    
//     if(search === undefined) {
//         basket.push({id: itemID, units: 1}) 
//     } else {
//         search.units += 1
//     }
    
//     localStorage.setItem("data", JSON.stringify(basket))

//     // console.log(basket)
//     updateQuantity(itemID)
// }

// const decrementNumber = (id) => {
//     let itemID = id
//     let search = basket.find((x) => x.id === itemID)

//     if (search === undefined) return;
//     if(search.units === 0) return;
//     else {
//         search.units -= 1
//     }

//     updateQuantity(itemID)
//     basket = basket.filter((x) => x.units !== 0)

//     // console.log(basket)
//     localStorage.setItem("data", JSON.stringify(basket))
// }

// const updateQuantity = (id) => {
//     let search = basket.find((x)=> x.id === id)
//     console.log(search)

//     const quantityDiv = document.getElementById(id)
//     quantityDiv.textContent = search.units
//     console.log(basket)
//     calculation()
// }

// const calculation = () => {

//     console.log(basket)
//     console.log(basket.map((x)=> x.units).reduce((x,y) => x + y))  
// }
// calculation()







const shopDiv = document.getElementById('shop')
const boxDiv = document.getElementById('container')
console.log(shopItemData)
let basket = JSON.parse(localStorage.getItem("data")) || []


const shopContainer = () => {

    return (shopDiv.innerHTML = shopItemData.map(item => {
        let { id, name, color, img } = item
        let search = basket.find((x) => x.id === id) || []
        console.log(img)
        return `<div id="product-id-${id}"class="color-container">
            <div class="button-container">
            <button class="minus-btn" onclick="decrementNumber('${id}', '${color}')">-</button>
            <div id="${id}" class="quantity">${search.units === undefined ? 0 : search.units}</div>
            <button class="plus-btn" onclick="incrementNumber('${id}', '${color}')">+</button>
        </div>
        <div class="color" style="background-color: ${color}"></div>
        <p class="color-name">${name}</p>
        </div>`
    }).join(''))
}


shopContainer()

let colorPickBasket = JSON.parse(localStorage.getItem("color")) || []


const incrementNumber = (id, color) => {
    let itemID = id
    let itemColor = color
    let search = basket.find((x) => x.id === itemID)

    if (search === undefined) {
        basket.push({ id: itemID, units: 1, color: itemColor })
    } else if (calculation() === 6) {
        return
    } else {
        search.units += 1
    }
    updateQuantity(itemID)

    colorPickBasket.push(color)
    updateBox(colorPickBasket)

    localStorage.setItem("data", JSON.stringify(basket))
    localStorage.setItem("color", JSON.stringify(colorPickBasket))
}


const decrementNumber = (id, color) => {
    let itemID = id
    let search = basket.find((x) => x.id === itemID)

    if (search === undefined) return
    else if (search.units === 0) return
    else {
        search.units -= 1
    }

    let index = colorPickBasket.indexOf(color)
    if (index > -1) {
        colorPickBasket.splice(index, 1)
    }

    updateQuantity(itemID)
    basket = basket.filter((x) => x.units !== 0)

    updateBox(colorPickBasket)

    localStorage.setItem("data", JSON.stringify(basket))
    localStorage.setItem("color", JSON.stringify(colorPickBasket))
}


const updateQuantity = (id) => {
    let search = basket.find((x) => x.id === id)
    console.log(search)

    const quantityDiv = document.getElementById(id)
    quantityDiv.textContent = search.units
    console.log(basket)
    calculation()

}


updateBox = (pickedColorArr) => {
    console.log(pickedColorArr)
    boxDiv.innerHTML = pickedColorArr.map(color => {
        return `
        <div id="item1" style="background-color: ${color}"class="item"></div>
        `
    }).join('')
}


const calculation = () => {
    return basket.map((x) => x.units).reduce((x, y) => x + y)
}


calculation()
updateBox(colorPickBasket)
console.log(calculation())

