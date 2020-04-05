/**
 * Get user name from firebase and display it.
 */
firebase.auth().onAuthStateChanged(function(user){
    console.log(user.displayName);
    document.querySelector("h3").innerHTML = "Hello, " + user.displayName + " !";
    document.getElementById("message").innerHTML = "Welcome back, " + user.displayName + "!";
    document.getElementById("message2").innerHTML = "Welcome to Starter Steps Fitness, " + user.displayName + "!";
})

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

//show the popup message.
function popupMessage(){
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).onSnapshot(function (doc) {
            $(document).ready(function() { $('.form-popup').modal({ show: true, }) }); 
        if (doc.data().Goal == "Gain muscles" || doc.data().Goal == "Keep healthy status" || doc.data().Goal == "Lose weight"){
            $('#popup').modal('show');
        } else {
            $('#popup2').modal('show');
        }
        });
    })
    
}

popupMessage();