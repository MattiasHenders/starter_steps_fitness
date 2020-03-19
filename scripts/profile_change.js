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
            "Level": document.querySelector("#changeLevel").value


        })
    
        
    // localStorage.setItem("Age", document.querySelector("#changeAge").value);
    // localStorage.setItem("Weight", document.querySelector("#changeWeight").value);
      





      
    })




}

