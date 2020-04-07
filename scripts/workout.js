//Sets the page
setWorkoutPage();

/**
 * Gets users from firebase as an array and sets the page accordingly
 */
function setWorkoutPage() {
    let userGoal;
    let workout;
    let numericals;
    // Gets user info and sets it into the page
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
                setTimeout(function () {
                    numericals = localStorage.getItem(1);
                    workout = localStorage.getItem(2);
                    setWorkout(workout);
                    setNumericalValues(numericals);
                }, 1000)
            })
    })
}

/**
 *  Gets the users goal from firebase, puts it in local storage
 */
function getUserGoal() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).onSnapshot(function (doc) {
            let userGoal = (doc.data().Goal);
            localStorage.setItem(0, userGoal);
        });
    })
}

/**
 * Gets the names of the workouts and puts them in local storage
 * 
 * @param {*} userGoal the users goal from local storage
 */
function getWorkout(userGoal) {
    let name = [];
    // Numbers based on workout type
    if (userGoal == "Gain muscles") {
        db.collection("workouts/gainMuscle/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                name.push(doc.data().name);
            })
        }).then(function () {
            localStorage.setItem(2, name);
        })
    } else if (userGoal == "Keep healthy status") {
        db.collection("workouts/keepHealthy/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                name.push(doc.data().name);
            })
        }).then(function () {
            localStorage.setItem(2, name);
        })
    } else {
        db.collection("workouts/lossWeight/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                name.push(doc.data().name);
            })
        }).then(function () {
            localStorage.setItem(2, name);
        })
    }
}

/**
 * Gets the numbers for each workout and puts it into local storage.
 * 
 * @param {*} userGoal the users goal from local storage
 */
function getNumericals(userGoal) {
    // Numbers based on workout type
    if (userGoal == "Gain muscles") {
        setTypeWorkout("workouts/gainMuscle/exercises");
    } else if (userGoal == "Keep healthy status") {
        setTypeWorkout("workouts/keepHealthy/exercises");
    } else {
        setTypeWorkout("workouts/lossWeight/exercises");
    }
}

/**
 * Sets the names of the workouts into the page from local storage
 * base on url given
 * 
 * @param {*} url the url of the data base
 */
function setTypeWorkout(url) {
    let weight = [];
    let reps = [];
    let distance = [];
    db.collection(url).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reps.push(doc.data()["Rep(#)"]);
                weight.push(doc.data()["Weight(lb)"]);
                distance.push(doc.data()["Distance(km)"]);
            })

        }).then(function () {
            localStorage.setItem(1, [reps, weight, distance]);
        })
}

/**
 * Loads the names of the workouts into the page from local storage
 * 
 * @param {*} names the names of the workouts
 */
function setWorkout(names) {

    workoutNames = names.split(",");

    demoID = [];
    for (let i = 0; i < workoutNames.length; i++) {

        document.getElementById("exercise" + (i + 1)).innerHTML =
            "Exercise " + (i + 1) + " - " + workoutNames[i];

        //Sets demos as the correct id for each workout.
        demoID[i] = workoutNames[i].replace(" ", "").toLowerCase();
        document.getElementById("demo_" + demoID[i]).id = "demo" + (i + 1);
    }

}

/**
 * Loads the numbers for each excerise into the page from local storage.
 * 
 * @param {*} numArr the array of weights, reps and distance
 */
function setNumericalValues(numArr) {
    let reps = [];
    let weight = [];
    let distance = [];
    // Gets each item based off
    numericalArray = numArr.split(",");
    for (let i = 0; i < 5; i++) {
        reps[i] = numericalArray[i];
        weight[i] = numericalArray[i + 5];
        distance[i] = numericalArray[i + 10];
    }
    // Loops through the document formatting the workout page
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

/**
 * Removes an element from the document, used for running.
 * 
 * @param {*} elementId element to be removed
 */
function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

/**
 * Gets the completed workout from the user and puts it into the database.
 */
function getFinishedWorkout() {
    let totalDistance = 0;
    let totalWeight = [];
    let exercises = localStorage.getItem(2);
    exercises = exercises.split(",");
    //Formatting for document use
    for (let k = 0; k < exercises.length; k++) {
        exercises[k] = exercises[k].toLowerCase();
    }
    // Sets weight, reps and distance
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
    // Calories not implemented a random number is used instead.
    let randomCalories = Math.floor(Math.random() * 100) + 500;

    //Set the data
    setData(exercises, totalWeight, totalDistance, randomCalories);
}

/**
 * Sets the data into firebase for the workout.
 * 
 * @param {*} exercises excersises
 * @param {*} totalWeight total Weight lifted
 * @param {*} totalDistance total Distance ran
 * @param {*} randomCalories calories for database
 */
function setData(exercises, totalWeight, totalDistance, randomCalories) {
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
                [caexercises[2]]: totalWeight[2],
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

// The function when a user is completed their workout
document.getElementById("submitButton").onclick = getFinishedWorkout;

/**
 * Gets the date for the workout id.
 */
function getDate() {

    let date = new Date(Date.now()).toLocaleString().split(',')[0];
    date = date.split("/").join("_")
    return date;
}