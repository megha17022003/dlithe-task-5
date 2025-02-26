document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("newsList");
    const bookmarkList = document.getElementById("bookmarkList");
    
    let allNews = [
        { title: "AI Breakthrough in 2025", category: "Technology", views: 5000, date: "2025-02-20", content: "Researchers have made a major AI breakthrough..." },
        { title: "Champions League Finals", category: "Sports", views: 8000, date: "2025-02-18", content: "The Champions League final was a thrilling encounter..." },
        { title: "Stock Market Hits Record Highs", category: "Finance", views: 6000, date: "2025-02-22", content: "The stock market saw an all-time high after positive indicators..." },
        { title: "New Cancer Treatment Discovered", category: "Health", views: 9000, date: "2025-02-21", content: "Scientists have discovered a new cancer treatment..." },
        { title: "Hollywood Announces New Blockbusters", category: "Entertainment", views: 7000, date: "2025-02-19", content: "Several blockbuster movies are set to release this summer..." }
    ];

    // ** Display News Articles **
    const displayNews = (newsArray) => {
        newsList.innerHTML = newsArray.map(({ title, content }) => `
            <div class="news-item">
                <h2>${title}</h2>
                <p class="news-content">${content.substring(0, 100)}...</p>
                <button class="read-more">Read More</button>
                <button class="bookmark" data-title="${title}">⭐ Bookmark</button>
            </div>
        `).join("");
    };

    // ** Show Bookmarks **
    const showBookmarks = () => {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        
        if (bookmarks.length === 0) {
            bookmarkList.innerHTML = "<p>No bookmarks yet.</p>";
            return;
        }

        bookmarkList.innerHTML = bookmarks.map(title => `
            <div class="bookmark-item">
                <h3>${title}</h3>
                <button class="remove-bookmark" data-title="${title}">❌ Remove</button>
            </div>
        `).join("");
    };

    // ** Add Bookmark Functionality **
    const saveBookmark = (title) => {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

        if (!bookmarks.includes(title)) {
            bookmarks.push(title);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            alert(`"${title}" bookmarked!`);
            showBookmarks(); // Refresh the bookmark list
        } else {
            alert(`"${title}" is already bookmarked.`);
        }
    };

    // ** Remove Bookmark Functionality **
    const removeBookmark = (title) => {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        bookmarks = bookmarks.filter(item => item !== title);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        showBookmarks(); // Refresh the list
    };

    // ** Event Delegation for Read More & Bookmark **
    newsList.addEventListener("click", (event) => {
        if (event.target.classList.contains("read-more")) {
            const content = event.target.previousElementSibling;
            const newsItem = allNews.find(news => news.title === content.previousElementSibling.textContent);

            if (event.target.textContent === "Read More") {
                content.textContent = newsItem.content;
                event.target.textContent = "Read Less";
            } else {
                content.textContent = newsItem.content.substring(0, 100) + "...";
                event.target.textContent = "Read More";
            }
        }

        if (event.target.classList.contains("bookmark")) {
            const title = event.target.dataset.title;
            saveBookmark(title);
        }
    });

    // ** Event Delegation for Removing Bookmarks **
    bookmarkList.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-bookmark")) {
            const title = event.target.dataset.title;
            removeBookmark(title);
        }
    });

    // ** Initialize News & Bookmarks on Page Load **
    displayNews(allNews);
    showBookmarks();
});
