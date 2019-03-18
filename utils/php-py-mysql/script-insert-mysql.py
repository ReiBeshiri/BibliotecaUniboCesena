#!/usr/bin/env python
# coding: utf-8

# In[7]:

import sys
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="",
  database="provapy"
)

mycursor = mydb.cursor()

sql = "INSERT INTO tabella (ID, data, file) VALUES (%s ,%s, %s)"
val = ("1" , "201", sys.argv[1])
mycursor.execute(sql, val)

mydb.commit()

print(mycursor.rowcount, "record inserted.")


# In[ ]:




