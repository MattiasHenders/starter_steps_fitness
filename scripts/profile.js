firebase.auth().onAuthStateChanged(function(user){
    
    document.querySelector("#userName").innerHTML = user.displayName;

    db.collection("users/").doc(user.uid).onSnapshot(function(snap){

        document.querySelector("#userAge").innerHTML = snap.data().Age;

        document.querySelector("#userSex").innerHTML = snap.data().Sex;

        document.querySelector("#userWeight").innerHTML = snap.data().Weight;
        
        document.querySelector("#userHeight").innerHTML = snap.data().Height;

        document.querySelector("#userLevel").innerHTML = snap.data().Level;

        document.querySelector("#userGoal").innerHTML = snap.data().Goal;
    });

})

