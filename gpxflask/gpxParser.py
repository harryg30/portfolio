import gpxpy
import gpxpy.gpx
import datetime


def parse(file):
    gpx_file = open(file, 'r')
    gpx = gpxpy.parse(gpx_file)
    print("parseing")
    return gpx.to_xml()


def getStart(file):
    gpx_file = open(file, 'r')
    gpx = gpxpy.parse(gpx_file)
    point = gpx.tracks[0].segments[0].points[0]

    print(f'Point at ({point.latitude},{point.longitude}) -> {point.elevation}')
    return ([point.latitude,point.longitude])


def getPoints(file):
    gpx_file = open(file, 'r')
    gpx = gpxpy.parse(gpx_file)
    gpxPoints = gpx.tracks[0].segments[0].points
    points = []
    for point in range(0, len(gpxPoints)):
        points.append({"id": point, "lat": gpxPoints[point].latitude, "lon": gpxPoints[point].longitude})

    return points

def getElevation(file):
    gpx_file = open(file, 'r')
    gpx = gpxpy.parse(gpx_file)
    points = []
    for point in gpx.tracks[0].segments[0].points:
        points.append({"group": "Dataset0", "date": str(point.time), "elevation": point.elevation})
    return points   

print(getElevation("current.gpx"))
    # for track in gpx.tracks:
    #     for segment in track.segments:
    #         for point in segment.points:
    #             print(f'Point at ({point.latitude},{point.longitude}) -> {point.elevation}')

    # for waypoint in gpx.waypoints:
    #     print(f'waypoint {waypoint.name} -> ({waypoint.latitude},{waypoint.longitude})')

    # for route in gpx.routes:
    #     print('Route:')
    #     for point in route.points:
    #         print(f'Point at ({point.latitude},{point.longitude}) -> {point.elevtion}')

    # There are many more utility methods and functions:
    # You can manipulate/add/remove tracks, segments, points, waypoints and routes and
    # get the GPX XML file from the resulting object:

    #print('GPX:', gpx.to_xml())