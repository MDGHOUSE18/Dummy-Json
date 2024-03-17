$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

$(".menu-items a").click(function () {
  $("#checkbox").prop("checked", false);
});

// display all products

fetch('https://dummyjson.com/products')
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(products => {
        console.log("Products:", products); // Log the products to inspect the structure
        const productCardsContainer = document.getElementById('productCards');

        // Check if products is an array or an object with products property
        if (Array.isArray(products)) {
            // If products is already an array, proceed as before
            products.forEach(product => {
                const card = createProductCard(product);
                productCardsContainer.appendChild(card);
            });
        } else if (Array.isArray(products.products)) {
            // If products is an object with a products property containing an array, use that array
            products.products.forEach(product => {
                const card = createProductCard(product);
                productCardsContainer.appendChild(card);
            });
        } else {
            throw new Error('Products data is not in the expected format');
        }
    })
    .catch(error => {
        console.error("Error fetching products:", error);
    });

// Function to create a product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `Price: $${product.price}`;

    const discountPercentage = document.createElement('p');
    discountPercentage.textContent = `Discount: ${product.discountPercentage}%`;

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${product.rating}`;

    const stock = document.createElement('p');
    stock.textContent = `Stock: ${product.stock}`;

    const brand = document.createElement('p');
    brand.textContent = `Brand: ${product.brand}`;

    const category = document.createElement('p');
    category.textContent = `Category: ${product.category}`;

    const thumbnail = document.createElement('img');
    thumbnail.src = product.thumbnail;
    thumbnail.alt = product.title;
    thumbnail.classList.add('thumbnail');

    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images-container');

    product.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = product.title;
        imagesContainer.appendChild(img);
    });
    card.appendChild(imagesContainer);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(discountPercentage);
    card.appendChild(rating);
    card.appendChild(stock);
    card.appendChild(brand);
    card.appendChild(category);
    // card.appendChild(thumbnail);
    

    return card;
}


