setWorkoutPage();

// Gets users from firebase as an array
function setWorkoutPage() {
    let userGoal;
    let workout;
    let numericals;

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
            .get()
            .then(function (doc) {
                userGoal = (doc.data().Goal);
                localStorage.setItem(0, userGoal);
                console.log(localStorage.getItem(0));
            })
            .then(function () {
                getWorkout(userGoal);
                workout = localStorage.getItem(2);
            })
            .then(function () {
                getNumericals(userGoal);
                numericals = localStorage.getItem(1);
            })
            .then(function () {
                getWorkout(userGoal);
                getNumericals(userGoal);
            })
            .then(function () {

                setTimeout(function(){
                    numericals = localStorage.getItem(1);
                    workout = localStorage.getItem(2);
                    setWorkout(workout);
                    setNumericalValues(numericals);
                } , 1000)
            })
    })

}

function getUserGoal() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (doc) {
            let userGoal = (doc.data().Goal);
            localStorage.setItem(0, userGoal);
        });
    })
}

function getWorkout(userGoal) {
    let name = [];
    if (userGoal == "Gain muscles") {
        db.collection("workouts/gainMuscle/exercises").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    name.push(doc.data().name);
                })
            })
            .then(function () {
                localStorage.setItem(2, name);
            })
            .then(function () {
                console.log(localStorage.getItem(2));
            })
    } else if (userGoal == "Keep healthy status") {
        db.collection("workouts/keepHealthy/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                name.push(doc.data().name);
            })
        })
    } else if (userGoal == "Loss weight") {
        db.collection("workouts/lossWeight/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
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
    if (userGoal == "Gain muscles") {
        db.collection("workouts/gainMuscle/exercises")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    reps.push(doc.data()["Rep(#)"]);
                    weight.push(doc.data()["Weight(lb)"]);
                    distance.push(doc.data()["Distance(km)"]);
                })

            }).then(function () {
                localStorage.setItem(1, [reps, weight, distance]);
            })
    } else if (userGoal == "Keep healthy status") {
        db.collection("workouts/keepHealthy/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reps.push(doc.data()["Rep(#)"]);
                weight.push(doc.data()["Weight(lb)"]);
                distance.push(doc.data()["Distance(km)"]);
            })
            localStorage.setItem(1, [reps, weight, distance]);
        })
    } else if (userGoal == "Loss weight") {
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
}

function setWorkout(names) {

    workoutNames = names.split(",");

    demoID = [];
    for (let i = 0; i < workoutNames.length; i++) {

        document.getElementById("exercise" + (i + 1)).innerHTML =
            "Exercise " + (i + 1) + " - " + workoutNames[i];

        demoID[i] = workoutNames[i].replace(" ", "").toLowerCase();
        document.getElementById("demo_" + demoID[i]).id = "demo" + (i + 1);
    }

}

function setNumericalValues(numArr) {

    let reps = [];
    let weight = [];
    let distance = [];

    numericalArray = numArr.split(",");

    for (let i = 0; i < 5; i++) {
        reps[i] = numericalArray[i];
        weight[i] = numericalArray[i + 5];
        distance[i] = numericalArray[i + 10];
    }

    console.log(numericalArray);


    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (weight[i] == "") {
                removeElement("weightCol" + (i + 1) + "-" + (j + 1));
                document.getElementById("repText" + (i + 1) + "-" + (j + 1)).innerHTML = "Distance (km)";
                document.getElementById("rep" + (i + 1) + "-" + (j + 1)).id = "distance" + (i + 1) + "-" + (j + 1);
                if (j > 0) {
                    document.getElementById("distance" + (i + 1) + "-" + (j + 1)).value = 0;
                } else {
                    document.getElementById("distance" + (i + 1) + "-" + (j + 1)).value = distance[i];
                }
            } else {
                document.getElementById("weight" + (i + 1) + "-" + (j + 1)).value = weight[i];
                document.getElementById("rep" + (i + 1) + "-" + (j + 1)).value = reps[i];
            }
        }
    }
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function getFinishedWorkout(numericalArray) {

    let totalDistance = 0;
    let totalWeight = [];

    let exercises = localStorage.getItem(1);

    if (exercises == null) {
        window.location.href = "workout.html"
    }

    exercises = exercises.split(",");

    for (let k = 0; k < exercises.length; k++) {
        exercises[k] = exercises[k].toLowerCase();
    }

    for (let i = 0; i < 5; i++) {
        totalWeight[i] = 0;
        for (let j = 0; j < 5; j++) {
            if (document.getElementById("weight" + (i + 1) + "-" + (j + 1)) == null) {
                if (j == 0) {
                    totalDistance += parseFloat(document.getElementById("distance" + (i + 1) + "-" + (j + 1)).value);
                }
            } else {
                totalWeight[i] += (document.getElementById("weight" + (i + 1) + "-" + (j + 1)).value) * (document.getElementById("rep" + (i + 1) + "-" + (j + 1)).value);

            }
        }
    }

    let randomCalories = Math.floor(Math.random() * 100) + 500;

    let key = "workout_" + getDate();

    firebase.auth().onAuthStateChanged(function (user) {

        let increment = firebase.firestore.FieldValue.increment(randomCalories);
        let dbref = db.collection("users/").doc(user.uid);


        dbref.update({
            MyCalories: increment,
            ["Total"]: {
                benchpress: increment,
                calories: increment,
                deadlift: increment,
                overheadpress: increment,
                running: increment,
                squat: increment
            }
        })



        var promise = db.collection("users/").doc(user.uid).update({


            [key]: {
                [exercises[0]]: totalWeight[0],
                [exercises[1]]: totalWeight[1],
                [exercises[2]]: totalWeight[2],
                [exercises[3]]: totalDistance,
                [exercises[4]]: totalWeight[4],
                calories: randomCalories
            }


        })
        promise.then(function () {
            window.location.href = "result_activities.html";
        });
    });

}

document.getElementById("submitButton").onclick = getFinishedWorkout;

function getDate() {

    let date = new Date(Date.now()).toLocaleString().split(',')[0];
    date = date.split("/").join("_")
    return date;
}