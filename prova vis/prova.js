var chart1; //day
var chart2; //week
var chart3; //month
var chart4; //year
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

   //funzione che modifica il contatore
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
   },500);
   //fine counter_lis

  //id html chart, tipo di chart, n valori (lun,mar,mer,gio,ven oppure altri poi decidi)
  graphDay("myChart", "line", 830, 1290, 1590, 2000);
  chart1 = chart;
  graphWeek("myChart2", "bar", 1130, 2290, 2490, 1000);
  chart2 = chart;
  graphMonth("myChart3", "bar", 1600, 2100, 2490, 981);
  chart3 = chart;
  graphYear("myChart4", "bar", 1430, 1990, 2190, 1260);
  chart4 = chart;

  /*
  console.log(screen.width);
  console.log(screen.height);
  */

  //UPDATE PERIODICAMENTE IL SERVER (CHIAMA PHP CHE LANCIA LO SCRIPT PYTHON)
  setInterval(function(){
      var dataToSend = {
        todo: "update server"
      };
      $.post("./prova.php?request=ottieni_dati", dataToSend, function(data) {
        if(data.status === "error") {
          console.log("errore durante il lancio dello script");
        } else {
          console.log("script lanciato correttamente");
          console.log(data);
        }
      });
    }, 10000);//1 sec
  });

  //code before the pause
  /*setInterval(function(){
      var l1 = Math.random()*2500;
      console.log(Math.round(l1));
      var data = l1;
      addData(chart1, "new", data);
    }, 50000000);
  });*/

  //funzione per costruire il primo grafico (quello giornaliero)
  function graphDay(id,type,a,b,c,d) {
    var l=a;
    var m=b;
    var g=c;
    var v=d;
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
            datasets: [{
                label: 'andamento giornaliero',
                data: [l, m, m, g, v, l, m, m, g, v, g],
                backgroundColor: [
                    'rgba(55, 99, 132, 0.4)'
                ],
                borderColor: [
                    'rgba(55, 99, 132, 1)'
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
  //funzione per costruire il primo grafico (quello annuale)
  function graphYear(id,type,a,b,c,d) {
    var l=a;
    var m=b;
    var g=c;
    var v=d;
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
            datasets: [{
                label: 'andamento annuale',
                data: [l, m, m, g, v, l, m, m, g, v, g, l],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(153, 102, 255, 0.4)',
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
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
  //funzione per costruire il primo grafico (quello settimanale)
  function graphWeek(id,type,a,b,c,d) {
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
                label: 'andameno settimanale',
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
  //funzione per costruire il primo grafico (quello mensile)
  function graphMonth(id,type,a,b,c,d) {
    var l=a;
    var m=b;
    var g=c;
    var v=d;
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: ["sett1", "sett2", "sett3", "sett4", "sett5"],
            datasets: [{
                label: 'andameno mensile',
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
  //dato un chart modifico i dati
  function addData(chart, label, data) {
  var i = 0;
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
    i++
  });
  //console.log(chart.data.datasets[0].data[n]); //prendi la colonna n (a partire da destra).
  //chart.data.datasets[0].backgroundColor[n];   //prendi l'array della colonna n che indica il colore in background della colonna.
  //chart.data.datasets[0].borderColor[n] //prendi l'array della colonna n che indica il colore del bordo della colonna.
  chart.update();
  }
