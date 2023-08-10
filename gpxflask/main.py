from flask import Flask, render_template, request
from flask_cors import CORS 
import gpxParser

app = Flask(__name__)
CORS(app, resources=r'/*')

@app.route('/upload', methods = ['GET', 'POST'])
def upload_file():
   print(request.files)
   # print(request.AppHeaders)
   if request.method == 'POST':
      f = request.files['file']
      f.save("current.gpx")
      return 'file uploaded successfully'
   
@app.route('/startPoint', methods = ['GET'])
def start_point():
   return gpxParser.getStart("current.gpx")

@app.route('/points')
def getPoints():
   return gpxParser.getPoints("current.gpx")


@app.route('/elevation')
def getElevation():
   return gpxParser.getElevation("current.gpx")
		
if __name__ == '__main__':
   app.run(debug = True)