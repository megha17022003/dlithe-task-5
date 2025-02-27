document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("newsList");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("search");
    const sortFilter = document.getElementById("sortFilter");
    const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
    const loadMoreBtn = document.getElementById("loadMore");
    const loadLessBtn = document.getElementById("loadLess");

    let darkMode = false;
    let currentView = "grid"; // Default view
    let initialNewsCount = 5; // First display only 5 news items

    let allNews = [
        { title: "AI Breakthrough in 2025", category: "Technology", views: 5000, date: "2025-02-20", content: "Researchers have made a major breakthrough in AI, improving deep learning algorithms. The new AI model is 50% more efficient in recognizing patterns and generating human-like responses. Experts believe that this innovation will revolutionize industries such as healthcare, finance, and robotics. AI-powered assistants are now able to understand human emotions better, leading to more personalized experiences." },
        { title: "Champions League Finals", category: "Sports", views: 8000, date: "2025-02-18", content: "The Champions League final was a thrilling encounter with last-minute goals securing victory. The match saw two of the biggest football clubs clash in a nail-biting 120-minute game. The final goal, scored in extra time, was a moment of pure magic that sent fans into celebration worldwide. Analysts say this will go down as one of the greatest finals in football history." },
        { title: "Stock Market Hits Record Highs", category: "Finance", views: 6000, date: "2025-02-22", content: "The global stock market saw an all-time high after recent positive economic indicators. Major indices such as the S&P 500 and Nasdaq soared, with tech stocks leading the charge. Investors are optimistic about the economic outlook, with increased job growth and consumer spending driving the market upwards. Experts warn, however, that market corrections may be imminent in the coming months." },
        { title: "New Cancer Treatment Discovered", category: "Health", views: 9000, date: "2025-02-21", content: "Scientists have discovered a new revolutionary cancer treatment that promises better survival rates. This breakthrough therapy targets cancer cells more precisely, reducing side effects compared to traditional chemotherapy. Early trials have shown a 70% improvement in patient recovery. The treatment is expected to be widely available within the next five years" },
        { title: "Hollywood Announces New Blockbusters", category: "Entertainment", views: 7000, date: "2025-02-19", content: "Several high-budget movies are set to release this summer, starring top actors. The most anticipated films include a sci-fi epic, a superhero sequel, and a psychological thriller. Fans are eagerly awaiting the return of their favorite franchises, with record-breaking ticket sales expected for opening weekends. Critics believe that this summer’s lineup could redefine modern cinema" }
    ];
    let extraNews = [
        { title: "Quantum Computing Advances", category: "Technology", views: 5500, date: "2025-02-23", content: "Quantum computers are now capable of solving problems that were previously impossible. This latest advancement in quantum processing speeds up complex calculations by a factor of 100. Experts predict that within a decade, quantum computing will disrupt fields like cybersecurity, pharmaceuticals, and AI research" },
        { title: "Olympics 2025 Preparations", category: "Sports", views: 7500, date: "2025-02-17", content: "Preparations for the upcoming Olympic Games are in full swing, with new venues being built. The host city has invested billions in infrastructure, aiming to deliver one of the most sustainable Olympics ever. Athletes from around the world are in intensive training, with many world records expected to be broken" }
    ];

    function displayNews(newsArray) {
        newsList.innerHTML = "";
        newsArray.forEach(news => {
            let newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `
                <h2>${news.title}</h2>
                <p class="news-content">${news.content.substring(0, 100)}...</p>
                <button class="read-more">Read More</button>
            `;
            newsList.appendChild(newsItem);
        });

        addReadMoreListeners();
        updateView();
    }

    function addReadMoreListeners() {
        document.querySelectorAll(".read-more").forEach(button => {
            button.addEventListener("click", function() {
                let content = this.previousElementSibling;
                if (this.textContent === "Read More") {
                    content.textContent = allNews.find(news => news.title === content.previousElementSibling.textContent).content;
                    this.textContent = "Read Less";
                } else {
                    content.textContent = content.textContent.substring(0, 100) + "...";
                    this.textContent = "Read More";
                }
            });
        });
    }

    function updateView() {
        if (currentView === "grid") {
            newsList.classList.add("grid-view");
            newsList.classList.remove("list-view");
        } else {
            newsList.classList.add("list-view");
            newsList.classList.remove("grid-view");
        }
    }

    window.toggleView = function(view) {
        currentView = view;
        updateView();
    };

    categoryFilter.addEventListener("change", () => {
        let selectedCategory = categoryFilter.value;
        let filteredNews = selectedCategory === "all" ? allNews : allNews.filter(news => news.category === selectedCategory);
        displayNews(filteredNews);
    });

    searchInput.addEventListener("input", () => {
        let searchText = searchInput.value.toLowerCase();
        let filteredNews = allNews.filter(news => news.title.toLowerCase().includes(searchText));
        displayNews(filteredNews);
    });

    sortFilter.addEventListener("change", () => {
        let sortedNews = [...allNews];

        switch (sortFilter.value) {
            case "latest":
                sortedNews.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "popular":
                sortedNews.sort((a, b) => b.views - a.views);
                break;
            case "relevant":
                let searchText = searchInput.value.toLowerCase();
                sortedNews = sortedNews.filter(news => news.title.toLowerCase().includes(searchText));
                break;
        }

        displayNews(sortedNews);
    });

    toggleDarkModeBtn.addEventListener("click", () => {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);
    });

    loadMoreBtn.addEventListener("click", () => {
        allNews = allNews.concat(extraNews);
        displayNews(allNews);
        loadMoreBtn.style.display = "none"; // Hide Load More
        loadLessBtn.style.display = "inline-block"; // Show Load Less
    });

    loadLessBtn.addEventListener("click", () => {
        allNews = allNews.slice(0, initialNewsCount);
        displayNews(allNews);
        loadMoreBtn.style.display = "inline-block"; // Show Load More
        loadLessBtn.style.display = "none"; // Hide Load Less
    });

    // Initially display only 5 news items
    displayNews(allNews.slice(0, initialNewsCount));
});