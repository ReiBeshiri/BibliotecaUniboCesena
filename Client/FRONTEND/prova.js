var chartDay; //day
var chartWeek; //week
var chartMonth; //month
var chartYear; //year
var chart;
var entrateNow=0;
var listToday = [];
var max_posti_in_biblioteca = 123; //max posti = 2500 -> 2499 => 24 + 99 = 123
//inizio counter
var counter_list = [00,00000,"Entrate: "];
var str_counter_0 = counter_list[0];
var str_counter_1 = counter_list[1];
var str_counter_2 = counter_list[2];
var display_str = "";
var display_div = document.getElementById("counter_id");
////////////////////////////////////////////////////////

$(document).ready(function() {
  //intercept the unload of the window
  $(window).on("beforeunload", function() {
    //chiudi il bot telegram
  });
  //Apri biblioteca
  apriBiblioteca();
  //displayTime
  displayTime();setInterval(function(){displayTime();}, 60000);
  //funzione che modifica il contatore delle persone
  setInterval(function(){updateCounter();},500);
  //fine counter_lis
  //id html chart, tipo di chart, n valori (lun,mar,mer,gio,ven oppure altri poi decidi)
  graphDay("ChartDay", "line", 0, 0, 0, 0);
  chartDay = chart;
  graphWeek("ChartWeek", "bar", 0, 0, 0, 0);
  chartWeek = chart;
  graphMonth("ChartMonth", "bar", 0, 0, 0, 0);
  chartMonth = chart;
  graphYear("ChartYear", "bar", 0, 0, 0, 0);
  chartYear = chart;
  updateCharts();
  getStats();
  setInterval(function(){updateCharts();getStats();}, 30000);
  //launchScript(); //////////TOGLI COMMENTO DOPO
  setInterval(function(){launchScript();}, 1200000);
  //funzione che controlla se ci sono delle segnalazioni da riferire
  setInterval(function(){checkError();},30000);
  //console.log(screen.width);
  //console.log(screen.height);
});
  /*FUNZIONI*/
  //funzione per ottenere le statistiche
  function getStats(){
    var dataToSend="stats";
    $.post("../BACKEND/prova.php?request=ottieni_statistiche", dataToSend, function(data) {//richiede al server i dati sui giotni più/meno affollati e l'ora_di_punta
      if(data.status === "error") {
        console.log("errore durante il lancio dello script");
      } else {
        console.log("stats");
        //console.log(data);
        var i_max=0,i_min=0,max=0,min=99999;
        for (var i = 0; i < 5; i++) { //ciclo 5 volte perchè l'array è [lun,mar,mer,gio,ven,ora_di_punta], quindi da lun a ven 5
          console.log(max,data[i][0]);
          if(data[i][0] > max){
            max = data[i][0];
            i_max = i;
          } else if (data[i][0] < min) {
            min = data[i][0];
            i_min = i;
          }
        }
        //modifico l'html e lo aggiorno con i nuovi dati
        $("#giorno_maggiormente_affollato").empty();
        $("#giorno_maggiormente_affollato").text(data[i_max][1]);
        $("#giorno_minormente_affollato").empty();
        $("#giorno_minormente_affollato").text(data[i_min][1]);
        $("#ora_di_punta").empty();
        $("#ora_di_punta").text(data[data.length-1][1]);
      }
    });
  }
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
                label: 'andamento delle entrate giornaliere',
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
                label: 'andameno delle entrate settimanali',
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
  //console.log(chart.data.datasets[0].data[n]); //prendi la colonna n
  //chart.data.datasets[0].backgroundColor[n];   //prendi l'array della colonna n che indica il colore in background della colonna.
  //chart.data.datasets[0].borderColor[n] //prendi l'array della colonna n che indica il colore del bordo della colonna.
  chart.update();
  }
  //funzione per aggiornare il chartWeek/Month/Year/Day all'avvio
  function updateCharts(){
    //avere la data nel formato yyyy-mm-gg
    var dt = new Date().toISOString().split('T')[0].split('-');
    today = dt[0] + '-' + dt[1] + '-' + dt[2];
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
        } else if(data.length > 0){
          //console.log(data); data-> dataset con tutti i dati del database dei giorni della libreria
          var lun=0,mar=0,mer=0,gio=0,ven=0,lunCounter=0,marCounter=0,merCounter=0,gioCounter=0,venCounter=0;  //giorni
          var week1=0,week2=0,week3=0,week4=0,c=0;  //settimane
          var gen=0,feb=0,mrz=0,apr=0,mag=0,giu=0,lug=0,ago=0,set=0,ott=0,nov=0,dic=0;  //anni
          var col = 0;
          var compareH = [], compareT = [];
          console.log("script lanciato correttamente");
          for(var i = 0; i < data.length; i++){ //faccio un solo ciclo per ottenere i dati (costo O(N))
            //updateChartWeek //filtro i dati in base alle ore di interesse
            if(data[i]["ora"] !== "7:00" && data[i]["ora"] !== "18:00"){
              if(data[i]["giorno"] === "lun"){
                lun += data[i]["entrate"];lunCounter++;}
              else if (data[i]["giorno"] === "mar"){
                mar += data[i]["entrate"];marCounter++;}
              else if (data[i]["giorno"] === "mer"){
                mer += data[i]["entrate"];merCounter++;}
                else if(data[i]["giorno"] === "gio"){
                gio += data[i]["entrate"];gioCounter++;}
              else if (data[i]["giorno"] === "ven" && data[i]["ora"] !== "15:00" && data[i]["ora"] !== "16:00" && data[i]["ora"] !== "17:00"){
                ven += data[i]["entrate"];venCounter++;}
            }

            //updateChartMonth //ottengo i dati rispetto alle settimane (1,2,3,4 week) del mese corrente
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

            //udateChartYear //prendo i dati dei mesi di un anno
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

            //updateChartToday //i dati in list sono in list [0] le entrate e in list[1] le uscite
            if(data[i]["data"] === today){
              var list = [parseInt(data[i]["ora"].split(':')[0]), data[i]["entrate"] - data[i]["uscite"]];
              if (list[1] < 0){list[1] = 0;} // se le entrate vanno in negativo allora sono uscite
              compareH.push(list[0]);
              compareT.push(list)
              //console.log(data[i]["ora"].split(':')[0], data[i]["entrate"] - data[i]["uscite"]);
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
          //update today chartDay
          staticUpdateDay(compareH, compareT, listToday);//list today è la var che tiene i dati relativi al giorno corrente
          for (var i = 0; i < listToday.length; i++) {
            addData(chartDay, listToday[i][1], listToday[i][0]-7);
          }
        }
      });
    };
  //funzione di appoggio alla per l'aggiornamento del chartDay al primo avvio
  function staticUpdateDay(compareH, compareT, listToday) {
      compareH.sort(function(a, b){return a-b});
      for (var i = 0; i < compareH.length; i++){
        for (var j = 0; j < compareT.length; j++){
          if (compareH[i] === parseInt(compareT[j][0])) {
            listToday.push(compareT[j]);
          }
        }
      }
      if(listToday.length > 0){
        listToday[0][1] = 0;
        entrateNow = listToday[listToday.length-1][1];
      }
      //console.log(listToday,entrateNow);
    }
  //function to display Time
  function displayTime(){
      var d = new Date(); // for now
      h = d.getHours();
      m = d.getMinutes();
      if(h<10){h='0'+h;}
      if(m<10){m='0'+m;}
      time = h + ':' + m;
      document.getElementById('time').innerHTML=time;
    }
  //function to ask php to launch the script PYTHON
  function launchScript(){
    var dataToSend="stats";
    $.post("../BACKEND/prova.php?request=lancia_script", dataToSend, function(data) {
      if(data.status === "error") {
        console.log("Errore durante il lancio dello script");
      } else {
        console.log("Script lanciato correttamente");
      }
    });
  }
  //function to update the counter
  function updateCounter(){ //counter che si vede in alto a destra
    // clear count
    while (display_div.hasChildNodes()) {
        display_div.removeChild(display_div.lastChild);
    }
    if(str_counter_1 + str_counter_0 < max_posti_in_biblioteca && str_counter_0 !== entrateNow){
      if(str_counter_0 < entrateNow)
         str_counter_0++;
      else
         str_counter_0--;
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
  }
  //funzione che richiede al server le segnalazioni riguardanti il giorno odierno
  function checkError(){
    var dataToSend="check";
    $.post("../BACKEND/prova.php?request=ottieni_segnalazioni", dataToSend, function(data) {
      if(data.status === "error") {
        console.log("Errore durante il lancio dello script");
      } else {
        if(data[0] !== undefined){
          var errorcode = "In data " + data[0]["data"] + " si &egrave; verificato l'errore: " + data[0]["segnalazione"];
          console.log("Script-check lanciato correttamente");
          if(data.length >= 3){
            console.log("Si è presentato un errore");
            $("#errorcode").empty();
            $("#errorcode").append(errorcode);
          }
        }
      }
    });
  }
  //funzione che inizialmente va a mettere nel database lo stato della biblioteca ad aperto
  function apriBiblioteca(){
    var dataToSend="stats";
    $.post("../BACKEND/prova.php?request=apri_biblioteca", dataToSend, function(data) {
      if(data.status === "error") {
        console.log("Errore durante il lancio dello script");
      } else {
        console.log("Biblioteca aperta");
      }
    });
  }
