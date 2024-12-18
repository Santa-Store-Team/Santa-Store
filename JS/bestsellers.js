async function fetchBestSellers() {
    try {
        const response = await fetch('https://ecommerce-api-sepia.vercel.app/products/best-sellers');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();

        const bestSellersContainer = document.querySelector(".best-sellers-container");

        // Loop through the products and render each one
        products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            // Product Image
            const imgElement = document.createElement("img");
            imgElement.src = product.image;
            imgElement.alt = product.name;
            imgElement.classList.add("product-image");

            // Product Name
            const nameElement = document.createElement("h3");
            nameElement.innerHTML = product.name;
            nameElement.classList.add("product-name");

            // Product Description
            const descriptionElement = document.createElement("p");
            descriptionElement.innerHTML = product.description;
            descriptionElement.classList.add("product-description")

            // Product Price
            const priceElement = document.createElement("p");
        priceElement.innerHTML = `${product.price.$numberDecimal} SEK`;
            priceElement.classList.add("product-price");

            // Append all elements to the product card
            productCard.appendChild(imgElement);
            productCard.appendChild(nameElement);
            productCard.appendChild(descriptionElement);
            productCard.appendChild(priceElement);
            
            // Append product card to the container
            bestSellersContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching best sellers:", error);
    }
}

fetchBestSellers();
