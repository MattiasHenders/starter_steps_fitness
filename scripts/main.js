firebase.auth().onAuthStateChanged(function(user){
    console.log(user.displayName);
    document.querySelector("h3").innerHTML = "Hello, " + user.displayName + " !";
})