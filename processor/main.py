import csv
import json
import os
import random
from math import radians, sin, cos, sqrt, atan2

import pandas as pd


def rename_photos(photo_folder, destinations):
    for destination in destinations:
        id = destination['id']
        name = destination['name']
        country = destination['country'].strip()

        old_file_name = f"{name}, {country}.jpg"
        new_file_name = f"{id}.jpg"

        old_file_path = os.path.join(photo_folder, old_file_name)
        new_file_path = os.path.join(photo_folder, new_file_name)

        if os.path.exists(old_file_path):
            os.rename(old_file_path, new_file_path)
            print(f"Renamed '{old_file_name}' to '{new_file_name}'")
        else:
            print(f"File '{old_file_name}' not found.")


def csv_to_json(prefix, csv_file):
    destinations = []
    with open(csv_file, 'r') as file:
        csv_reader = csv.DictReader(file)
        idx = 0
        for row in csv_reader:
            city = row['city']
            country = row['country']
            destinations.append({
                'id': f'{prefix}{idx}',
                'name': city,
                'country': country,
                'flag': get_country_flag(country),
                'latitude': float(row['lat']),
                'longitude': float(row['lng']),
            })
            idx += 1

    return destinations


def get_country_flag(country):
    europe_flags = {
        "Poland": "🇵🇱",
        "Macedonia": "🇲🇰",
        "Romania": "🇷🇴",
        "Azerbaijan": "🇦🇿",
        "Turkey": "🇹🇷",
        "France": "🇫🇷",
        "Germany": "🇩🇪",
        "Spain": "🇪🇸",
        "Italy": "🇮🇹",
        "United Kingdom": "🇬🇧",
        "Greece": "🇬🇷",
        "Netherlands": "🇳🇱",
        "Portugal": "🇵🇹",
        "Belgium": "🇧🇪",
        "Czechia": "🇨🇿",
        "Sweden": "🇸🇪",
        "Hungary": "🇭🇺",
        "Austria": "🇦🇹",
        "Switzerland": "🇨🇭",
        "Denmark": "🇩🇰",
        "Finland": "🇫🇮",
        "Slovakia": "🇸🇰",
        "Norway": "🇳🇴",
        "Ireland": "🇮🇪",
        "Croatia": "🇭🇷",
        "Lithuania": "🇱🇹",
        "Bosnia and Herzegovina": "🇧🇦",
        "Estonia": "🇪🇪",
        "Latvia": "🇱🇻",
        "Slovenia": "🇸🇮",
        "Montenegro": "🇲🇪",
        "North Macedonia": "🇲🇰",
        "Luxembourg": "🇱🇺",
        "Serbia": "🇷🇸",
        "Iceland": "🇮🇸",
        "Albania": "🇦🇱",
        "Moldova": "🇲🇩",
        "Kosovo": "🇽🇰",
        "Belarus": "🇧🇾",
        "Ukraine": "🇺🇦",
        "Georgia": "🇬🇪",
        "Cyprus": "",
        "Bulgaria": "🇧🇬",
        "Russia": "🇷🇺",
    }

    if country in europe_flags:
        return europe_flags[country]
    else:
        print(f"Emoji for {country} not available.")
        return ""


def add_popularity_data(destinations):
    with open('popularity_data.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        popularity_data = list(reader)

    popularity_lookup = {}
    for data in popularity_data:
        key = (data['city'])
        popularity_lookup[key] = {
            'popularity_score': round(float(data['weighted_pop_score']), 2),
        }

    for destination in destinations:
        key = destination['name']
        if key in popularity_lookup:
            popularity_info = popularity_lookup[key]
            destination['popularity'] = popularity_info
        else:
            destination['popularity'] = {
                'popularity_score': 100,
            }

    return destinations


def add_seasonality_data(cities_data):
    with open('seasonality_data.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        seasonality_data = list(reader)
    seasonality_lookup = {}
    for data in seasonality_data:
        key = (data['city'])
        seasonality_lookup[key] = {
            'January': float(data['January']),
            'February': float(data['February']),
            'March': float(data['March']),
            'April': float(data['April']),
            'May': float(data['May']),
            'June': float(data['June']),
            'July': float(data['July']),
            'August': float(data['August']),
            'September': float(data['September']),
            'October': float(data['October']),
            'November': float(data['November']),
            'December': float(data['December']),
        }

    for destination in cities_data:
        key = destination['name']
        if key in seasonality_lookup:
            seasonality_info = seasonality_lookup[key]
            destination['seasonality'] = {
                'January': seasonality_info['January'],
                'February': seasonality_info['February'],
                'March': seasonality_info['March'],
                'April': seasonality_info['April'],
                'May': seasonality_info['May'],
                'June': seasonality_info['June'],
                'July': seasonality_info['July'],
                'August': seasonality_info['August'],
                'September': seasonality_info['September'],
                'October': seasonality_info['October'],
                'November': seasonality_info['November'],
                'December': seasonality_info['December'],
            }
        else:
            destination['seasonality'] = {
                'January': 100,
                'February': 100,
                'March': 100,
                'April': 100,
                'May': 100,
                'June': 100,
                'July': 100,
                'August': 100,
                'September': 100,
                'October': 100,
                'November': 100,
                'December': 100,
            }

    return cities_data


def add_connections_driving_data(destinations):
    connections_data = pd.read_csv('driving_google_emissions.csv')
    destination_map = {(dest['name']): dest['id'] for dest in destinations}

    for dest in destinations:
        dest['connections_driving'] = []
        name = dest['name']
        connections = connections_data[(connections_data['city_1'] == name)]

        for _, connection in connections.iterrows():
            to_name = connection['city_2']
            to_id = destination_map.get(to_name, None)

            if to_id:
                dest['connections_driving'].append({
                    "from_id": dest["id"],
                    "to_id": to_id,
                    "type": 'driving',
                    "distance_km": int(connection['dist_km_google']),
                    "duration_sec": int(connection['duration_sec_google']),
                    "co2_kg": int(connection['co2_kg_fuel']),
                    "cost": int(connection['dist_km_google'] * 0.11),
                })

    return destinations


def add_connections_train_data(destinations):
    real_train_connections_json = open('real_train_connections.json')
    real_train_connections = json.load(real_train_connections_json)
    estimated_cities_train = estimate_train_connections(destinations)
    for dest in estimated_cities_train:
        dest['connections_train'] = []
        estimated_ids_train = dest["estimated_ids_train"]
        for id in estimated_ids_train:
            other_city = next((x for x in destinations if x["id"] == id), None)
            dist = calculate_distance(dest["latitude"], dest["longitude"], other_city["latitude"],
                                      other_city["longitude"])
            if dest["id"] != id and dist <= 1000:
                real_connection = next(
                    (x for x in real_train_connections if x["from_id"] == dest["id"] and x["to_id"] == id), None)
                if real_connection:
                    dest['connections_train'].append({
                        "from_id": dest["id"],
                        "to_id": id,
                        "type": "train",
                        "distance_km": real_connection["distance_km"],
                        "duration_sec": real_connection["duration_sec"],
                        "co2_kg": real_connection["co2_kg"],
                        "cost": int(real_connection["distance_km"] * 0.14),
                    })
                else:
                    dest['connections_train'].append({
                        "from_id": dest["id"],
                        "to_id": id,
                        "type": "train",
                        "distance_km": int(dist),
                        "duration_sec": int(dist * 26),
                        "co2_kg": int(dist * 24 / 1000),
                        "cost": int(dist * 0.14),
                    })

        del dest["estimated_ids_train"]
        real_train_connections_json.close()
    return destinations


def estimate_train_connections(cities):
    major_cities_per_country = {
        "Turkey": ["Ankara", "Istanbul"],
        "Luxembourg": ["Luxembourg"],
        "Spain": ["Madrid", "Barcelona"],
        "Netherlands": ["Amsterdam"],
        "Germany": ["Berlin", "Munich"],
        "Switzerland": ["Zurich", "Geneva"],
        "Czechia": ["Prague"],
        "Romania": ["Bucharest"],
        "Portugal": ["Lisbon", "Porto"],
        "France": ["Paris", "Lyon", "Marseille"],
        "Lithuania": ["Vilnius"],
        "Ireland": ["Dublin"],
        "Slovakia": ["Bratislava"],
        "Italy": ["Rome", "Milan"],
        "Iceland": ["Reykjavik"],
        "Slovenia": ["Ljubljana"],
        "Bosnia and Herzegovina": ["Sarajevo"],
        "Finland": ["Helsinki"],
        "Austria": ["Vienna"],
        "Poland": ["Warsaw"],
        "Norway": ["Oslo"],
        "Croatia": ["Zagreb"],
        "United Kingdom": ["London"],
        "Belarus": ["Minsk"],
        "Belgium": ["Brussels"],
        "Greece": ["Athens"],
        "Serbia": ["Belgrade"],
        "Denmark": ["Copenhagen"],
        "Bulgaria": ["Sofia"],
        "Hungary": ["Budapest"],
        "Ukraine": ["Kyiv"],
        "Latvia": ["Riga"],
        "Russia": ["Moscow", "Saint Petersburg"],
        "Sweden": ["Stockholm"],
        "Moldova": ["Chisinau"],
        "Estonia": ["Tallinn"],
        "Cyprus": ["Nicosia"],
        "Montenegro": ["Podgorica"],
        "Kosovo": ["Pristina"],
        "Georgia": ["Tbilisi"],
        "Macedonia": ["Skopje"],
        "Albania": ["Tirana"],
        "Azerbaijan": ["Baku"]
    }

    def find_connections(city, cities):
        connections = []
        for other_city in cities:
            if city["id"] != other_city["id"]:
                if city["country"] == other_city["country"]:
                    if city["name"] in major_cities_per_country[city["country"]] or \
                            other_city["name"] in major_cities_per_country[other_city["country"]]:
                        connections.append(other_city["id"])
                elif city["name"] in major_cities_per_country[city["country"]] and \
                        other_city["name"] in major_cities_per_country[other_city["country"]]:
                    connections.append(other_city["id"])
        return connections

    for city in cities:
        city["estimated_ids_train"] = find_connections(city, cities)

    return cities


def add_connections_flight_data(destinations):
    connections = []

    with open('flight_emissions.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            connection = {'from_id': next((item['id'] for item in destinations if item['name'] == row["city_1"]), None),
                          'to_id': next((item['id'] for item in destinations if item['name'] == row["city_2"]), None),
                          "type": 'flight',
                          "source_airport": row['source'],
                          "destination_airport": row['destination'],
                          "airline": row['Airline'],
                          "no_of_stops": row['no_of_stops'],
                          "duration_str": row['Duration_str'],
                          "co2_kg": int(float(row['co2_kg'])),
                          "co2_kg_pax": int(float(row["CO2_kg_pax"])),
                          "departure_time": row['Departure_Time'],
                          "arrival_time": row['Arrival_Time'],
                          "stops_info": row['Stops_info'],
                          "cost": calculate_flight_cost(row['Airline'], row['src_country'], row['dest_country'],
                                                        float(row['src_lat']), float(row['src_lng']),
                                                        float(row['dest_lat']),
                                                        float(row['dest_lng']))
                          }

            connections.append(connection)

    for destination in destinations:
        destination['connections_flight'] = [
            connection for connection in connections if connection['from_id'] == destination['id']
        ]

    return destinations


def add_description_data(cities_data):
    with open('descriptions.json', 'r') as descriptions_file:
        descriptions_data = json.load(descriptions_file)

    for city in cities_data:
        city_id = city['id']

        for description in descriptions_data:
            if description['id'] == city_id:
                city['description'] = description['description']
                break

    return cities_data


def add_interest_data(cities_data):
    for city in cities_data:
        city['interests'] = generate_interests()
    return cities_data


def generate_interests():
    interests = [
        'Cultural',
        'Culinary',
        'Historical',
        'Entertainment',
        'Religious',
        'Adventure',
        'Technology',
        'Educational',
        'Business',
        'Sports',
    ]
    random.shuffle(interests)
    num_interests = random.randint(4, 7)

    return interests[:num_interests]


def calculate_distance(lat1, lon1, lat2, lon2):
    radius_earth = 6371.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return int(radius_earth * c)


def calculate_flight_cost(airline, src_country, dest_country, source_latitude, source_longitude, destination_latitude,
                          destination_longitude):
    costs = {}
    with open("flight_costs.csv", mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            airline = row['Airline']
            costs[airline] = {
                'intl_cost_per_km_euros': float(row['intl_cost_per_km_euros']),
                'domestic_cost_per_km_euros': float(row['domestic_cost_per_km_euros'])
            }

    if airline not in costs:
        print(f"Airline '{airline}' not found.")
        return None

    distance = calculate_distance(source_latitude, source_longitude, destination_latitude, destination_longitude)
    is_domestic = src_country == dest_country
    cost_per_km = costs[airline]['domestic_cost_per_km_euros'] if is_domestic else costs[airline][
        'intl_cost_per_km_euros']

    return distance * cost_per_km


allCities = csv_to_json('m', 'all_cities.csv')
popularity_added = add_popularity_data(allCities)
train_added = add_connections_train_data(popularity_added)
driving_added = add_connections_driving_data(train_added)
flight_added = add_connections_flight_data(driving_added)
descriptions_added = add_description_data(flight_added)
seasonality_added = add_seasonality_data(descriptions_added)
interests_added = add_interest_data(seasonality_added)

with open("data.json", "w") as f:
    json.dump(interests_added, f)
