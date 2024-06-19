function capitalizeFirstLetter(str) {
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return words.join(" ");
}

function reverse(s){
    return s.split("").reverse().join("");
}

function changePriceFormat(price) {
    price = price.toString();
    price = reverse(price);
    price = price.match(/.{1,3}/g);
    return reverse(price.join("."))
}

function generateProduct(product) {
    if (product.tag) {
        product.tag = capitalizeFirstLetter(product.tag)
    }
    if (product.image) {
        product.image = "data:image/png;base64," + product.image;
    }
    product.price = changePriceFormat(product.price);
    product.unit_price = capitalizeFirstLetter(product.unit_price);
    const markup = `<div class="product-container" id="${product.name}">
    <img class="product-image" src="${product.image}" alt="${product.name}">
    <p class="discount">${product.discount ? `-${product.discount}%` : ""}</p>
    <p class="tag">${product.tag ? product.tag : ""}</p>
    
    <h3 class="product-name">${product.name}</h3>
    <p class="product-description">${product.short_desc}</p>
    <h4 class="product-price">${product.unit_price} ${product.price}</h4>
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

// product: 
//     - discount (int)
//     - image (base64)
//     - name (string)
//     - price (int)
//     - short_desc (string)
//     - tag (string)
//     - unit_price(string)



async function getProduct() {
    if (localStorage.getItem("products") !== null) return JSON.parse(localStorage.getItem("products"));
    // console.log("Test");
    const response = await fetch("https://dummyapi-0uzr.onrender.com/products");
    let content = await response.json();
    content = content.product_list;
    // console.log(content);
    localStorage.setItem("products",JSON.stringify(content));
    return content;
}

async function generateAllProduct() {
    const content = await getProduct();
    for (id in content) {
        generateProduct(content[id]);
    }
}

function genProductTest() {
    product = {discount : 30, name : "Syltherine", price : 2500000, short_desc : "Stylish cafe chair", tag : "", unit_price : "rp"}
    generateProduct(product);
}

function main() {
    // genProductTest();
    // getProduct();
    generateAllProduct();
}

main();
