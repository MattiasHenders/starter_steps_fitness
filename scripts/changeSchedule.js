
let userGoal = localStorage.getItem(0);

firebase.auth().onAuthStateChanged(function(user){
    db.collection("users/").doc(user.uid).onSnapshot(
        function(snap){
           localStorage.setItem(0, (snap.data().Goal));
        }
    )
});

function showDefault(){
    if (userGoal == "Gain muscles"){
        db.collection("workouts/gainMuscle/exercises").doc("benchpress").onSnapshot(
            function(snap){
                document.getElementById("changeBenchRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeBenchWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("deadlift").onSnapshot(
            function(snap){
                document.getElementById("changeLiftRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeLiftWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("overheadpress").onSnapshot(
            function(snap){
                document.getElementById("changeHeadRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeHeadWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("running").onSnapshot(
            function(snap){
                document.getElementById("changeKm").defaultValue = snap.data()["Distance(km)"];
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("squat").onSnapshot(
            function(snap){
                document.getElementById("changeSquatRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeSquatWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );
           
    } else if(userGoal == "Keep healthy status"){
        db.collection("workouts/keepHealthy/exercises").doc("benchpress").onSnapshot(
            function(snap){
                document.getElementById("changeBenchRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeBenchWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("deadlift").onSnapshot(
            function(snap){
                document.getElementById("changeLiftRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeLiftWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("overheadpress").onSnapshot(
            function(snap){
                document.getElementById("changeHeadRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeHeadWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("running").onSnapshot(
            function(snap){
                document.getElementById("changeKm").defaultValue = snap.data()["Distance(km)"];
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("squat").onSnapshot(
            function(snap){
                document.getElementById("changeSquatRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeSquatWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );
    } else if (userGoal == "Lose weight"){
        db.collection("workouts/loseWeight/exercises").doc("benchpress").onSnapshot(
            function(snap){
                document.getElementById("changeBenchRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeBenchWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("deadlift").onSnapshot(
            function(snap){
                document.getElementById("changeLiftRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeLiftWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("overheadpress").onSnapshot(
            function(snap){
                document.getElementById("changeHeadRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeHeadWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("running").onSnapshot(
            function(snap){
                document.getElementById("changeKm").defaultValue = snap.data()["Distance(km)"];
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("squat").onSnapshot(
            function(snap){
                document.getElementById("changeSquatRep").defaultValue = snap.data()["Rep(#)"];
                document.getElementById("changeSquatWei").defaultValue = snap.data()["Weight(lb)"];
            }
        );
    }
}  

showDefault();

//update data to database
document.querySelector("#save").onclick = updateData;

function updateData(){
    firebase.auth().onAuthStateChanged(function(user){
        // var promise1, promise2, promise3, promise4, promise5;
        if( userGoal == "Gain muscles"){
            db.collection("workouts/gainMuscle/exercises").doc("benchPress").update({
                "Rep(#)": document.querySelector("#changeBenchRep").value,
                "Weight(lb)": document.querySelector("#changeBenchWei").value
            })
            
            db.collection("workouts/gainMuscle/exercises").doc("deadlift").update({
                "Rep(#)": document.querySelector("#changeLiftRep").value,
                "Weight(lb)": document.querySelector("#changeLiftWei").value
            })

            db.collection("workouts/gainMuscle/exercises").doc("overheadpress").update({
                "Rep(#)": document.querySelector("#changeHeadRep").value,
                "Weight(lb)": document.querySelector("#changeHeadWei").value
            })

            db.collection("workouts/gainMuscle/exercises").doc("running").update({
                "Distance(km)": document.querySelector("#changeKm").value
            })

            db.collection("workouts/gainMuscle/exercises").doc("squat").update({
                "Rep(#)": document.querySelector("#changeSquatRep").value,
                "Weight(lb)": document.querySelector("#changeSquatWei").value
            })
        }

        else if( userGoal == "Keep healthy status"){
            promise1=db.collection("workouts/keepHealthy/exercises").doc("benchPress").update({
                "Rep(#)": document.querySelector("#changeBenchRep").value,
                "Weight(lb)": document.querySelector("#changeBenchWei").value
            })
            
            promise2=db.collection("workouts/keepHealthy/exercises").doc("deadlift").update({
                "Rep(#)": document.querySelector("#changeLiftRep").value,
                "Weight(lb)": document.querySelector("#changeLiftWei").value
            })

            promise3=db.collection("workouts/keepHealthy/exercises").doc("overheadpress").update({
                "Rep(#)": document.querySelector("#changeHeadRep").value,
                "Weight(lb)": document.querySelector("#changeHeadWei").value
            })

            promise4=db.collection("workouts/keepHealthy/exercises").doc("running").update({
                "Distance(km)": document.querySelector("#changeKm").value
            })

            promise5=db.collection("workouts/keepHealthy/exercises").doc("squat").update({
                "Rep(#)": document.querySelector("#changeSquatRep").value,
                "Weight(lb)": document.querySelector("#changeSquatWei").value
            })
        }
        
        else if(userGoal == "Lose weight"){
            db.collection("workouts/loseWeight/exercises").doc("benchPress").update({
                "Rep(#)": document.querySelector("#changeBenchRep").value,
                "Weight(lb)": document.querySelector("#changeBenchWei").value
            })
            
            db.collection("workouts/loseWeight/exercises").doc("deadlift").update({
                "Rep(#)": document.querySelector("#changeLiftRep").value,
                "Weight(lb)": document.querySelector("#changeLiftWei").value
            })

            db.collection("workouts/loseWeight/exercises").doc("overheadpress").update({
                "Rep(#)": document.querySelector("#changeHeadRep").value,
                "Weight(lb)": document.querySelector("#changeHeadWei").value
            })

            db.collection("workouts/loseWeight/exercises").doc("running").update({
                "Distance(km)": document.querySelector("#changeKm").value
            })

            db.collection("workouts/loseWeight/exercises").doc("squat").update({
                "Rep(#)": document.querySelector("#changeSquatRep").value,
                "Weight(lb)": document.querySelector("#changeSquatWei").value
            })
        }
        // Promise.all([promise1, promise2, promise3, promise4, promise5]).then(function(){
        //     window.location.href="profile_schedule.html";
        // });
     });
}

// function saveUpdating(){
//     let promise = updateData();
//     promise.then(function(){
//         window.location.href="profile_schedule.html";
//     });
// }
// let promise = saveUpdating;
// promise.then(function(){
//     window.location.href="profile_review.html";
// });