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

function generateProduct(product,element) {
    if (product.tag) {
        product.tag = capitalizeFirstLetter(product.tag)
    }
    if (product.image) {
        product.image = "data:image/png;base64," + product.image;
    }
    let old_price = null;
    if (product.discount) {
        old_price = product.price * 100 / product.discount;
        old_price = Math.round(old_price / 1000) * 1000;
        old_price = changePriceFormat(old_price);
    }
    product.price = changePriceFormat(product.price);
    product.unit_price = capitalizeFirstLetter(product.unit_price);
    const markup = `<div class="production-container" id="${product.name}">
    <div class="hidden-info">
        <button class="add-to-cart-button">
            Add to cart
        </button>
        <p class="action-share">
            <span class="material-symbols-outlined icon-filled">share</span>
            Share
        </p>
        <p class="action-compare">
            <span class="material-symbols-outlined">swap_horiz</span>
            Compare
        </p>
        <p class="action-compare">
            <span class="material-symbols-outlined">favorite</span>
            Like
        </p>
    </div>
    <img class="production-image" src="${product.image}" alt="${product.name}">
    ${product.discount != 0 ? `<span class="production-sale discount"><p>-${product.discount}%</p></span>` : ""}
    ${product.tag.toLowerCase() == "new" ? `<span class="production-sale new"><p>New</p></span>` : ""}

    <h3 class="production-name">${product.name}</h3>
    <p class="production-description">${product.short_desc}</p>
    <h4 class="production-price">${product.unit_price} ${product.price}</h4>
    <p class="production-old-price"><del>${old_price == null ? "" : product.unit_price + " " + old_price}</del></p>
</div>`

    element.insertAdjacentHTML("beforeend",markup)
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
    let lastItem = window.location.href;
    lastItem = lastItem.substring(lastItem.lastIndexOf('/') + 1)
    const content = await getProduct();
    if (lastItem == "index.html") {
        for (id in content) {
            generateProduct(content[id],document.getElementById("production").getElementsByClassName("row")[0]);
        }
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
