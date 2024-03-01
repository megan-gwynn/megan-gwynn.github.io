const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

//get new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    // get first and last day of the month
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    //getting last date of previous month
    lastDateofPrevMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    // creating li of previous month
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofPrevMonth - i + 1}</li>`;
    }

    //creating li of all days of current month
    for (let i = 1; i <= lastDateofMonth; i++) {
        // adding active class to li if current day, month and year match
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                                && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    // creating li of next month
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
   icon.addEventListener("click", () => {
       //adding click event on both icons
       // if prev icon is clicked, decrement current month by 1 else increment by 1
       currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

       // if current month is less than 0 or greater than 11
       if(currMonth < 0 || currMonth > 11) {
           // updating current month and year with new date
           date = new Date(currYear, currMonth);
           currYear = date.getFullYear();
           currMonth = date.getMonth();
       } else {
           // pass new Date as date value
           date = new Date();
       }
       renderCalendar();
   });
});