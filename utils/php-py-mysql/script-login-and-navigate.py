import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome()
driver.maximize_window()
driver.get('https://idp.unibo.it/adfs/ls/?SAMLRequest=fZFLb4MwEIT%2FCvI92JAHiRWQaHJopLRFhfbQS2VgUywZm3pNH%2F%2B%2BJLRqKlU578y3s7NrFK3qeNq7Rt%2FDaw%2FovI9WaeSnQUx6q7kRKJFr0QJyV%2FE8vdnz0Ge8s8aZyijipYhgnTR6YzT2Ldgc7Jus4OF%2BH5PGuQ45pdIov9eyNL50NG9kWRoFrvERDT0yQ5rd5QXxtkMIqcURd2auu1%2BzqA9IFVLi7bYxeQ7YQSwXh2AmAGbLeRVVjC0jqBaMwbyOokGG2MNOoxPaxSRkwWrCppOQFcGMT0POVk%2FEy76vuZK6lvrl8unlKEJ%2BXRTZZMz9CBZPmQcBSdbHAvlpsT2r9DJW%2FPRIkv9aW9Mz6Lih47cDZbfNjJLVp5cqZd43FoSDmASEJqPl74eTLw%3D%3D&RelayState=https%3A%2F%2Fiol.unibo.it%2Fauth%2Fshibboleth%2Findex.php&SigAlg=http%3A%2F%2Fwww.w3.org%2F2000%2F09%2Fxmldsig%23rsa-sha1&Signature=2UJlpxvQpucvonPTUJWyHV6CcBa%2FJCSYBTmtXOfipNQCOUcQt%2B1Yzo%2FHDHz38tBPfhZRKx0z5kznjbeLLfKxHp15%2BQX%2BAnFos1RNJBz1oZOUw98KD15dAS2G28Xz%2FdQaF4AqoWsgIn2X%2BbihONlJ6HYfoG65Jw0lef2ctYrDBDIAL3U2UmfdSoQ%2BgOVqAS%2FEJA5ja6uCfYZH%2Bz6zHXXhycb8GaEUWm%2ByXmLI%2FndRRWjGs4L7lx4tMNLTvvlwmdRFU683ngir9xPxLdo%2BFGBa7JkTNR2WwWF2hqhSKqFfHC%2FoWtPex%2B6V7pbveIgmUpw9r7QlJZdMjxHS4uZntiKPHg%3D%3D')
#time.sleep(3)
#elements = driver.find_elements_by_tag_name('a')
#for element in elements:
#    if element.text == 'Login':
#        element.click()
time.sleep(5)
username = driver.find_element_by_id("userNameInput")
password = driver.find_element_by_id("passwordInput")
username.send_keys("usr")
password.send_keys("psw")
password.send_keys(Keys.ENTER)
time.sleep(5)
#driver.find_element_by_id("yui_3_17_2_1_1553093750465_17").click()
driver.find_element_by_css_selector('nav div button').click()
time.sleep(3)
driver.get('https://iol.unibo.it/course/view.php?id=25127')
time.sleep(5)
driver.quit()