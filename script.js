const pages = ['Introduction', '1.Assemble', '2.Coding'];

async function loadPage(page) {
    if (!pages.includes(page)) {
        document.getElementById("content").innerHTML = "<p>Page not found.</p>";
        return;
    }
    try {
        const response = await fetch(`docs/${encodeURIComponent(page)}.md`);
        const text = await response.text();
        const htmlContent = marked.parse(text);

        document.getElementById("content").innerHTML = htmlContent;

        assignHeaderIDs(); // Assign IDs to headers
        generateTOC(); // Generate Table of Contents
        updateActiveMenu(page); // Highlight active menu item
    } catch (error) {
        console.error("Error loading page:", error);
        document.getElementById("content").innerHTML = "<p>Error loading content.</p>";
    }
}


function updateActiveMenu(page) {
    document.querySelectorAll(".sidebar ul li a").forEach(link => {
        link.classList.remove("active"); // Remove active class from all links
        const linkHash = link.getAttribute("href").replace('#', '').trim();
        if (linkHash === page) {
            link.classList.add("active"); // Add active class to matching link
        }
    });
}

// Function to handle hash changes
function handleHashChange() {
    const currentPage = window.location.hash.replace("#", "") || "Introduction"; // Default to 'Introduction'
    loadPage(currentPage);
}

// Assign unique IDs to headers for TOC
function assignHeaderIDs() {
    const contentDiv = document.getElementById("content");
    const headers = contentDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headers.forEach(header => {
        const text = header.innerText || header.textContent;
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        header.id = id;
    });
}

function generateTOC() {
    const tocList = document.getElementById("toc-list");
    tocList.innerHTML = ""; // Clear existing TOC items

    const contentDiv = document.getElementById("content");
    const headers = contentDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headers.forEach(header => {
        const level = parseInt(header.tagName.charAt(1)); // Get heading level (e.g., 1 for <h1>)
        const tocItem = document.createElement("li");
        tocItem.classList.add(`heading-${level}`);

        const tocLink = document.createElement("a");
        tocLink.href = `#${header.id}`;
        tocLink.textContent = header.textContent;

        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });
}



document.addEventListener("DOMContentLoaded", function () {
    const currentPage = decodeURIComponent(window.location.hash.replace("#", "")) || "Introduction"; // Default to 'Introduction'
    loadPage(currentPage);

    window.addEventListener("hashchange", () => {
        const newPage = decodeURIComponent(window.location.hash.replace("#", ""));
        loadPage(newPage);
    });
});
