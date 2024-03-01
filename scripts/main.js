/*
    Megan Gagliardi
    100852124
    1/27/2024
*/

"use strict";


(function(){

    function ContactFormValidation(){
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid first and last name");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid contact number");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
        ValidateField("#address", /^(\d{1,}) [a-zA-Z0-9\s]+(\,)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}$/, "Please enter a valid address: Addr# Street Name, City, Province ZIP code");
        ValidateField("#contactNumber", /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number with area code");
        ValidateField("#password", /^[A-Za-z]\w{7,14}$/, "Password must be 7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter");
        ValidateField("#confirmPassword", /^[A-Za-z]\w{7,14}$/, "Password did not match");
    }

    /**
     * this function validates input from text field
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */

    function ValidateField(input_field_id, regular_expression, error_message){

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //pattern does not match
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else{
                //valid entry
                messageArea.removeAttr("class").hide();
            }
        });
    }

    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.fullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active");
    }

    function AjaxRequest(method, url, callback){
        //instantiate xhr object
        let XHR = new XMLHttpRequest();

        //add event listener for readystatechange
        XHR.addEventListener("readystatechange", () => {
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                if(typeof callback === "function") {
                    callback(XHR.responseText);
                }
                else {
                    console.error("Error: callback not a function");
                }
            }
        });

        //open connection to the server
        XHR.open(method, url);

        //send the request to the server
        XHR.send();
    }

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

    function DisplayGalleryPage() {
        console.log("Called DisplayGalleryPage()");

    }

    function DisplayBlogPage(){
        console.log("Called DisplayBlogPage()");
        // Programmatically change blog to news
        document.getElementById("blogLink").innerText = "News";
    }

    function DisplayContactUsPage() {
        console.log("Called DisplayContactUsPage()");

        ContactFormValidation();

        let submitButton = document.getElementById("submitButton");

        submitButton.addEventListener("click", function () {
            if(subscribeCheckbox.checked){
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage()");

        ContactFormValidation();

        let submitButton = document.getElementById("submitButton");

        submitButton.addEventListener("click", function () {
            AddContact(fullName.value, emailAddress.value, address.value, contactNumber,value, password.value, confirmPassword.value);
        })
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

    function DisplayUserGeneratorPage() {
        console.log("Called DisplayUserGeneratorPage()");
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

    function DisplayEventsPage() {
        console.log("Called DisplayEventsPage()");

        $(document).ready(function() {
            $.ajax({
                url: '/json/events.json',
                dataType: 'json',
                success: function(data) {
                    // iterate over each event in the json data
                    $.each(data, function(index, event) {
                        // create a button for each event
                        var button = $('<button type="button" class="btn btn-primary">View Event Details</button>');
                        $('.row').append(button);

                        // add click event to populate modal with event details
                        button.on('click', function() {
                            $('#eventModal .modal-title').text(event.title);
                            $('#eventModal .modal-body').html(`
                            <p>Date: ${event.date}</p>
                            <p>Time: ${event.time}</p>
                            <p>Location: ${event.location}</p>
                            <p>Description: ${event.description}</p>
                        `);
                            $('#eventModal').modal('show');
                        });
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Failed to load events:', error);
                }
            });
        });
    }





    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");

        $(document).ready(function() {
            $('#loginForm').submit(function(event) {
                event.preventDefault(); // prevent the form from submitting

                // get the username and password values
                const username = $('#username').val();
                const password = $('#password').val();

                // validation
                ContactFormValidation();

                // successful login
                if (username === 'admin' && password === 'password') {
                    alert('Login successful! Redirecting...');
                    window.location.href = 'index.html'; // redirect to the home page
                } else {
                    alert('Invalid username or password. Please try again.');
                }
            });
        });
    }

    function Start(){
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);

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
            case "User Generator":
                DisplayUserGeneratorPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Gallery":
                DisplayGalleryPage();
                break;
        }
    }
    window.addEventListener("load", Start);
})();