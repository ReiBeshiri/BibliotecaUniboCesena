import telebot
import time
import threading
import datetime
import mysql.connector

stato_biblioteca="la biblioteca è aperta"
#connessione al database
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="biblioteca"
)
mycursor = mydb.cursor()

#token del bot telegram
bot_token = '832858084:AAGDIIfF5OtaSYzkTKQjlHdw4ITelnbGW2E'
#creo l'istanza del bot con i parametri
bot = telebot.TeleBot(bot_token, threaded=True , num_threads=4)

#handler per le chat private
@bot.message_handler(commands=['stato'])
def send_welcome(message):
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
		par = (str(date),)
		par = ("2019-04-17",)
		mycursor.execute(sql, par)
		myresult=mycursor.fetchall()
		for x in myresult:
			print(x)
		print(len(myresult))
		bot.send_message("-386484981", "send_message1") #chat-id gruppo:386484981-> per inviare un messaggio in broadcast al gruppo telegram
		time.sleep(30)

#creo le istanze dei thread per il bot e setto deamon=true, successivamente lancio i thread
threadPrivateChat = threading.Thread(target=ThreadPrivateChat, args=[])
threadGroupChat = threading.Thread(target=ThreadGroupChat, args=[])
threadPrivateChat.deamon=True
threadGroupChat.deamon=True
threadPrivateChat.start()
threadGroupChat.start()
