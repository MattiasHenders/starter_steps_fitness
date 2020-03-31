firebase.auth().onAuthStateChanged(function(user){
    console.log(user.displayName);
    localStorage.setItem(2, user.displayName);
    document.querySelector("h3").innerHTML = "Hello, " + user.displayName + " !";
    document.getElementById("message").innerHTML = "Welcome back, " + user.displayName + "!";
})

$(document).ready(function() { $('.form-popup').modal({ show: true, }) }); 

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

$('#popup').modal('show');