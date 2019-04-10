var chartDay; //day
var chartWeek; //week
var chartMonth; //month
var chartYear; //year
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

   //funzione che modifica il contatore delle persone
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
  graphDay("ChartDay", "line", 830, 1290, 1590, 2000);
  chartDay = chart;
  graphWeek("ChartWeek", "bar", 0, 0, 0, 0);
  chartWeek = chart;
  graphMonth("ChartMonth", "bar", 0, 0, 0, 0);
  chartMonth = chart;
  graphYear("ChartYear", "bar", 0, 0, 0, 0);
  chartYear = chart;
  updateCharts();
  /*
  console.log(screen.width);
  console.log(screen.height);
  */
  //UPDATE PERIODICAMENTE IL SERVER (CHIAMA PHP CHE LANCIA LO SCRIPT PYTHON)
  /*setInterval(function(){
      var dataToSend = {
        todo: "update server"
      };
      $.post("../BACKEND/prova.php?request=ottieni_dati", dataToSend, function(data) {
        if(data.status === "error") {
          console.log("errore durante il lancio dello script");
        } else {
          var lun = 0;
          var mar = 0;
          var mer = 0;
          var gio = 0;
          var ven = 0;
          var col = 0;
          console.log("script lanciato correttamente");
          for(var i = 0; i < data.length; i++){
            if(data[i]["giorno"] === "lun")
              lun += data[i]["entrate"];
            else if (data[i]["giorno"] === "mar")
              mar += data[i]["entrate"];
            else if (data[i]["giorno"] === "mer")
              mer += data[i]["entrate"];
            else if(data[i]["giorno"] === "gio")
              gio += data[i]["entrate"];
            else {
              ven += data[i]["entrate"];
            }
          }
          addData(chartWeek, lun, col);
          col++
          addData(chartWeek, mar, col);
          col++
          addData(chartWeek, mer, col);
          col++
          addData(chartWeek, gio, col);
          col++
          addData(chartWeek, ven, col);
        }
      });
    }, 10000);//1 sec*/
  });

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
            labels: ["sett1", "sett2", "sett3", "sett4"],
            datasets: [{
                label: 'andameno mensile',
                data: [l, m, g, v],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
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
  function addData(chart, data, n) {
  chart.data.datasets[0].data[n] = Math.round(data);
  /*chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });*/
  //console.log(chart.data.datasets[0].data[n]); //prendi la colonna n (a partire da destra).
  //chart.data.datasets[0].backgroundColor[n];   //prendi l'array della colonna n che indica il colore in background della colonna.
  //chart.data.datasets[0].borderColor[n] //prendi l'array della colonna n che indica il colore del bordo della colonna.
  chart.update();
  }
  //funzione per aggiornare il chartWeek/Month/Year all'avvio
  function updateCharts(){
    //avere la data nel formato yyyy-mm-gg
    var dt = new Date().toISOString().split('T')[0].split('-');
    if(dt[1] === '01'){
      dt[1] = 12;
      dt[0]--;
    }else {
        dt[1] = dt[1]>10?dt[1]--:('0' + dt[1]--).slice(-2);
    }
    dt = dt[0] + '-' + dt[1];
    //fine parsing
      var dataToSend = {
        todo: "update server"
      };
      $.post("../BACKEND/prova.php?request=ottieni_dati", dataToSend, function(data) {
        if(data.status === "error") {
          console.log("errore durante il lancio dello script");
        } else {
          var lun=0,mar=0,mer=0,gio=0,ven=0,lunCounter=0,marCounter=0,merCounter=0,gioCounter=0,venCounter=0;  //giorni
          var week1=0,week2=0,week3=0,week4=0,c=0;  //settimane
          var gen=0,feb=0,mrz=0,apr=0,mag=0,giu=0,lug=0,ago=0,set=0,ott=0,nov=0,dic=0;  //anni
          var col = 0;
          console.log("script lanciato correttamente");
          for(var i = 0; i < data.length; i++){
            //updateChartWeek
            if(data[i]["giorno"] === "lun"){
              lun += data[i]["entrate"];lunCounter++;}
            else if (data[i]["giorno"] === "mar"){
              mar += data[i]["entrate"];marCounter++;}
            else if (data[i]["giorno"] === "mer"){
              mer += data[i]["entrate"];merCounter++;}
            else if(data[i]["giorno"] === "gio"){
              gio += data[i]["entrate"];gioCounter++;}
            else if (data[i]["giorno"] === "ven"){
              ven += data[i]["entrate"];venCounter++;}

            //updateChartMonth
            var meseLibrary = data[i]["data"].split('-');//parso la data
            var giornoLibrary = parseInt(meseLibrary[2]);
            meseLibrary = meseLibrary[0] + '-' + meseLibrary[1];//parso la data
            if(meseLibrary === dt){
              if(giornoLibrary <= 7)
                week1 += data[i]["entrate"];
              else if(giornoLibrary > 7 && giornoLibrary <= 14)
                week2 += data[i]["entrate"];
              else if(giornoLibrary > 14 && giornoLibrary <= 21)
                week3 += data[i]["entrate"];
              else if(giornoLibrary > 21)
                week4 += data[i]["entrate"];
            }

            //udateChartYear
            var yearLibrary = data[i]["data"].split('-');//parso la data
            var meseLibrary = parseInt(yearLibrary[1]);
            yearLibrary = yearLibrary[0];
            if(yearLibrary === dt.split('-')[0]){
              if(meseLibrary === 1)
                gen += data[i]["entrate"];
              else if(meseLibrary === 2)
                feb += data[i]["entrate"];
              else if(meseLibrary === 3)
                mrz += data[i]["entrate"];
              else if(meseLibrary === 4)
                apr += data[i]["entrate"];
              else if(meseLibrary === 5)
                mag += data[i]["entrate"];
              else if(meseLibrary === 6)
                giu += data[i]["entrate"];
              else if(meseLibrary === 7)
                lug += data[i]["entrate"];
              else if(meseLibrary === 8)
                ago += data[i]["entrate"];
              else if(meseLibrary === 9)
                set += data[i]["entrate"];
              else if(meseLibrary === 10)
                ott += data[i]["entrate"];
              else if(meseLibrary === 11)
                nov += data[i]["entrate"];
              else if(meseLibrary === 12)
                dic += data[i]["entrate"];
            }
          }
          //update chart week
          addData(chartWeek, lun/lunCounter, col);
          col++;
          addData(chartWeek, mar/marCounter, col);
          col++;
          addData(chartWeek, mer/merCounter, col);
          col++;
          addData(chartWeek, gio/gioCounter, col);
          col++;
          addData(chartWeek, ven/venCounter, col);
          //update chart month
          col=0;
          addData(chartMonth, week1, col);
          col++;
          addData(chartMonth, week2, col);
          col++;
          addData(chartMonth, week3, col);
          col++;
          addData(chartMonth, week4, col);
          col=0;
          addData(chartYear, gen, col);
          col++;
          addData(chartYear, feb, col);
          col++;
          addData(chartYear, mrz, col);
          col++;
          addData(chartYear, apr, col);
          col++;
          addData(chartYear, mag, col);
          col++;
          addData(chartYear, giu, col);
          col++;
          addData(chartYear, lug, col);
          col++;
          addData(chartYear, ago, col);
          col++;
          addData(chartYear, set, col);
          col++;
          addData(chartYear, ott, col);
          col++;
          addData(chartYear, nov, col);
          col++;
          addData(chartYear, dic, col);
        }
      });
    };