let userGoal = localStorage.getItem(0);

firebase.auth().onAuthStateChanged(function(user){
    db.collection("users/").doc(user.uid).onSnapshot(
        function(snap){
           localStorage.setItem(0, (snap.data().Goal));
        }
    )
});

function showSchedule(){
    if (userGoal == "Gain muscles"){
        db.collection("workouts/gainMuscle/exercises").doc("benchpress").onSnapshot(
            function(snap){
                document.getElementById("benchPress").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("deadlift").onSnapshot(
            function(snap){
                document.getElementById("deadLift").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("overheadpress").onSnapshot(
            function(snap){
                document.getElementById("headPress").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("running").onSnapshot(
            function(snap){
                document.getElementById("run").innerHTML = snap.data()["Distance(km)"] + " km";
            }
        );

        db.collection("workouts/gainMuscle/exercises").doc("squat").onSnapshot(
            function(snap){
                document.getElementById("squatting").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );
           
    } else if(userGoal == "Keep healthy status"){
        db.collection("workouts/keepHealthy/exercises").doc("benchpress").onSnapshot(
            function(snap){
                document.getElementById("benchPress").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("deadlift").onSnapshot(
            function(snap){
                document.getElementById("deadLift").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("overheadpress").onSnapshot(
            function(snap){
                document.getElementById("headPress").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("running").onSnapshot(
            function(snap){
                document.getElementById("run").innerHTML = snap.data()["Distance(km)"] + " km";
            }
        );

        db.collection("workouts/keepHealthy/exercises").doc("squat").onSnapshot(
            function(snap){
                document.getElementById("squatting").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );
    } else if (userGoal == "Lose weight"){
        db.collection("workouts/loseWeight/exercises").doc("benchpress").onSnapshot(
            function(snap){
                document.getElementById("benchPress").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("deadlift").onSnapshot(
            function(snap){
                document.getElementById("deadLift").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("overheadpress").onSnapshot(
            function(snap){
                document.getElementById("headPress").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("running").onSnapshot(
            function(snap){
                document.getElementById("run").innerHTML = snap.data()["Distance(km)"] + " km";
            }
        );

        db.collection("workouts/loseWeight/exercises").doc("squat").onSnapshot(
            function(snap){
                document.getElementById("squatting").innerHTML = snap.data()["Rep(#)"] + " rep, " + snap.data()["Weight(lb)"] + " lbs";
            }
        );
    }
}

showSchedule();
