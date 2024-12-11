document.addEventListener("DOMContentLoaded", () => {
    const apiEndpoint = "https://ecommerce-api-opal.vercel.app/products"; 

    fetch(apiEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((products) => {
            console.log(products); 

            const productContainers = document.querySelectorAll(".product");

            productContainers.forEach((productContainer, index) => {
                const product = products[index];

                if (product) {
                    const imgElement = productContainer.querySelector("img");

                    
                    imgElement.src = product.image;
                    imgElement.alt = product.name;

                    
                    const price = product.price && product.price.$numberDecimal
                        ? parseFloat(product.price.$numberDecimal).toFixed(2)  
                        : 'Price not available';

                    
                    const detailsHTML = `
                        <h2>Product Name: ${product.name}</h2>
                        <p>Price: $${price}</p>
                        <p>Description: ${product.description}</p>
                        <p>Category: ${product.categories}</p>
                    `;
                    productContainer.insertAdjacentHTML("beforeend", detailsHTML);

                    console.log(`Updated product ${index + 1}:`, product.name);
                } else {
                    console.warn(`No product data for container at index ${index}`);
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
});
