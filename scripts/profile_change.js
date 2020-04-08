/**
 * Get userName from firebase and display userName on  the user name card.
 */
firebase.auth().onAuthStateChanged(function (user) {
    document.querySelector("#userName").innerHTML = user.displayName;
})

/**
 * Update new changes of data to firebase.
 */
function savedata() {
    firebase.auth().onAuthStateChanged(function (user) {
        var promise = db.collection("users/").doc(user.uid).update({
            "Age": document.querySelector("#changeAge").value,
            "Sex": document.querySelector("#changeSex").value,
            "Weight": document.querySelector("#changeWeight").value,
            "Height": document.querySelector("#changeHeight").value,
            "Level": document.querySelector("#changeLevel").value,
            "Goal": document.querySelector("#changeGoal").value
        })
        promise.then(function () {
            window.location.href = "profile_review.html";
        });
    });

}

/**
 * Set default value for height and weight so that user don't need to type again if they don't want to change.
 */
function showDefault() {
    firebase.auth().onAuthStateChanged(function (user) {

        db.collection("users/").doc(user.uid).onSnapshot(function (snap) {
            document.getElementById("changeWeight").defaultValue = snap.data().Weight;
            document.getElementById("changeHeight").defaultValue = snap.data().Height;

            if (snap.data().Sex == "Female") {
                document.getElementById("userPic").src = "images/female.jpg";
            } else if (snap.data().Sex == "Male") {
                document.getElementById("userPic").src = "images/male.jpg";
            }
        });

    })
}

/**
 * Invokes functions.
 */
document.querySelector("#save").onclick = savedata;
showDefault();