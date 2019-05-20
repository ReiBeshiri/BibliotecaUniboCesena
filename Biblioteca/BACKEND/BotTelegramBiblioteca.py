import telebot
import time
import threading
import datetime
import mysql.connector


#connessione al database
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="biblioteca"
)
mycursor = mydb.cursor()
#getdate istance
now = datetime.datetime.now()
#
#all'avvio del bot inserisco il fatto che la biblioteca è aperta
#stato_biblioteca="la biblioteca è aperta"
#date = str(now.year) + '-' + str(now.month).zfill(2) + '-' + str(now.day).zfill(2)
#sql = "INSERT IGNORE INTO stato_biblioteca (data, stato) VALUES (%s ,%s)"
#val = (str(date), stato_biblioteca)
#mycursor.execute(sql, val)
#mydb.commit()
#print(mycursor.rowcount, "record inserted.")
#
#token del bot telegram
bot_token = '832858084:AAGDIIfF5OtaSYzkTKQjlHdw4ITelnbGW2E'
#creo l'istanza del bot con i parametri
bot = telebot.TeleBot(bot_token, threaded=True , num_threads=4)
#handler per le chat private
#ritorna lo stato della biblioteca (aperto/chiuso)
@bot.message_handler(commands=['stato'])
def send_welcome(message):
    date = str(now.year) + '-' + str(now.month).zfill(2) + '-' + str(now.day).zfill(2)
    sql = "SELECT stato FROM stato_biblioteca WHERE data=%s ORDER BY id DESC LIMIT 1"
    val=(str(date),)
    mycursor.execute(sql, val)
    myresult=mycursor.fetchall()
    for x in myresult:
        print(x)
    if(len(myresult) == 0):
        myresult = "la biblioteca è chiusa"
    bot.reply_to(message, myresult)
#cambia lo stato della biblioteca da chiuso ad aperto (solo per i responsabili)
@bot.message_handler(commands=['apri'])
def send_welcome(message):
    stato_biblioteca="la biblioteca è aperta"
    date = str(now.year) + '-' + str(now.month).zfill(2) + '-' + str(now.day).zfill(2)
    sql = "INSERT IGNORE INTO stato_biblioteca (data, stato) VALUES (%s ,%s)"
    val = (str(date), stato_biblioteca)
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record inserted.")
    bot.reply_to(message, stato_biblioteca)
#cambia lo stato della biblioteca da aperto a chiuso (solo per i responsabili)
@bot.message_handler(commands=['chiudi'])
def send_welcome(message):
    stato_biblioteca="la biblioteca è chiusa"
    date = str(now.year) + '-' + str(now.month).zfill(2) + '-' + str(now.day).zfill(2)
    sql = "INSERT IGNORE INTO stato_biblioteca (data, stato) VALUES (%s ,%s)"
    val = (str(date), stato_biblioteca)
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record inserted.")
    bot.reply_to(message, stato_biblioteca)
#bot.send_message(cid, "send_message") Rei:574478664 #bot-id:832858084  #chat-id gruppo:386484981-> per inviare un messaggio in broadcast al gruppo telegram

#definisco il thread per le chat private che va in polling della getUpdates(metodo fornitoda telegram per avere i messaggi in entrata del bot)
def ThreadPrivateChat():
    bot.polling(interval=2)
#definisco il thread per la chat nel gruppo telegram
def ThreadGroupChat():
	while True:
		now = datetime.datetime.now()
		date = str(now.year) + '-' + str(now.month).zfill(2) + '-' + str(now.day).zfill(2)
		sql = "SELECT * FROM segnalazione WHERE data = %s"
		val = (str(date),)
		mycursor.execute(sql, val)
		myresult=mycursor.fetchall()
		for x in myresult:
			print(x)
		print(len(myresult))
        if(len(myresult) >= 3 and len(myresult)%2 == 1 and now.hour < 18):#avviso di segnalazione ogni due ore
            bot.send_message("-386484981", "avviso: la biblioteca risulta chiusa/vuota") #chat-id gruppo:386484981-> per inviare un messaggio in broadcast al gruppo telegram
		time.sleep(60)

#creo le istanze dei thread per il bot, successivamente lancio i thread
threadPrivateChat = threading.Thread(target=ThreadPrivateChat, args=[])
threadGroupChat = threading.Thread(target=ThreadGroupChat, args=[])
threadPrivateChat.deamon=True
threadGroupChat.deamon=True
threadPrivateChat.start()
threadGroupChat.start()
