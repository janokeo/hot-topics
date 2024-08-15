document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav ul li a');
    const container = document.getElementById('main-content');

    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                container.innerHTML = '<p>Sorry, the content could not be loaded.</p>';
            });
    }

    function selectContent(event) {
        event.preventDefault();
        const url = event.target.getAttribute('href');
        loadContent(`partials/${url}`);
    }

    links.forEach(link => {
        link.addEventListener('click', selectContent);
    });

    // Load the default content on page load
    loadContent('partials/home.html');
});
