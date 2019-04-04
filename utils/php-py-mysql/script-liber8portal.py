import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import shutil
import os
import pandas as pd
import numpy as np
import datetime
import mysql.connector


#ottengo l'ora la data e il giorno
now = datetime.datetime.now()
hour = now.hour - 8 #alle 8:00 faccio - 8 così va a 0 che sono le 7:00 nel dataframe
day = datetime.datetime.today().weekday()
if(day == 0):
    day = "lun"
elif(day == 1):
    day = "mar"
elif(day == 2):
    day = "mer"
elif(day == 3):
    day = "gio"
elif(day == 4):
    day = "ven"
date = str(now.year) + '-' + str(now.month).zfill(2) + '-' + str(now.day).zfill(2)
#######################

driver = webdriver.Chrome() #get the Chrome tool (ChromeDriver, FirefoxDriver, SafariDriver most used)
driver.maximize_window()
driver.get('https://www.liber8portal.com')
time.sleep(3)
#driver.find_element_by_css_selector('div p a').click()
username = driver.find_element_by_id("Username")
password = driver.find_element_by_id("Password")
username.send_keys("Prandi.Cesena")
password.send_keys("Prandi.001")
password.send_keys(Keys.ENTER)
time.sleep(3)
driver.get('https://www.mysmartadmin.com/Secure/Default.aspx')
driver.get('https://www.mysmartadmin.com/Secure/Default.aspx')
time.sleep(2)
driver.find_element_by_id('ctxBtnUniversità-di-Bologna-null').click()
time.sleep(2)
driver.find_element_by_link_text('Passaggio persone').click()
time.sleep(10)

wait = WebDriverWait(driver, 10)
frame = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "iframe")))

driver.switch_to.frame(frame)

driver.find_element_by_partial_link_text("mar").click() ###il giorno della settimana da scaricare ################dopo sarà la var day

time.sleep(5)

driver.find_element_by_id('ctl00_MainContent_rvDeviceStats_ctl09_ctl04_ctl00_ButtonLink').click()
driver.find_element_by_link_text('Excel').click()
time.sleep(5)

shutil.move(r'C:\Users\Rey\Downloads\PeopleFootfall.xlsx', r'C:\Users\Rey\Desktop\tirocinio\tirocinio\utils\php-py-mysql\data.xlsx')
#os.remove("C:\Users\Rey\Desktop\tirocinio\tirocinio\utils\php-py-mysql/data.xml")
data = pd.read_excel('data.xlsx')

#filtering useless data
data = data.replace(to_replace='None', value=np.nan).replace(to_replace='0.00', value=np.nan).replace(to_replace='1.00', value=np.nan).replace(to_replace='2.00', value=np.nan).replace(to_replace='3.00', value=np.nan).replace(to_replace='4.00', value=np.nan).replace(to_replace='5.00', value=np.nan).replace(to_replace='6.00', value=np.nan).replace(to_replace='19.00', value=np.nan).replace(to_replace='20.00', value=np.nan).replace(to_replace='21.00', value=np.nan).replace(to_replace='22.00', value=np.nan).replace(to_replace='23.00', value=np.nan).dropna()

# data.iat[0] -> data.iat[0+7] -> quindi alle 7:00
"""
print(data.iloc[0]) -> 7:00
print(data.iloc[1]) -> 8:00
print(data.iloc[2]) -> 9:00
print(data.iloc[3]) -> 10:00
print(data.iloc[4]) -> 11:00
print(data.iloc[5]) -> 12:00
print(data.iloc[6]) -> 13:00
print(data.iloc[7]) -> 14:00
print(data.iloc[8]) -> 15:00
print(data.iloc[9]) -> 16:00
print(data.iloc[10]) -> 17:00
print(data.iloc[11]) -> 18:00
"""
hour = 0 ###################################da togliere dopo
row = data.iloc[hour]
#print(row.iloc[2])#persone in
#print(row.iloc[3])#persone out

totale_in = data['Persone in'].sum()
totale_out = data['Persone fuori'].sum()

if(hour == 0):
    persone_in = row.iloc[2]
    persone_out = 0 #perchè suppongo che l'aggiornamento sia ad ogni ora quindi non ha senso che quando apre la biblio cè qualcuno che esce
elif(hour == 11):
    persone_in = row.iloc[2]
    err = data.iloc[0]
    persone_out = totale_in - totale_out + err.iloc[3] + row.iloc[3]
else:
    persone_in = row.iloc[2]
    persone_out = row.iloc[3]


#Insert record in database
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="biblioteca"
)
hour+=7 #riporto l'ora esatta 0 -> 0+7 = 7
hour = str(hour) + ':00'
date = '2019-04-02'###############da togliere dopo
####my sql insert in db
mycursor = mydb.cursor()
sql = "INSERT INTO library (ora, giorno, data, entrate, uscite) VALUES (%s ,%s, %s, %s, %s)"
val = (str(hour), str(day), str(date), str(persone_in), str(persone_out))
mycursor.execute(sql, val)
mydb.commit()
print(mycursor.rowcount, "record inserted.")
driver.quit()