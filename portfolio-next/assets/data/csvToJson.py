import csv
import json

def csv_to_json(csv_file, json_file):
    # Open CSV file
    with open(csv_file, 'r') as csv_file:
        # Create CSV reader
        csv_reader = csv.DictReader(csv_file)

        # Create a list to store dictionaries
        data_list = []

        # Iterate through each row in the CSV file
        for row in csv_reader:
            # Create a dictionary for each row with the desired format 
            #"ride_id","rideable_type","started_at","ended_at","start_station_name","start_station_id",
            # "end_station_name","end_station_id","start_lat","start_lng","end_lat","end_lng","member_casual"
            data_dict = {
                "startTime": row["started_at"],
                "endedTime": row["ended_at"],
                "start_station_id": row["start_station_id"],
                "start_station_name": row["start_station_name"],
                "start_station_latitude": row["start_lat"],
                "start_station_longitude": row["start_lng"],
                "end_station_id": row["end_station_id"],
                "end_station_name": row["end_station_name"],
                "end_station_latitude": row["end_lat"],
                "end_station_longitude": row["end_lng"],
                "usertype": row["member_casual"],
            }

            # Append the dictionary to the list
            data_list.append(data_dict)

    # Write the list of dictionaries to a JSON file
    with open(json_file, 'w') as json_file:
        json.dump(data_list, json_file, indent=4)

# Example usage
# csv_to_json('assets/data/202302-bluebikes-tripdata.csv', 'assets/data/02_23_rides.json')
# csv_to_json('assets/data/202303-bluebikes-tripdata.csv', 'assets/data/03_23_rides.json')
csv_to_json('assets/data/202304-bluebikes-tripdata.csv', 'assets/data/04_23_rides.json')
csv_to_json('assets/data/202305-bluebikes-tripdata.csv', 'assets/data/05_23_rides.json')
csv_to_json('assets/data/202306-bluebikes-tripdata.csv', 'assets/data/06_23_rides.json')
csv_to_json('assets/data/202307-bluebikes-tripdata.csv', 'assets/data/07_23_rides.json')
