const pages = ['Introduction', '1. Putting it Together', 'usage', 'faq'];

async function loadPage(page) {
    if (!pages.includes(page)) return;

    const response = await fetch(`docs/${page}.md`);
    const text = await response.text();
    const htmlContent = marked.parse(text);

    // Update the content
    document.getElementById("content").innerHTML = htmlContent;

    // Assign unique IDs to headers inside the content div
    assignHeaderIDs();

    // Generate Table of Contents dynamically
    generateTOC();

    // Enable checkboxes to be interactive
    makeCheckboxesInteractive();

    // Update Next Button
    updateNextButton(page);
}

function assignHeaderIDs() {
    const contentDiv = document.getElementById("content");
    const headers = contentDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headers.forEach(header => {
        const text = header.innerText || header.textContent;
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        header.id = id;  // Assign ID to the header
    });
}

function generateTOC() {
    const tocList = document.getElementById("toc-list");
    tocList.innerHTML = ""; // Clear previous TOC

    const contentDiv = document.getElementById("content");
    const headers = contentDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");

    headers.forEach(header => {
        const level = parseInt(header.tagName.charAt(1)); // Extract heading level (1-6)
        const tocItem = document.createElement("li");
        tocItem.classList.add(`heading-${level}`);

        const tocLink = document.createElement("a");
        tocLink.href = `#${header.id}`;
        tocLink.textContent = header.textContent;

        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });
}



function updateNextButton(currentPage) {
    const nextButton = document.getElementById("nextButton");
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex < pages.length - 1) {
        nextButton.style.display = 'block';
        nextButton.setAttribute('data-next-page', pages[currentIndex + 1]);
    } else {
        nextButton.style.display = 'none';
    }
}

function loadNextPage() {
    const nextPage = document.getElementById("nextButton").getAttribute('data-next-page');
    if (nextPage) {
        loadPage(nextPage);
    }
}


// Run functions on page load
document.addEventListener("DOMContentLoaded", () => {
    loadPage('Introduction');
});

function updateActiveMenu(page) {
    document.querySelectorAll(".sidebar ul li a").forEach(link => {
        link.classList.remove("active"); // Remove active class from all
        if (link.getAttribute("onclick") === `loadPage('${page}')`) {
            link.classList.add("active"); // Add active class to the current menu
        }
    });
}

async function loadPage(page) {
    if (!pages.includes(page)) return;

    const response = await fetch(`docs/${page}.md`);
    const text = await response.text();
    const htmlContent = marked.parse(text);

    document.getElementById("content").innerHTML = htmlContent;

    assignHeaderIDs();
    generateTOC();
    makeCheckboxesInteractive();
    
    updateNextButton(page);
    updateActiveMenu(page); // Mark active menu item
}
