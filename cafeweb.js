// HEADER

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

const closeCart = document.querySelector('#cart-close');

closeCart.addEventListener('click', () => {
    cartItem.classList.remove('active');
})

window.onscroll = () =>{
    // navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}







// start when the document is ready

if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start();
}

// ============== START =============
function start(){
    addEvents();
}

// =============== UPDATE & RERENDER ===========
function update(){
    addEvents();
    updateTotal();
}

// ========== ADD EVENTS =============
function addEvents() {
    // remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach(btn => {
        btn.addEventListener('click', handle_removeCartItem);
    });

    // Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantiy);
    });

    // add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn =>{
        btn.addEventListener("click", handle_addCartItem);
    });
}

// ============== HANDLE EVENTS FUNCTION ============
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".image").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // ADD PRODUCTS TO CART
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
}
function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}

function handle_changeItemQuantiy() {
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    // to keep it integer
    this.value = Math.floor(this.value);  

    update();
}



// ============== UPDATE & REMOVE FUNCTION =============
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");

    const totalElement = cartItem.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    // chỉ giữ lại 2 số sau số thập phân 
    total = total.toFixed(2);
    // or can use also
    // total = Math.round(total * 100) / 100;


    totalElement.innerHTML = "$" + total;
}




