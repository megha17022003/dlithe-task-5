// ** Register User and Move to Main Page **
const registerUser = () => {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    if (!name || !email) {
        alert("Please enter all details.");
        return;
    }

    localStorage.setItem("username", name);
    alert(`Welcome ${name}! Registration successful.`);
    showPage('mainPage');
};

// ** Destination Data **
const destinations = [
    { name: "Paris", country: "France", price: 1000, img: "travel/paris.png" },
    { name: "Tokyo", country: "Japan", price: 1200, img: "travel/tokyo.png" },
    { name: "New York", country: "USA", price: 900, img: "travel/new york.png" },
    { name: "Rome", country: "Italy", price: 1100, img: "travel/rome.png" },
    { name: "Goa", country: "India", price: 700, img: "travel/goa.png" },
    { name: "Dubai", country: "UAE", price: 1500, img: "travel/dubai.png" },
    { name: "London", country: "UK", price: 1300, img: "travel/london.png" },
    { name: "Sydney", country: "Australia", price: 1400, img: "travel/sydney.png" },
    { name: "Bangkok", country: "Thailand", price: 800, img: "travel/bangkok.png" },
    { name: "Bali", country: "Indonesia", price: 750, img: "travel/bali.png" }
];

// ** Display Destinations **
const displayDestinations = (destList = destinations) => {
    let list = document.getElementById("destinationList");
    list.innerHTML = "";
    
    destList.forEach(({ name, country, price, img }) => {
        let div = document.createElement("div");
        div.className = "destination";
        div.innerHTML = `
            <img src="${img}" alt="${name}">
            <br>${name} - ${country} ($${price})
            <br>
            <button onclick='addToWishlist(${JSON.stringify({ name, country, price, img })})'>❤️ Add to Wishlist</button>
        `;
        div.addEventListener("click", () => selectDestination({ name, country, price, img }));
        list.appendChild(div);
    });
};

// ** Wishlist Functions (Fix: Prevent Duplicate Entries & Ensure Dynamic Updates) **
const addToWishlist = (dest) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.some(item => item.name === dest.name)) {
        wishlist.push(dest);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${dest.name} added to your wishlist!`);
    } else {
        alert(`${dest.name} is already in your wishlist.`);
    }
};

const showWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let container = document.getElementById("wishlistContainer");

    container.innerHTML = wishlist.length === 0 ? "<p>No destinations in your wishlist.</p>" : "";

    wishlist.forEach(({ name, country, price, img }) => {
        let div = document.createElement("div");
        div.className = "destination";
        div.innerHTML = `
            <img src="${img}" alt="${name}">
            <br>${name} - ${country} ($${price})
            <br>
            <button onclick='removeFromWishlist("${name}")'>❌ Remove</button>
            <button onclick='selectDestination(${JSON.stringify({ name, country, price, img })})'>📍 Book Now</button>
        `;
        container.appendChild(div);
    });
};

const removeFromWishlist = (name) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(dest => dest.name !== name);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    showWishlist();
};

// ** Select Destination **
const selectDestination = (dest) => {
    localStorage.setItem("selectedDestination", JSON.stringify(dest));
    showPage('bookingPage');
    loadBookingPage();
};

// ** Load Booking Page **
const loadBookingPage = () => {
    let dest = JSON.parse(localStorage.getItem("selectedDestination"));

    if (!dest) {
        alert("No destination selected!");
        showPage('mainPage');
        return;
    }

    // Ensure elements exist before modifying them
    let imageElement = document.getElementById("destinationImage");
    let destinationText = document.getElementById("selectedDestination");
    let numTicketsInput = document.getElementById("numTickets");

    if (imageElement) imageElement.src = dest.img;
    if (destinationText) {
        destinationText.innerText = `You selected: ${dest.name}, ${dest.country} ($${dest.price})`;
    }

    // Ensure input exists before setting default value
    if (numTicketsInput) {
        numTicketsInput.value = 1; // Default ticket count
    }

    // Ensure `updatePrice()` doesn't throw an error
    if (typeof updatePrice === "function") {
        updatePrice();
    }
};

// ** Apply Discount Offers **
const applyDiscount = () => {
    let banner = document.getElementById("discountBanner");
    let discountDestinations = ["Paris", "Dubai", "Bali"];
    
    let discountAmount = 10; // 10% Discount
    banner.innerText = `🎉 Special Offer: ${discountAmount}% OFF on ${discountDestinations.join(", ")}!`;

    let discountedList = destinations.map(dest => {
        if (discountDestinations.includes(dest.name)) {
            return { ...dest, price: Math.round(dest.price * (1 - discountAmount / 100)) };
        }
        return dest;
    });

    displayDestinations(discountedList);
};

// ** Show Page Function (Fix: Ensure Wishlist Updates) **
const showPage = (pageId) => {
    document.querySelectorAll('.page').forEach(page => page.style.display = "none");
    document.getElementById(pageId).style.display = "block";

    if (pageId === "mainPage") {
        document.getElementById("username").innerText = localStorage.getItem("username");
        applyDiscount();
        showPreviousBookings();
    } else if (pageId === "bookingPage") {
        loadBookingPage();
    } else if (pageId === "wishlistPage") {
        showWishlist(); // Ensure wishlist updates when navigating to the page
    }
};

// ** Load Main Page on Startup **
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("username")) {
        showPage('mainPage');
        showPreviousBookings();
    }
});

// ** Event Listeners **
document.getElementById("searchInput").addEventListener("input", filterDestinations);
document.getElementById("countryFilter").addEventListener("change", filterByCountry);
document.getElementById("sortPrice").addEventListener("change", sortDestinations);
document.getElementById("numTickets").addEventListener("input", updatePrice);

// ** Logout Function **
// ** Logout Function (Fully Reset UI & Redirect to Register Page) **
function logout() {
    // Clear user-related data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("selectedDestination");

    // Reset the UI elements (if they exist)
    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    if (nameInput) nameInput.value = "";
    if (emailInput) emailInput.value = "";

    // Redirect to registration page and force a UI refresh
    showPage('registerPage');

    alert("You have been logged out successfully.");
}
// ** Confirm Booking & Save to History (Fixed) **
function confirmBooking() {
    let dest = JSON.parse(localStorage.getItem("selectedDestination"));
    let numTicketsInput = document.getElementById("numTickets");
    
    if (!dest) {
        alert("No destination selected!");
        return;
    }

    let numTickets = parseInt(numTicketsInput?.value) || 1;
    let paymentConfirmed = localStorage.getItem("paymentConfirmed") === "true";

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
        name: dest.name,
        country: dest.country,
        price: dest.price,
        numTickets,
        totalCost: dest.price * numTickets,
        paymentConfirmed,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert(`Booking confirmed for ${dest.name} with ${numTickets} ticket(s)!`);

    // Clear selected destination after booking
    localStorage.removeItem("selectedDestination");

    showPage('mainPage');
    showPreviousBookings();
}
// ** Show Previous Bookings **
function showPreviousBookings() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let bookingList = document.getElementById("previousBookings");
    bookingList.innerHTML = "";

    if (bookings.length === 0) {
        bookingList.innerHTML = "<p>No previous bookings found.</p>";
        return;
    }

    bookings.forEach(({ name, country, numTickets, totalCost, date, paymentConfirmed }, index) => {
        let div = document.createElement("div");
        div.className = "booking";
        div.innerHTML = `
            <strong>${name}, ${country}</strong> 
            - ${numTickets} Ticket(s) | 💰 $${totalCost} | 📅 ${date} 
            <br>Payment: ${paymentConfirmed ? "✅ Paid" : "❌ Not Paid"}
            <br><button onclick="cancelBooking(${index})">❌ Cancel Booking</button>
        `;
        bookingList.appendChild(div);
    });
}
// ** Cancel Booking & Update Local Storage **
function cancelBooking(index) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (index < 0 || index >= bookings.length) {
        alert("Invalid booking selected.");
        return;
    }

    let confirmCancel = confirm(`Are you sure you want to cancel the booking for ${bookings[index].name}?`);
    if (!confirmCancel) return;

    bookings.splice(index, 1); // Remove the selected booking
    localStorage.setItem("bookings", JSON.stringify(bookings)); // Update localStorage

    alert("Booking has been canceled successfully.");
    showPreviousBookings(); // Refresh booking list
}
// ** Show Previous Bookings (With Cancel Option) **
function showPreviousBookings() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let bookingList = document.getElementById("previousBookings");
    bookingList.innerHTML = "";

    if (bookings.length === 0) {
        bookingList.innerHTML = "<p>No previous bookings found.</p>";
        return;
    }

    bookings.forEach(({ name, country, numTickets, totalCost, date, paymentConfirmed }, index) => {
        let div = document.createElement("div");
        div.className = "booking";
        div.innerHTML = `
            <strong>${name}, ${country}</strong> 
            - ${numTickets} Ticket(s) | 💰 $${totalCost} | 📅 ${date} 
            <br>Payment: ${paymentConfirmed ? "✅ Paid" : "❌ Not Paid"}
            <br><button onclick="cancelBooking(${index})">❌ Cancel Booking</button>
        `;
        bookingList.appendChild(div);
    });
}

