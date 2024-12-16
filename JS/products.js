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
                        <div class="product-details" style="display: none;">
                            <p>Description: ${product.description}</p>
                            <p>Category: ${product.categories}</p>
                        </div>
                    `;
                    productContainer.insertAdjacentHTML("beforeend", detailsHTML);

                    
                    const moreInfoButton = document.createElement("button");
                    moreInfoButton.textContent = "See More"; 
                    moreInfoButton.className = "extraButton"; 

                    
                    const button = document.createElement("button");
                    button.textContent = "Add to Cart";
                    button.className = "add-to-cart";
                  

                    productContainer.appendChild(moreInfoButton);
                    productContainer.appendChild(button);

                    
                    moreInfoButton.addEventListener("click", () => {
                        const productDetails = productContainer.querySelector(".product-details");

                        
                        if (productDetails.style.display === "none") {
                            productDetails.style.display = "block"; 
                            moreInfoButton.textContent = "See Less"; 
                        } else {
                            productDetails.style.display = "none"; 
                            moreInfoButton.textContent = "See More"; 
                        }
                    });
                } else {
                    console.warn(`No product data for container at index ${index}`);
                }
            });
            
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
});
