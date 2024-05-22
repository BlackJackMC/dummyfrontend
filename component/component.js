
function getProduct() {

}

function generateProduct(product) {
    const markup = `<div class="product-container" id="${product.id}">
    <img class="product-image" src="${product.src}" alt="${product.name}">
    <span class="sale">
        <p>${product.sale != 0 ? `-${product.sale}%` : ""}</p>
    </span>
    
    <h3 class="product-name">${product.name}</h3>
    <p class="product-description">${product.desc}</p>
    <h4 class="product-price">${product.price}</h4>
    <p class="product-old-price"><del>${product.old_price ? product.old_price : ""}</del></p>
</div>
`;
    const sec_3 = document.getElementById("section-3");
    sec_3.insertAdjacentHTML("beforeend",markup)  
}

function test() {
    product = {id : "sylthe", name : "Sylthe", sale : "0", desc : "ABC", price : "1.000.000", old_price : null, src : "../image/Home/image 1.png"};
    generateProduct(product);
}

// test()