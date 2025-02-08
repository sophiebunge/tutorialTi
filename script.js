const pages = ['Introduction', '1.Assemble', '2.Coding']; // Define valid pages

// Function to load and display content
async function loadPage(page) {
    if (!pages.includes(page)) {
        document.getElementById("content").innerHTML = "<p>Page not found.</p>";
        return;
    }
    try {
        const response = await fetch(`docs/${page}.md`); // Adjust path as needed
        const text = await response.text();
        const htmlContent = marked.parse(text); // Convert Markdown to HTML
        document.getElementById("content").innerHTML = htmlContent;

        // Update active menu item
        updateActiveMenu(page);

        // Additional UI updates (e.g., TOC generation)
        assignHeaderIDs();
        generateTOC();
    } catch (error) {
        console.error("Error loading page:", error);
        document.getElementById("content").innerHTML = "<p>Error loading content.</p>";
    }
}

// Function to update active menu item
function updateActiveMenu(page) {
    document.querySelectorAll(".sidebar ul li a").forEach(link => {
        link.classList.remove("active");
        if (link.textContent.trim() === page) {
            link.classList.add("active");
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

// Generate Table of Contents dynamically
function generateTOC() {
    const tocList = document.getElementById("toc-list");
    tocList.innerHTML = "";
    const contentDiv = document.getElementById("content");
    const headers = contentDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headers.forEach(header => {
        const level = parseInt(header.tagName.charAt(1));
        const tocItem = document.createElement("li");
        tocItem.classList.add(`heading-${level}`);
        const tocLink = document.createElement("a");
        tocLink.href = `#${header.id}`;
        tocLink.textContent = header.textContent;
        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });
}

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    handleHashChange(); // Load initial page
    window.addEventListener("hashchange", handleHashChange); // Handle hash changes
});
