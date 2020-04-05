/**
 * Get user name from firebase and display it.
 */
firebase.auth().onAuthStateChanged(function(user){
    console.log(user.displayName);
    document.querySelector("h3").innerHTML = "Hello, " + user.displayName + " !";
    document.getElementById("message").innerHTML = "Welcome back, " + user.displayName + "!";
})
//show the popup message.
$(document).ready(function() { $('.form-popup').modal({ show: true, }) }); 

$('#popup').modal('show');

// Used for setting workout before user gets there.
getUserGoal();
let goal = localStorage.getItem(0);

function getUserGoal() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).onSnapshot(function (doc) {
            let userGoal = (doc.data().Goal);
            localStorage.setItem(0, userGoal);
        });
    })
}