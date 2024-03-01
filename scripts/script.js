// random user generator
let details = document.querySelector(".details");
let imgContainer = document.querySelector(".img-container");
let getUserBtn = document.getElementById("get-user-btn");
let url = "https://random-data-api.com/api/v2/users?response_type=json";

let getUser = () => {
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            imgContainer.innerHTML = `<img src= ${data.avatar}>`;
            details.innerHTML = `
            <h2>${data.first_name} ${data.last_name}</h2>
            <h3>${data.employment.title}</h3>
            <h4><i class="fa-solid fa-location-dot"></i> ${data.address.city}</h4>`;

            let randomColor =
                "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
            document.documentElement.style.setProperty("--theme-color", randomColor);
        });
};
window.addEventListener("load", getUser);
getUserBtn.addEventListener("click", getUser);

// searchbar
function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchbar-input');
    filter = input.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByTagName('li');

    //loop through all list items, hide those that don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
