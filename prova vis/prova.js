var chart1;
var chart2;
var chart3;
var chart4;
var chart5;
var chart;
var max_posti_in_biblioteca = 123; //max posti = 2500 -> 2499 => 24 + 99 = 123
$(document).ready(function() {

  //inizio counter
   var counter_list = [00,00000,"persone: "];
   var str_counter_0 = counter_list[0];
   var str_counter_1 = counter_list[1];
   var str_counter_2 = counter_list[2];
   var display_str = "";
   var display_div = document.getElementById("counter_id");

   setInterval(function(){
     // clear count
     while (display_div.hasChildNodes()) {
         display_div.removeChild(display_div.lastChild);
     }
     if(str_counter_1 + str_counter_0 < max_posti_in_biblioteca){
       str_counter_0++;
     }
     if (str_counter_0 > 99) {
       str_counter_0 = 10; // reset count
       str_counter_1++;    // increase next count
     }
     if(str_counter_1>99999){
       str_counter_2++;
     }
     display_str = str_counter_2.toString() + str_counter_1.toString() + str_counter_0.toString();
     for (var i = 0; i < display_str.length; i++) {
       var new_span = document.createElement('span');
       new_span.className = 'num_tiles';
       new_span.innerText = display_str[i];
       display_div.appendChild(new_span);
     }
   },100);
   //fine counter_lis

  //id html chart, tipo di chart, n valori (lun,mar,mer,gio,ven oppure altri poi decidi)
  graph("myChart", "bar", 2130, 1290, 1590, 2000);
  chart1 = chart;
  graph("myChart2", "pie", 1130, 2290, 2490, 1000);
  chart2 = chart;
  graph("myChart3", "line", 1600, 2100, 2490, 981);
  chart3 = chart;
  graph("myChart4", "bar", 1430, 1990, 2190, 1260);
  chart4 = chart;
  graph("myChart5", "line", 1530, 1800, 2590, 1110);
  chart5 = chart;

  /*
  console.log(screen.width);
  console.log(screen.height);
  */

//code before the pause
setInterval(function(){
    var l1 = Math.random()*2500;
    console.log(Math.round(l1));
    var data = l1;
    addData(chart1, "new", data);
  }, 5000);
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
