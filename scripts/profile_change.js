firebase.auth().onAuthStateChanged(function(user){
    
    document.querySelector("#userName").innerHTML = user.displayName;
})

document.querySelector("#save").onclick = savedata;

function savedata(){


    firebase.auth().onAuthStateChanged(function(user){
    
        db.collection("users/").doc(user.uid).update({
            "Age": document.querySelector("#changeAge").value,
            "Sex": document.querySelector("#changeSex").value,
            "Weight": document.querySelector("#changeWeight").value,
            "Height": document.querySelector("#changeHeight").value,
            "Level": document.querySelector("#changeLevel").value,
            "Goal": document.querySelector("#changeGoal").value


        })
  
    })

    setTimeout(function(){
        window.location.href="profile_review.html";
    }, 2000);

}

