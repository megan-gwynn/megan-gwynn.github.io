(function(){

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

    function ContactFormValidation(){
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid first and last name");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid contact number");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address");
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

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

        $("#AboutUsBtn").on("click", () =>{
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my first paragraph</p>`);
        $("body").append(`<article class="container">
                                <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);

    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage()");
    
    }

    function DisplayAboutUsPage(){
        console.log("Called DisplayAboutUsPage()");
    
    }

    function DisplayOurServicesPage(){
        console.log("Called DisplayOurServicesPage()");
    
    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");

        ContactFormValidation();

        let submitButton = document.getElementById("submitButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        submitButton.addEventListener("click", function () {
            if(subscribeCheckbox.checked){
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;

            for(const key of keys){
            let contactData = localStorage.getItem(key);
            let contact = new core.Contact();
            contact.deserialize(contactData);
            data += `<tr><th scope="row" class="text-center">${index}</th>
                    <td>${contact.fullName}</td>
                    <td>${contact.contactNumber}</td>
                    <td>${contact.emailAddress}</td>
                        <td class="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
                                <i class="fas fa-edit fa-sm">Edit</i>                        
                            </button>
                        </td>
                        <td class="text-center">
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                                <i class="fas fa-trash=alt fa-sm">Delete</i>                        
                            </button>
                        </td>
                    </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
        $("#addButton").on("click", () => {
            location.href = "edit.html#add";
        });

        $("button.edit").on("click", function (){
            location.href = "edit.html#" + $(this).val();
        });

        $("button.delete").on("click", function (){
            if(confirm("Delete contact, please confirm")){
                localStorage.removeItem($(this).val());
            }
            location.href = "contact-list.html";
        });
    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":
                //add contact chosen
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"/>Add`);

                $("#editButton").on("click", (event) => {
                    //prevent form submission
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;

            default:
                //edit contact chosen
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                //pre-populate form
                $("#fullName").val(contact.fullName);
                $("#contactNumber").val(contact.contactNumber);
                $("#emailAddress").val(contact.emailAddress);

                $("#editButton").on("click", () => {
                    //prevent form submission
                    event.preventDefault();
                    contact.fullName = $("#fullName").val();
                    contact.contactNumber = $("#contactNumber").val();
                    contact.emailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "contact-list.html";
                });
                break;
        }
    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");

    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");

    }

    function Start(){
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Our Services":
                DisplayOurServicesPage();
                break;
            case "Contact Us":
                DisplayContactUsPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }
    window.addEventListener("load", Start);
})();