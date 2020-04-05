/**
 * Retrieves and reads data from firebase and display it on html pages.
 */
firebase.auth().onAuthStateChanged(function(user){
    
    document.querySelector("#userName").innerHTML = user.displayName;

    db.collection("users/").doc(user.uid).onSnapshot(function(snap){

        document.querySelector("#userAge").innerHTML = snap.data().Age;

        document.querySelector("#userSex").innerHTML = snap.data().Sex;

        document.querySelector("#userWeight").innerHTML = snap.data().Weight + " kg";
        
        document.querySelector("#userHeight").innerHTML = snap.data().Height + " cm";

        document.querySelector("#userLevel").innerHTML = snap.data().Level;

        document.querySelector("#userGoal").innerHTML = snap.data().Goal;

        if (snap.data().Sex == "Female"){
            document.getElementById("userPic").src = "images/female.jpg";
        } else if (snap.data().Sex == "Male"){
            document.getElementById("userPic").src = "images/male.jpg";
        }
    });

})
