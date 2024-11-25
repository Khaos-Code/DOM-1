// Preselected "deleted" image URL
const deletedImageURL = "deleted.png"; // Replace with your actual image path

// Select all product cards
const cards = document.querySelectorAll('.card');

// Select the total price element
const totalPriceElement = document.querySelector('.total');

// Function to update the total price
const updateTotalPrice = () => {
  let total = 0;

  cards.forEach(card => {
    // Get unit price and quantity
    const unitPrice = parseFloat(card.querySelector('.unit-price').textContent.replace('$', ''));
    const quantity = parseInt(card.querySelector('.quantity').textContent);

    // Add the total price for each item
    total += unitPrice * quantity;
  });

  // Update the total price display
  totalPriceElement.textContent = `${total} $`;
};

// Loop through each card to attach event listeners
cards.forEach(card => {
  // Get elements within the card
  const plusBtn = card.querySelector('.fa-plus-circle');
  const minusBtn = card.querySelector('.fa-minus-circle');
  const quantityElement = card.querySelector('.quantity');
  const deleteBtn = card.querySelector('.fa-trash-alt');
  const likeBtn = card.querySelector('.fa-heart');
  const image = card.querySelector('.card-img-top');
  const cardTitle = card.querySelector('.card-title');
  const cardText = card.querySelector('.card-text');

  // Store the original image source for toggling
  image.dataset.originalSrc = image.src;

  // Increment quantity
  plusBtn.addEventListener('click', () => {
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    updateTotalPrice(); // Update total price on increment
  });

  // Decrement quantity
  minusBtn.addEventListener('click', () => {
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 0) {
      quantityElement.textContent = currentQuantity - 1;
      updateTotalPrice(); // Update total price on decrement
    }
  });

  // Delete functionality (toggle deleted state)
  deleteBtn.addEventListener('click', () => {
    if (!card.classList.contains('deleted')) {
      // Mark as deleted
      image.src = deletedImageURL;
      cardTitle.style.textDecoration = "line-through";
      cardText.style.textDecoration = "line-through";
      card.classList.add('deleted');
    } else {
      // Restore original state
      image.src = image.dataset.originalSrc;
      cardTitle.style.textDecoration = "none";
      cardText.style.textDecoration = "none";
      card.classList.remove('deleted');
    }
  });

  // Like functionality (toggle heart color)
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
    if (likeBtn.classList.contains('liked')) {
      likeBtn.style.color = "red"; // Change to red when liked
    } else {
      likeBtn.style.color = "black"; // Reset to black when unliked
    }
  });
});

// Initial calculation of total price
updateTotalPrice();
