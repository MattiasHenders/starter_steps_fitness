let d = new Date();
let workoutdate = "workout_" + (d.getMonth() + 1) + "_" + (d.getDate()) + "_" + (d.getFullYear());
console.log(workoutdate);
/**
 * Display the user's activities done today, empty if no activities done yet.
 */
firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users/").doc(user.uid).onSnapshot(function (snap) {
        console.log(snap.data()[workoutdate]);
        let title1 = "benchpress";
        let title2 = "deadlift";
        let title3 = "overheadpress";
        let title4 = "running";
        let title5 = "squat";
        document.querySelector("#benchpress").innerHTML = snap.data()[workoutdate][title1];
        document.querySelector("#deadlift").innerHTML = snap.data()[workoutdate][title2];
        document.querySelector("#overheadpress").innerHTML = snap.data()[workoutdate][title3];
        document.querySelector("#running").innerHTML = snap.data()[workoutdate][title4];
        document.querySelector("#squat").innerHTML = snap.data()[workoutdate][title5];
    })
})

