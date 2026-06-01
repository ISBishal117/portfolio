// Select all product items
let list = document.querySelectorAll('.list .item');

// Loop through each item to add click event listeners
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function(e) {
        // Only trigger if the clicked element has the class 'addtocard'
        if (e.target.closest('.addtocard')) {
            
            // Get the current item's data-key
            let key = this.getAttribute('data-key');
            
            // Select the cart list
            let listCard = document.querySelector('.listCard');
            
            // Check if item already exists in cart
            let check = false;
            let listCardItems = listCard.querySelectorAll('.item');
            
            for (let j = 0; j < listCardItems.length; j++) {
                if (listCardItems[j].getAttribute('data-key') === key) {
                    check = true;
                    
                    // Add 'danger' class for flash effect
                    this.classList.add('danger');
                    
                    // Remove 'danger' class after 1 second
                    setTimeout(() => {
                        this.classList.remove('danger');
                    }, 1000);
                    break;
                }
            }

            // If not found in cart, add it
            if (!check) {
                // Create a clone of the item
                let itemNew = this.cloneNode(true);
                
                // Add to cart list
                listCard.appendChild(itemNew);
                
                // Update UI: Hide 'Add' button, Show 'Remove' button for the ORIGINAL item in the list
                this.querySelector('.addtocard').style.display = 'none';
                this.querySelector('.remote').style.display = 'block';
            }
        }
    });
}

// Function to remove item from cart
function remove(key) {
    key = String(key); // fix at the top, covers everything below
    let listCard = document.querySelectorAll('.listCard .item');
    
    for (let i = 0; i < listCard.length; i++) {
        if (listCard[i].getAttribute('data-key') === key) {
            listCard[i].remove();
            
            let originalItem = document.querySelector(`.list .item[data-key="${key}"]`);
            if (originalItem) {
                originalItem.querySelector('.addtocard').style.display = 'inline-block';
                originalItem.querySelector('.remote').style.display = 'none';
            }
            break;
        }
    }
}