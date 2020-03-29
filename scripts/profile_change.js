firebase.auth().onAuthStateChanged(function(user){
    
    document.querySelector("#userName").innerHTML = user.displayName;
})

document.querySelector("#save").onclick = savedata;

function savedata(){


    firebase.auth().onAuthStateChanged(function(user){
    
       var promise = db.collection("users/").doc(user.uid).update({
            "Age": document.querySelector("#changeAge").value,
            "Sex": document.querySelector("#changeSex").value,
            "Weight": document.querySelector("#changeWeight").value,
            "Height": document.querySelector("#changeHeight").value,
            "Level": document.querySelector("#changeLevel").value,
            "Goal": document.querySelector("#changeGoal").value


        })
        promise.then(function(){
            window.location.href="profile_review.html";
        });
    });

}

function showDefault(){
    firebase.auth().onAuthStateChanged(function(user){
    
        db.collection("users/").doc(user.uid).onSnapshot(function(snap){
    
            // document.getElementById("defaultAge").selected = snap.data().Age;
    
            // document.getElementById("defaultSex").selected = snap.data().Sex;
    
            document.getElementById("changeWeight").defaultValue = snap.data().Weight;
            
            document.getElementById("changeHeight").defaultValue = snap.data().Height;
    
            // document.getElementById("defaultLevel").defaultValue = snap.data().Level;
    
            // document.getElementById("defaultGoal").defaultValue = snap.data().Goal;

            if (snap.data().Sex == "Female"){
                document.getElementById("userPic").src = "images/female.jpg";
            } else if (snap.data().Sex == "Male"){
                document.getElementById("userPic").src = "images/male.jpg";
            }
        });
    
    })
}

showDefault();