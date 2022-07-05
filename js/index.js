import { crearProducto, obtenerProductos, obtenerProducto } from "./firebase.js";

const cart = []

let total = 0

const completar = document.querySelector('.completar')
const abandonar = document.querySelector('.abandonar')

const emptyCart = () => {
    
    total = 0 

    document.querySelector('.visualTotal').textContent = total

    cart.length = 0
    
    document.querySelector('.innerCart').innerHTML = ''
}

completar.addEventListener('click', emptyCart)
abandonar.addEventListener('click', emptyCart)

const renderCart =() =>{
    const innerCart = document.querySelector('.innerCart')

    innerCart.innerHTML='' //Esto limpia la funcion para que no traiga del DOM todo el array cart

    cart.forEach (product => {
        const card = document.createElement('div')
        card.classList = 'card mb-3'
        card.innerHTML = `<div class="row g-0">
        <div class="col-md-4">
          <img src=${product.data().Imagen}  class="img-fluid rounded-start" alt=${product.data().Nombre}>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.data().Nombre}</h5>
            <p class="card-text">$${product.data().Precio} </p>
           
            </div>
        </div>
      </div>
    </div>`  

    innerCart.append(card)
    })
}

const checkCart = (id) => cart.some(product => product.id === id)

const updateTotal = (price) =>{

    const visualTotal = document.querySelector('.visualTotal')

    total += price

    visualTotal.textContent = total


}

const addToCart = async (e) => {
    const productid = e.target.id
    
    if (checkCart (productid)){
        return false
    
    }else{
    
        const productToCart = await obtenerProducto(e.target.id)
        
        updateTotal (productToCart.data().Precio)
        
        cart.push (productToCart)
        
        renderCart()
    }   

}

const addEvent = () =>{
    const buybtns = document.querySelectorAll('.buybtn')
    buybtns.forEach(btn => btn.addEventListener('click', addToCart))
}

const renderCards =  async (productsArr) => {
    const products = await productsArr
    const cards = document.querySelector('.cards')

    products.forEach(product => {
        const card = document.createElement('div')

        card.classList = 'card col-12 col-xl-6'

        card.innerHTML = `
        <img src=${product.data().Imagen} class="card-img-top productImg" alt=${product.data().Nombre}>
        <div class="card-body">
          <h5 class="card-title">${product.data().Nombre}</h5>
          <p class="card-text text-success">$${product.data().Precio} </p>
          <a href="#" class="btn btn-dark buybtn" id=${product.id}>Comprar</a>
        </div>
      </div>`

    cards.append(card)
    });

    addEvent()

}

renderCards(obtenerProductos())
