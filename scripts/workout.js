getUserGoal();

let goal = localStorage.getItem(0);

new Promise(function (resolve, reject) {
    let numericals = getNumericals(goal);
    setTimeout(() => resolve(numericals), 2000);

}).then(function (numericals) {
    console.log(numericals);
    setNumericalValues(numericals);

});

new Promise(function (resolve, reject) {
    let workout = getWorkout(goal);
    setTimeout(() => resolve(workout), 2000);

}).then(function (workout) {

    setWorkout(workout);

});

function getUserGoal() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).onSnapshot(function (snap) {
            let userGoal = (snap.data().Goal);
            localStorage.setItem(0, userGoal);
        });
    })
}
/*
function getReps() {
    let reps = [];
    firebase.auth().onAuthStateChanged(function () {
        db.collection("workouts/gainMuscle/exercises").doc().onSnapshot(function (doc) {
            reps.push(doc.data()["Rep(#)"]);
            localStorage.setItem(1, reps);
        });
    })
}
*/
function getWorkout(userGoal) {
    let name = [];
    if (userGoal == "Gain muscles") {
        console.log(userGoal);
        db.collection("workouts/gainMuscle/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data().name);
                name.push(doc.data().name);
            })
        })
    } else if (userGoal == "Keep healthy status") {
        console.log(userGoal);
        db.collection("workouts/keepHealthy/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data().name);
                name.push(doc.data().name);
            })
        })
    } else if (userGoal == "Loss weight") {
        console.log(userGoal);
        db.collection("workouts/lossWeight/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data().name);
                name.push(doc.data().name);
            })
        })
    } else {
        console.log("Error in determining goal of user.");
    }

    return name;
}

function getNumericals(userGoal) {
    let weight = [];
    let reps = [];
    let distance = [];
    console.log(userGoal);
    if (userGoal == "Gain muscles") {
        console.log(userGoal);
        db.collection("workouts/gainMuscle/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reps.push(doc.data()["Rep(#)"]);
                weight.push(doc.data()["Weight(lb)"]);
                distance.push(doc.data()["Distance(km)"]);
            })
        })
    } else if (userGoal == "Keep healthy status") {
        console.log(userGoal);
        db.collection("workouts/keepHealthy/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reps.push(doc.data()["Rep(#)"]);
                weight.push(doc.data()["Weight(lb)"]);
                distance.push(doc.data()["Distance(km)"]);
            })
        })
    } else if (userGoal == "Loss weight") {
        console.log(userGoal);
        db.collection("workouts/lossWeight/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reps.push(doc.data()["Rep(#)"]);
                weight.push(doc.data()["Weight(lb)"]);
                distance.push(doc.data()["Distance(km)"]);
            })
        })
    } else {
        console.log("Error in determining goal of user.");
    }

    return [reps, weight, distance];

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

// EDIT THIS
function setNumericalValues(numericalArray) {

    let reps = (numericalArray[0]);
    let weight = numericalArray[1];
    let distance = numericalArray[2];

    console.log(reps.length);
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            document.getElementById("weight" + (i + 1) + "-" + (j + 1)).value = weight[i];
            document.getElementById("rep" + (i + 1) + "-" + (j + 1)).value = reps[i];
        }
    }
}
