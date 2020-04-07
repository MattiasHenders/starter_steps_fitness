let month = localStorage.getItem("month");
let day = localStorage.getItem("day");
let year = localStorage.getItem("year");
let date = month + "/" + day + "/" + year;
let workoutdate = "workout_" + (month) + "_" + (day) + "_" + (year);
document.querySelector("#complete").innerHTML = "On " + date + ", you completed: ";
/**
 * Display activites done on a certain date user chose on result_check.html.
 */
firebase.auth().onAuthStateChanged(function (user) {
    db.collection("users/").doc(user.uid).onSnapshot(function (snap) {
        if (snap.data()[workoutdate] == null) {
            document.querySelector("#benchpress").innerHTML = 0;
            document.querySelector("#deadlift").innerHTML = 0;
            document.querySelector("#overheadpress").innerHTML = 0;
            document.querySelector("#running").innerHTML = 0;
            document.querySelector("#squat").innerHTML = 0;
        } else {
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
        }
    })
})
