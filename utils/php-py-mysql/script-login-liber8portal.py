import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome() #get the Chrome tool (ChromeDriver, FirefoxDriver, SafariDriver most used)
driver.maximize_window()
driver.get('https://www.liber8portal.com')
#try to iterate through elements starting from a tag name, throws exeptions
#elements = driver.find_elements_by_tag_name('a')
#for element in elements:
#    if element.text == 'Login':
#        element.click()
time.sleep(3)
#driver.find_element_by_css_selector('div p a').click()
username = driver.find_element_by_id("Username")
password = driver.find_element_by_id("Password")
username.send_keys("Prandi.Cesena")
password.send_keys("Prandi.001")
password.send_keys(Keys.ENTER)
time.sleep(5)
driver.quit()