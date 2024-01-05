import json
import requests


for d in ['01', '03', '04','05', '06', '07']:
    print(d)
    f = open("assets/data/"+d+"_23_rides.json")

    data = json.load(f)

    batchSize = 500

    for i in range(0, len(data), batchSize):
        print(i)
        batch = data[i:i+batchSize]
        r = requests.post("http://localhost:3001/api/ride", json=batch)
        print(r.json)
        
