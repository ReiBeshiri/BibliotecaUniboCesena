import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
import requests
from bs4 import BeautifulSoup

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
#driver.find_element_by_link_text('Statist.').click()
#time.sleep(1)
#driver.find_element_by_link_text('Passaggio persone').click()
#time.sleep(1)
#driver.get('https://www.mysmartadmin.com/Secure/Reports/Reports.aspx?reporttype=peoplefootfall')
driver.find_element_by_id('ctxBtnUniversità-di-Bologna-null').click()
time.sleep(2)
driver.find_element_by_link_text('Passaggio persone').click()
time.sleep(20)
#driver.find_element_by_xpath("//select[1]")
#driver.find_element_by_link_text('Varchi Unibo').click()
#time.sleep(2)

#####set_cookie#####
#cj = cookielib.CookieJar()
#br = mechanize.Browser()
#br.set_cookiejar(cj)

#####BS4#####
r = requests.get(driver.current_url)
soup = BeautifulSoup(r.content, "html.parser")
str = soup.body.get_text()
file = open('ProvaWrite.txt', 'w')
file.write(str)
file.close()