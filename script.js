document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Menu Logic (Existing) ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = (navLinks.style.display === 'flex') ? 'none' : 'flex';
        // (Keeping your original styling logic here...)
        if(navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(246, 244, 240, 0.95)';
            navLinks.style.padding = '1rem 0';
            navLinks.style.textAlign = 'center';
        }
    });

    // --- 2. Enhanced Cart Logic ---
    let cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const floatingCart = document.getElementById('floating-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalDisplay = document.getElementById('cart-total-display');
    const whatsappBtn = document.getElementById('whatsapp-checkout-btn');

    // Add to Cart Function
    document.querySelectorAll('.product-card').forEach(card => {
        const button = card.querySelector('.add-to-cart-btn');
        const title = card.querySelector('h4').innerText;
        const priceText = card.querySelector('.price').innerText;
        const price = parseFloat(priceText.replace('$', ''));

        button.addEventListener('click', () => {
            // Add to array
            cart.push({ title, price });
            updateCartUI();

            // Original Button Animation
            button.innerText = "Added!";
            button.style.backgroundColor = "#A67B5B";
            button.style.color = "#fff";
            
            floatingCart.style.transform = "scale(1.2)";
            setTimeout(() => { floatingCart.style.transform = "scale(1)"; }, 200);
            setTimeout(() => {
                button.innerText = "Add to Cart";
                button.style.backgroundColor = "transparent";
                button.style.color = "#3A2C23";
            }, 1000);
        });
    });

    function updateCartUI() {
        cartCountElement.innerText = cart.length;
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.marginBottom = "10px";
            div.innerHTML = `<span>${item.title}</span> <span>$${item.price.toFixed(2)}</span>`;
            cartItemsList.appendChild(div);
        });
        cartTotalDisplay.innerText = `$${total.toFixed(2)}`;
    }

    // Open/Close Cart
    floatingCart.addEventListener('click', () => cartOverlay.style.display = 'block');
    document.getElementById('close-cart').addEventListener('click', () => cartOverlay.style.display = 'none');

    // --- 3. THE WHATSAPP REDIRECT (The Money Maker) ---
    whatsappBtn.addEventListener('click', () => {
        if (cart.length === 0) return alert("Your cart is empty!");

        const phoneNumber = "2348029405289"; // Your testing number or client's number
        let message = "Hello! I'd like to place an order from your AVANO catalog:\n\n";
        
        cart.forEach((item, i) => {
            message += `${i + 1}. ${item.title} - $${item.price.toFixed(2)}\n`;
        });

        message += `\n*Total: ${cartTotalDisplay.innerText}*`;
        message += `\n\nIs this available?`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    });
});
