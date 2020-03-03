

    let chart1 = new CanvasJS.Chart("Chart1", {
        animationEnabled: false,
        theme: "dark2",
        title:{
            text: "Calories Burned"
        },
        axisY:{
            title: "Calories (kCal)",
            includeZero: false
        },
        axisX:{
            title: "Week"
        },

        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [
                { x:1, y: 450},
                { x:2, y: 500},
                { x:3, y: 520},
                { x:4, y: 460 },
                ]
        }]
    });
    chart1.render();
    
    

    let chart2 = new CanvasJS.Chart("Chart2", {
        animationEnabled: false,
        theme: "dark2",
        title:{
            text: "Weight"
        },
        axisY:{
            title: "Weight (kg)",
            includeZero: false
        },
        axisX:{
            title: "Week"
        },

        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints: [
                { x:1, y: 150},
                { x:2, y: 147},
                { x:3, y: 146},
                { x:4, y: 144},
                ]
        }]
    });
    chart2.render();
    
    