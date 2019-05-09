BibliotecaUniboCesena


-FrontEnd-

Tecnologie usate: html, js(chartjs, ajax)

La pagina html contiene lo script js “biblioteca.js”, che mediante le funzioni “graphDay”, “graphWeek”, “graphMonth” e “graphYear” crea i grafici da visualizzare utilizzando la libreria ‘chartjs’.
All’avvio della pagina viene mandata una richiesta AJAX per la richiesta dei dati relativi alle entrate e alle uscite. Le funzioni che richiedono i dati sono “updateCharts” e “getStats”.
Queste stesse funzioni verranno richiamate a intervalli regolari in modo da avere sempre le nuove informazioni dal server. Ricevute le informazioni, e parsate a dovere si eseguono varie operazioni di estrazione dati che andranno ad aggiornare dinamicamente i quattro grafici.
Per ottenere nuovi dati dal server di liber8portal viene lanciato periodicamente uno script python, con la funzione “launchScript” che invia la richiesta di avvio con AJAX.
Il counter delle persone viene aggiornato periodicamente dalla funzione “updateCounter”. Inoltre si mantiene lo stato della biblioteca (aperto/chiuso), che può essere aggiornato in maniera automatica o manuale.
Automatica -> la biblioteca viene aperta alle 8:30, e viene chiusa alle 17 (ad eccezione del venerdì che la chiusura è prevista per le 14).
Manuale -> attraverso i comandi verso il bot Telegram si può cambiare a piacere lo stato dellla biblioteca.

-BackEnd-

Tecnologie usate: php, python(selenium, pyTelegramBOTapi), mysql


php:

biblioteca.php gestisce tutte le richieste provenienti dal client:
apri/chiudi_biblioteca-> scrive nel database l’apertura/chiusura della biblioteca
ottieni_dati -> restituisce tutti i dati collezionati dal server.
lancia_script -> lancia uno script python che andrà a collezionare i dati da liber8portal, e poi salvarli nel database.
ottieni_segnalazioni -> ottiene le segnalazioni dal server riguardante lo stato di inattività del contapersone.
ottieni_statistiche -> restituisce un’insieme di dati statistici a partire dai dati collezionati dal server.

script-liber8portal:

Realizzato in python è uno script che si appoggia a selenium per automatizzare la navigazione nel sito di liber8portal ed ottenere i dati aggiornati riguardo le entrate e le uscite dalla biblioteca.
Una volta ottenuti i dati vengono parsati e filtrati in modo da risultare il più solidi possibili prima dell’inserimento nel database.

BotTelegramBiblioteca:

Script in python che avvia il bot Telegram rendendolo operativo alle richieste da parte degli utenti.
Inoltre esegue autonomamente operazioni di aggiornamento riguardo lo stato dei gate all’entrata della biblioteca.
