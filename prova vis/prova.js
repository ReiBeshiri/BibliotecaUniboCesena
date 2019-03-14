var chart;
$(document).ready(function() {
  graph("myChart", "bar", 213, 129, 159, 200);
  /*graph("myChart2", "pie", 113, 229, 259, 100);
  graph("myChart3", "line", 113, 229, 259, 100);*/
  console.log($(document).width());
  console.log($(window).width());
  console.log(screen.width); // QUESTO è MEGLIO
  console.log($(document).height());
  console.log($(window).height());
  console.log(screen.height);

  /*var run=new ActiveXObject('WSCRIPT.Shell').Run("type NUL > 1.txt");
  /*var shell = WScript.CreateObject("WScript.Shell");
  shell.Run("type NUL > 1.txt");
  /*const execSync = require('child_process').execSync;
  // import { execSync } from 'child_process';  // replace ^ if using ES modules
  execSync("type NUL > 1.txt");  // the default is 'buffer'*/

//code before the pause
setInterval(function(){
    var l1 = Math.random()*500 * Math.random();
    console.log(Math.round(l1));
    var data = l1;
    addData(chart, "new data", data);
  }, 2000);
});

//crea il grafico a partire da id nel html, tipo grafico e valori
function graph(id,type,a,b,c,d) {
  var l=a;
  var m=b;
  var g=c;
  var v=d;
  var ctx = document.getElementById(id).getContext('2d');
  var myChart = new Chart(ctx, {
      type: type,
      data: {
          labels: ["Lun", "Mar", "Mer", "Gio", "Ven"],
          datasets: [{
              label: '# of people',
              data: [l, m, m, g, v],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.4)',
                  'rgba(54, 162, 235, 0.4)',
                  'rgba(255, 206, 86, 0.4)',
                  'rgba(75, 192, 192, 0.4)',
                  'rgba(153, 102, 255, 0.4)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {

      "responsive": true,
      "maintainAspectRatio": false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  chart = myChart;
}

function addData(chart, label, data) {
var i = 0;
chart.data.labels.push(label);
chart.data.datasets.forEach((dataset) => {
  dataset.data.push(data);
  i++
});
//console.log(chart.data.datasets[0].data[n]); //prendi la colonna n (a partire da desrtra).
//chart.data.datasets[0].backgroundColor[n];   //prendi l'array della colonna n che indica il colore in background della colonna.
//chart.data.datasets[0].borderColor[n] //prendi l'array della colonna n che indica il colore del bordo della colonna.
chart.update();
}
