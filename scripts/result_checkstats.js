
let day = localStorage.getItem("day");
let month = localStorage.getItem("month");
let year = localStorage.getItem("year");


let d = new Date(year, month - 1, day, 0, 0, 0, 0);
let dateArr = new Array();
let workoutArr = [];

const MAX = 7;

for (let i = 0; i < MAX; i++){
    dateArr[i] = new Date(year, month - 1, day, 0, 0, 0, 0);
    dateArr[i].setDate(d.getDate() - i);
    
    workoutArr[i] = "workout_" + (dateArr[i].getMonth() + 1) + "_" + (dateArr[i].getDate()) + "_" + (dateArr[i].getFullYear());


}


firebase.auth().onAuthStateChanged(function(user){
 db.collection("users/").doc(user.uid).onSnapshot(function(snap){

        for (let i = 0; i < MAX; i++){
            let titleY = "Y" + i;
            let titleX = "X" + i;
            if (snap.data()[workoutArr[i]] == null){
                localStorage.setItem(titleY, null)
            } else {
            localStorage.setItem(titleY, snap.data()[workoutArr[i]]["calories"])
            }
            localStorage.setItem(titleX, dateArr[i].getDate());
            console.log(dateArr[i].getDate());
        }

        localStorage.setItem("calories", snap.data().MyCalories);
    })
    
    
})

document.querySelector("#totalC").innerHTML = "Total Calories Burned Since First Day: " + localStorage.getItem("calories") + " kCal !";

let xArr = [];
let yArr = [];



for (let i = 0; i < MAX; i++){
    let titleY = "Y" + i;
    let titleX = "X" + i;
    xArr[i] = localStorage.getItem(titleX);
    yArr[i] = localStorage.getItem(titleY);
    xArr[i] = parseInt(xArr[i]);
    yArr[i] = parseInt(yArr[i]);
}

xArr.reverse();
yArr.reverse();



    let chart1 = new CanvasJS.Chart("Chart1", {
        animationEnabled: false,
        theme: "dark2",
        title:{
            text: "Calories Burned"
        },
        axisY:{
            minimum: 400,
            maximum: 700,
            title: "Calories (kCal)",
            includeZero: false
        },
        axisX:{
            title: "Day",
            
            minimum: xArr[0],
            maximum: xArr[6]
        },

        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [

                { x: xArr[0], y: yArr[0]},
                
                { x: xArr[1], y: yArr[1]},
                
                { x: xArr[2], y: yArr[2]},
                
                { x: xArr[3], y: yArr[3]},
                
                { x: xArr[4], y: yArr[4]},
                
                { x: xArr[5], y: yArr[5]},
                
                { x: xArr[6], y: yArr[6]},
                ]
        }]
    });
    chart1.render();

    
    
