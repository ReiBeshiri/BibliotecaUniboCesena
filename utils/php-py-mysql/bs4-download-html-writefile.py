#!/usr/bin/env python
# coding: utf-8

# In[6]:


import requests
from bs4 import BeautifulSoup

r = requests.get("https://www.liber8portal.com")
soup = BeautifulSoup(r.content, "html.parser")

str = soup.body.get_text()
print(str)
file = open('ProvaWrite.txt', 'w')
file.write(str)
file.close()
file = open('ProvaWrite.txt', 'a')
file.write("append")
file.close()


# In[ ]:





# In[ ]:




