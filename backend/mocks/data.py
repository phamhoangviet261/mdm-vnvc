import json
from pymongo import MongoClient 
  
  
# Making Connection
myclient = MongoClient("mongodb+srv://IEwDYeP7dz:mdm-p7Thrs2awb@mongodbcluster.akchj.mongodb.net/MDM-VNVC?retryWrites=true&w=majority") 
   
# database 
db = myclient["MDM-VNVC"]
   
# Created or Switched to collection 
Collection = db["centers"]
  
# Loading or Opening the json file
with open('Center.json', encoding="utf8") as file:
    file_data = json.load(file)
      
# Inserting the loaded data in the Collection
# if JSON contains data more than one entry
# insert_many is used else inser_one is used
if isinstance(file_data, list):
    Collection.insert_many(file_data)  
else:
    Collection.insert_one(file_data)