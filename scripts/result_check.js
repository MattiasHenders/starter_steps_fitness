/**
 * Generated a date picker from jqueryui.com.
 */
$(function () {
    $("#datepicker").datepicker();
});
let d = new Date();
let workoutdate = (d.getMonth() + 1) + "/" + (d.getDate()) + "/" + (d.getFullYear());
document.querySelector("#datepicker").value = workoutdate;
document.querySelector("#checkbtn").onclick = check;
/**
 * Save the date user wants to check in local storage. Send user to activities or stats page based on their choice.
 */
function check() {
    let choice = document.querySelector("#checkwhich").value;
    let date = document.querySelector("#datepicker").value;
    console.log(date);
    localStorage.setItem("checkchoice", choice);
    let dateArr = date.split("/");
    let month = dateArr[0];
    if (month.startsWith("0")) {
        month = month.substring(1);
    }
    let day = dateArr[1];
    let year = dateArr[2];
    localStorage.setItem("day", day);
    localStorage.setItem("month", month);
    localStorage.setItem("year", year);
    if (choice == "Activities Completed") {
        window.location.href = "result_checkactivities.html";
    } else {
        window.location.href = "result_checkstats.html";
    }
}
