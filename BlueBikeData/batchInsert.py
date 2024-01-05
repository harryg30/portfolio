import json
import requests

f = open("portfolio-next/assets/data/dec22rides.json")

data = json.load(f)

batchSize = 500

for i in range(0, len(data), batchSize):
    batch = data[i:i+batchSize]
    r = requests.post("http://localhost:3000/api/ride", json=batch)
    print(r.json)
    
