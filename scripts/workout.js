getUserGoal();

let goal = localStorage.getItem(0);

new Promise(function (resolve, reject) {
    let numericals = getNumericals(goal);
    setTimeout(() => resolve(numericals), 2000);

}).then(function (numericals) {
    setNumericalValues(numericals);

});

new Promise(function (resolve, reject) {
    let workout = getWorkout(goal);
    setTimeout(() => resolve(workout), 2000);

}).then(function (workout) {

    setWorkout(workout);
    localStorage.setItem(1, workout);

});

function getUserGoal() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).onSnapshot(function (snap) {
            let userGoal = (snap.data().Goal);
            localStorage.setItem(0, userGoal);
        });
    })
}

function getWorkout(userGoal) {
    let name = [];
    if (userGoal == "Gain muscles") {
        db.collection("workouts/gainMuscle/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                name.push(doc.data().name);
            })
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
        db.collection("workouts/gainMuscle/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reps.push(doc.data()["Rep(#)"]);
                weight.push(doc.data()["Weight(lb)"]);
                distance.push(doc.data()["Distance(km)"]);
            })
        })
    } else if (userGoal == "Keep healthy status") {
        db.collection("workouts/keepHealthy/exercises").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reps.push(doc.data()["Rep(#)"]);
                weight.push(doc.data()["Weight(lb)"]);
                distance.push(doc.data()["Distance(km)"]);
            })
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

    return [reps, weight, distance];

}

function setWorkout(workoutNames) {
    demoID = [];
    for (let i = 0; i < workoutNames.length; i++) {

        document.getElementById("exercise" + (i + 1)).innerHTML =
            "Exercise " + (i + 1) + " - " + workoutNames[i];

        demoID[i] = workoutNames[i].replace(" ", "").toLowerCase();
        document.getElementById("demo_" + demoID[i]).id = "demo" + (i + 1);
    }

}

function setNumericalValues(numericalArray) {

    let reps = numericalArray[0];
    let weight = numericalArray[1];
    let distance = numericalArray[2];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(weight[i] == undefined){
                removeElement("weightCol" + (i + 1) + "-" + (j + 1));
                document.getElementById("repText" + (i + 1) + "-" + (j + 1)).innerHTML = "Distance (km)";
                document.getElementById("rep" + (i + 1) + "-" + (j + 1)).id = "distance" + (i + 1) + "-" + (j + 1);
                if(j > 0){
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
    exercises = exercises.split(",");

    for(let k = 0; k <exercises.length; k++){
        exercises[k] = exercises[k].toLowerCase();
    }
    
    for (let i = 0; i < 5; i++) {
        totalWeight[i] = 0;
        for (let j = 0; j < 5; j++) {
            if(document.getElementById("weight" + (i + 1) + "-" + (j + 1)) == null){
                if(j == 0){
                    totalDistance += parseFloat(document.getElementById("distance" + (i + 1) + "-" + (j + 1)).value);
                }
            } else {
                totalWeight[i] += (document.getElementById("weight" + (i + 1) + "-" + (j + 1)).value) *  (document.getElementById("rep" + (i + 1) + "-" + (j + 1)).value);
                
            }
        }
    }
 
    let key = "workout_" + getDate();

    firebase.auth().onAuthStateChanged(function(user){
    
        var promise = db.collection("users/").doc(user.uid).update({

            [key]: {
                [exercises[0]]: totalWeight[0],
                [exercises[1]]: totalWeight[1],
                [exercises[2]]: totalWeight[2],
                [exercises[3]]: totalDistance,
                [exercises[4]]: totalWeight[4]
            }
         })
         promise.then(function(){
             window.location.href="result_check.html";
         });
     });

}

document.getElementById("submitButton").onclick = getFinishedWorkout;

function getDate(){

    let date = new Date(Date.now()).toLocaleString().split(',')[0];
    date = date.split("/").join("_")
    return date;
}