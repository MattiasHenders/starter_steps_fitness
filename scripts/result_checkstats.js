let day = localStorage.getItem("day");
let month = localStorage.getItem("month");
let year = localStorage.getItem("year");
let date = month + "/" + day + "/" + year;
let d = new Date(year, month - 1, day, 0, 0, 0, 0);
let dateArr = new Array();
let workoutArr = [];
const MAX = 7;
document.querySelector("#complete").innerHTML = "The week ending on " + date;
/**
 * Promise function to get the data first before drawing the graph.
 */
new Promise(function (resolve, reject) {
    setLocalStorage();
    setTimeout(() => resolve(), 2000);
}).then(function () {
    renderGraph();
});
/**
 * Save the past 7 day's dates of the chosen date into an array.
 */
function setLocalStorage() {
    for (let i = 0; i < MAX; i++) {
        dateArr[i] = new Date(year, month - 1, day, 0, 0, 0, 0);
        dateArr[i].setDate(d.getDate() - i);
        workoutArr[i] = "workout_" + (dateArr[i].getMonth() + 1) + "_" + (dateArr[i].getDate()) + "_" + (dateArr[i].getFullYear());
    }
    console.log(workoutArr);
    /**
     * Get calories burned stats of a chosen week from database.
     */
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users/").doc(user.uid).onSnapshot(function (snap) {
            for (let i = 0; i < MAX; i++) {
                let titleY = "Y" + i;
                let titleX = "X" + i;
                if (snap.data()[workoutArr[i]] == null) {
                    localStorage.setItem(titleY, 0)
                } else {
                    localStorage.setItem(titleY, snap.data()[workoutArr[i]]["calories"])
                }
                localStorage.setItem(titleX, i + 1);
                console.log(dateArr[i].getDate());
            }
            localStorage.setItem("calories", snap.data().MyCalories);
        })
    })
}
/**
 * Renders the calories stats graph.
 */
function renderGraph() {
    document.querySelector("#totalC").innerHTML = "Total Calories Burned Since First Day: " + localStorage.getItem("calories") + " kCal !";
    let xArr = [];
    let yArr = [];
    /**
     * Save the calories burned data of chosen week and day number into an array for graph later.
     */
    for (let i = 0; i < MAX; i++) {
        let titleY = "Y" + i;
        let titleX = "X" + i;
        xArr[i] = localStorage.getItem(titleX);
        yArr[i] = localStorage.getItem(titleY);
        xArr[i] = parseInt(xArr[i]);
        yArr[i] = parseInt(yArr[i]);
    }
    yArr.reverse();
    draw(xArr, yArr);
}
/**
 * Draw the line graph of calories burned from the week ending on chosen date.
 * @param {*} xArr x-coordinates
 * @param {*} yArr y-coordinates
 */
function draw(xArr, yArr) {
    console.log(xArr);
    console.log(yArr);
    let chart1 = new CanvasJS.Chart("Chart1", {
        animationEnabled: false,
        theme: "dark2",
        title: {
            text: "Calories Burned"
        },
        axisY: {
            minimum: 0,
            maximum: Math.max.apply(null, yArr) + 200,
            title: "Calories (kCal)",
        },
        axisX: {
            title: "Day",
            minimum: xArr[0],
            maximum: xArr[6]
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: [
                { x: xArr[0], y: yArr[0] },
                { x: xArr[1], y: yArr[1] },
                { x: xArr[2], y: yArr[2] },
                { x: xArr[3], y: yArr[3] },
                { x: xArr[4], y: yArr[4] },
                { x: xArr[5], y: yArr[5] },
                { x: xArr[6], y: yArr[6] },
            ]
        }]
    });
    chart1.render();
}

