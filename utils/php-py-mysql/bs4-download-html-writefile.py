#!/usr/bin/env python
# coding: utf-8

# In[6]:


import requests
from bs4 import BeautifulSoup

r = requests.get("https://it.wikipedia.org/wiki/Artaferne_(figlio)")
soup = BeautifulSoup(r.content, "html.parser")

str = soup.body.get_text()
str = str.split("generale", 1)
str = str[1]
str = str.split("Artaferne", 1)
str = str[0]
str = str.split(",", 1)
str = str[1]
str = str.split(".", 1)
str = str[0]
str = "generale" + str + "."
print(str)
file = open('ProvaWrite.txt', 'w')
file.write(str)
file.close()
file = open('ProvaWrite.txt', 'a')
file.write("append")
file.close()


# In[ ]:





# In[ ]:




