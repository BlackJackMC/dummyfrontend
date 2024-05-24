
function getProduct() {
    
}

function generateProduct(product) {
    // Change tag to capitalize only the first letter 
    if (product.tag) {
        product.tag = product.tag.toLowerCase();
        product.tag = product.tag.charAt(0).toUpperCase() + product.tag.substr(1);
    }
    const markup = `<div class="product-container" id="${product.id}">
    <img class="product-image" src="${product.src}" alt="${product.name}">
    <p class="sale">${product.sale ? `-${product.sale}%` : ""}</p>
    <p class="tag">${product.tag ? product.tag : ""}</p>
    
    <h3 class="product-name">${product.name}</h3>
    <p class="product-description">${product.desc}</p>
    <h4 class="product-price">${product.price}</h4>
    <p class="product-old-price"><del>${product.old_price ? product.old_price : ""}</del></p>
    <div class="product-hover-utility">
        <button class="product-add-to-cart">Add to cart</button>
        <a href=""><span class="material-symbols-outlined">share</span>Share</a>
        <a href=""><span class="material-symbols-outlined">sync_alt</span>Compare</a>
        <a href=""><span class="material-symbols-outlined">favorite</span>Like</a>
    </div>
</div>
`;
    const sec_3 = document.getElementById("section-3");
    sec_3.insertAdjacentHTML("beforeend",markup)  
}

function genProductTest() {
    product = {id : "sylthe", name : "Sylthe", sale : "0", desc : "ABC", price : "1.000.000", old_price : "1.500.000", sale: 30, tag : "new", src : "../image/Home/image 1.png"};
    generateProduct(product);
}

genProductTest()