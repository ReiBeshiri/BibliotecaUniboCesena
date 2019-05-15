# -*- coding: utf-8 -*-
import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from pyvirtualdisplay import Display
import shutil
import os
import pandas as pd
import numpy as np
import datetime
import mysql.connector

#Processo di ETL dei dati

#from pyvirtualdisplay import Display
#display = Display(visible=0, size=(800, 600))
#display.start()
#display.stop()

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
#Estract dei dati
#navigo nel sito di liber8portal fino ad ottenere i dati C:\Users\Rey\AppData\Local\Google\Chrome SxS\Application\Chrome.exe
#chrome_options = Options()
#chrome_options.headless = True
#chrome_options.add_argument('--ignore-certificate-errors')
#chrome_options.add_argument('--window-size=1920x1080');
#chrome_options.binary_location = "C:\\Users\\Rey\\AppData\\Local\\Google\\Chrome SxS\\Application\\Chrome.exe"
display = Display(visible=0, size=(1600, 900))
display.start()
driver = webdriver.Chrome(executable_path='./chromedriver') #get the Chrome tool (ChromeDriver, FirefoxDriver, SafariDriver most used) options=chrome_options
driver.get('https://www.google.com/search?q=unibo&oq=unibo&aqs=chrome..69i57j0l3j69i60l2.613j0j7&sourceid=chrome&ie=UTF-8')
wait = WebDriverWait(driver, 10)
wait.until(EC.element_to_be_clickable((By.LINK_TEXT,"Unibo - Bologna"))).click()
driver.quit()
display.stop()
