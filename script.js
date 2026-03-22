document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(246, 244, 240, 0.95)';
            navLinks.style.padding = '1rem 0';
            navLinks.style.textAlign = 'center';
            navLinks.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        }
    });

    // 2. Add to Cart Logic
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    const floatingCart = document.getElementById('floating-cart');
    let itemsInCart = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Increment cart count
            itemsInCart++;
            cartCountElement.innerText = itemsInCart;

            // Change button text temporarily to show it worked
            const originalText = e.target.innerText;
            e.target.innerText = "Added!";
            e.target.style.backgroundColor = "#A67B5B"; // Match accent color
            e.target.style.color = "#fff";
            e.target.style.borderColor = "#A67B5B";

            // Add a little bounce animation to the floating cart
            floatingCart.style.transform = "scale(1.2)";
            setTimeout(() => {
                floatingCart.style.transform = "scale(1)";
            }, 200);

            // Reset button text after 1.5 seconds
            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#3A2C23";
                e.target.style.borderColor = "#3A2C23";
            }, 1500);
        });
    });
});

