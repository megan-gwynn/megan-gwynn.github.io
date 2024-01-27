/*
    Megan Gagliardi
    100852124
    1/27/2024
*/

"use strict";


(function(){

    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
        document.addEventListener("DOMContentLoaded", function () {
            const slideshowContainer = document.getElementById("slideshow-container");
            const images = [
                "images/3452025.jpg",
                "images/3423816.jpg"
            ];

            let currentIndex = 0;

            function changeBackground() {
                slideshowContainer.style.backgroundImage = `url('${images[currentIndex]}')`;
                currentIndex = (currentIndex + 1) % images.length;
            }

            // Initial background change
            changeBackground();

            // Change background every 5 seconds
            setInterval(changeBackground, 5000);
        });

        // Dynamically add careers link
        const careersLink = document.createElement("li");
        careersLink.className = "nav-item";
        careersLink.innerHTML = '<a class="nav-link" href="careers.html">Careers</a>';
    }

    function DisplayBlogPage(){
        console.log("Called DisplayBlogPage()");
        // Programmatically change blog to news
        document.getElementById("blogLink").innerText = "News";
    }

    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage()");
        const contactForm = document.getElementById('contactForm');
        const submitButton = document.getElementById('submitButton');
        const modalData = document.getElementById('modalData');
        const thankYouMessage = document.getElementById('thankYouMessage');

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Create a Contact instance with form data
            const contact = new Contact(
                contactForm.fullName.value,
                contactForm.emailAddress.value,
                contactForm.subject.value,
                contactForm.message.value
            );

            // Validate the form fields using the Contact class
            if (validateForm(contact)) {
                // Display entered data in the modal
                modalData.innerText = contact.toString();

                // Show the modal
                const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                modal.show();

                // Reset the form
                contactForm.reset();

                // Display thank you message with countdown timer
                thankYouMessage.style.display = 'block';
                countdownRedirect(5);
            }
        });

        function validateForm(contact) {
            if (contact.fullName === "" || contact.emailAddress === "" || contact.subject === "" || contact.message === "") {
                alert("One or more of the contact fields is missing or invalid");
                return false;
            }
            return true;
        }

        function countdownRedirect(seconds) {
            let timer = seconds;

            function updateTimer() {
                thankYouMessage.innerText = `Thank you, redirecting in ${timer} seconds.`;
                timer--;

                if (timer < 0) {
                    clearInterval(intervalId);
                    window.location.href = 'contact.html';
                }
            }

            // Update the timer every second
            const intervalId = setInterval(updateTimer, 1000);
        }
    }

    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");
        document.addEventListener("DOMContentLoaded", function() {
            const projectsContainer = document.getElementById("projects-container");
            const loadMoreBtn = document.getElementById("load-more-btn");

            // Hypothetical projects data
            const projects = [
                { title: "Project 1", description: "Description for Project 1", image: "images/project.png" },
                { title: "Project 2", description: "Description for Project 2", image: "images/project.png" },
                // Add more projects as needed
            ];

            let visibleProjects = 2; // Number of projects initially visible

            // Function to create project cards
            function createProjectCard(project) {
                const projectCard = document.createElement("div");
                projectCard.classList.add("project-card");

                const titleElement = document.createElement("h3");
                titleElement.textContent = project.title;

                const descriptionElement = document.createElement("p");
                descriptionElement.textContent = project.description;

                const imageElement = document.createElement("img");
                imageElement.src = project.image;
                imageElement.alt = project.title;

                projectCard.appendChild(titleElement);
                projectCard.appendChild(descriptionElement);
                projectCard.appendChild(imageElement);

                return projectCard;
            }

            // Function to display projects
            function displayProjects(startIndex, endIndex) {
                console.log("Displaying projects from index", startIndex, "to", endIndex);
                for (let i = startIndex; i < endIndex; i++) {
                    const project = projects[i];
                    const projectCard = createProjectCard(project);
                    projectsContainer.appendChild(projectCard);
                }
            }

            // Load more button click event for troubleshooting
            loadMoreBtn.addEventListener("click", function() {
                console.log("Load More button clicked");
                const additionalProjects = 2; // Number of projects to load each time
                visibleProjects += additionalProjects;

                // Check if there are more projects to load
                if (visibleProjects <= projects.length) {
                    displayProjects(visibleProjects - additionalProjects, visibleProjects);
                } else {
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.textContent = "No more projects";
                }
            });


            // Initial display
            displayProjects(0, visibleProjects);

            // Load more button click event
            loadMoreBtn.addEventListener("click", function() {
                const additionalProjects = 2; // Number of projects to load each time
                visibleProjects += additionalProjects;

                // Check if there are more projects to load
                if (visibleProjects <= projects.length) {
                    displayProjects(visibleProjects - additionalProjects, visibleProjects);
                } else {
                    loadMoreBtn.disabled = true;
                    loadMoreBtn.textContent = "No more projects";
                }
            });
        });


    }

    function DisplayPrivacyPolicyPage(){
        console.log("Called DisplayPrivacyPolicyPage()");

    }

    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage()");

    }

    function DisplayTeamPage(){
        console.log("Called DisplayTeamPage()");

    }

    function DisplayTermsOfServicePage(){
        console.log("Called DisplayTermsOfServicePage()");

    }

    function DisplayCareersPage(){
        console.log("Called DisplayCareersPage()");

    }

    function Start(){
        console.log("App Started");

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Blog":
                DisplayBlogPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Portfolio":
                DisplayPortfolioPage();
                break;
            case "Privacy Policy":
                DisplayPrivacyPolicyPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Team":
                DisplayTeamPage();
                break;
            case "Terms of Service":
                DisplayTermsOfServicePage();
                break;
            case "Careers":
                DisplayCareersPage();
                break;
        }
    }
    window.addEventListener("load", Start);

})()