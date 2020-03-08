new Promise(function (resolve, reject) {
    let workoutNames = getWorkout();
    setTimeout(() => resolve(workoutNames), 2000);

}).then(function (names) {
    setWorkout(names);

});

function getWorkout() {
    let name = [];
    db.collection("exercises").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            name.push(doc.data().name);
        })
    })
    return name;
}


function setWorkout(workoutNames) {
    demoID = [];
    console.log(workoutNames);
    for (let i = 0; i < workoutNames.length; i++) {

        document.getElementById("exercise" + (i + 1)).innerHTML =
            "Exercise " + (i + 1) + " - " + workoutNames[i];

        demoID[i] = workoutNames[i].replace(" ", "").toLowerCase();
        console.log("demo" + (i + 1));
        console.log(demoID[i]);
        document.getElementById("demo_" + demoID[i]).id = "demo" + (i + 1);
    }

}