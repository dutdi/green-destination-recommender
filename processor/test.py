import json

import networkx as nx
import pandas as pd
import requests

airport_city_map = {'SVO': 'Moscow', 'VKO': 'Moscow', 'DME': 'Moscow', 'SAW': 'Istanbul', 'IST': 'Istanbul',
                    'LTN': 'London', 'LHR': 'London', 'LGW': 'London', 'BQH': 'London', 'LCY': 'London',
                    'STN': 'London', 'ORY': 'Paris', 'CDG': 'Paris', 'LBG': 'Paris', 'MAD': 'Madrid', 'ESB': 'Ankara',
                    'LED': 'Saint Petersburg', 'BCN': 'Barcelona', 'BER': 'Berlin', 'SXF': 'Berlin', 'ADB': 'Izmir',
                    'BUD': 'Budapest', 'YEI': 'Bursa', 'CIA': 'Rome', 'FCO': 'Rome', 'STR': 'Stuttgart',
                    'MUC': 'Munich', 'HAM': 'Hamburg', 'AYT': 'Antalya', 'GYD': 'Baku', 'BAK': 'Baku', 'KYA': 'Konya',
                    'GZT': 'Gaziantep', 'MHP': 'Minsk', 'MSQ': 'Minsk', 'SFQ': 'Sanliurfa', 'VIE': 'Vienna',
                    'WAW': 'Warsaw', 'ADA': 'Adana', 'BRU': 'Brussels', 'BMA': 'Stockholm', 'NYO': 'Stockholm',
                    'ARN': 'Stockholm', 'SOF': 'Sofia', 'AMS': 'Amsterdam', 'ASR': 'Kayseri', 'BEG': 'Belgrade',
                    'CPH': 'Copenhagen', 'MXP': 'Milan', 'LIN': 'Milan', 'SZF': 'Samsun', 'PRG': 'Prague',
                    'OPO': 'Porto', 'CEK': 'Chelyabinsk', 'DUB': 'Dublin', 'KUF': 'Samara', 'TBS': 'Tbilisi',
                    'UFA': 'Ufa', 'SVQ': 'Sevilla', 'PEE': 'Perm', 'DNZ': 'Denizli', 'VOG': 'Volgograd',
                    'NAP': 'Naples', 'RIX': 'Riga', 'AOE': 'Eskisehir', 'RTW': 'Saratov', 'SKG': 'Thessaloniki',
                    'ZAG': 'Zagreb', 'KRK': 'Krakow', 'VLC': 'Valencia', 'ERZ': 'Erzurum', 'VNO': 'Vilnius',
                    'KIV': 'Chisinau', 'ZAZ': 'Zaragoza', 'WRO': 'Wroclaw', 'DUS': 'Dusseldorf', 'SKP': 'Skopje',
                    'BRE': 'Bremen', 'DRS': 'Dresden', 'POZ': 'Poznan', 'HAJ': 'Hannover', 'ASF': 'Astrakhan',
                    'LYS': 'Lyon', 'TLS': 'Toulouse', 'GDN': 'Gdansk', 'BTS': 'Bratislava', 'KGD': 'Kaliningrad',
                    'BAL': 'Batman', 'KCM': 'Kahramanmaras', 'TLL': 'Tallinn', 'ZRH': 'Zurich', 'TZX': 'Trabzon',
                    'MLX': 'Malatya', 'EZS': 'Elazig', 'SJJ': 'Sarajevo', 'TIA': 'Tirana', 'SZZ': 'Szczecin',
                    'BLQ': 'Bologna', 'BRQ': 'Brno', 'KUN': 'Kaunas', 'VAS': 'Sivas', 'VAN': 'Van', 'MMX': 'Malmo',
                    'ARH': 'Arkhangelsk', 'VAR': 'Varna', 'BZG': 'Bydgoszcz', 'TMP': 'Tampere', 'EDO': 'Balikesir',
                    'ECN': 'Nicosia', 'DEB': 'Debrecen', 'CLJ': 'Cluj-Napoca', 'BRI': 'Bari', 'TSR': 'Timisoara',
                    'NTE': 'Nantes', 'ADF': 'Adiyaman', 'VLL': 'Valladolid', 'SXB': 'Strasbourg', 'IAS': 'Iasi',
                    'LJU': 'Ljubljana', 'CND': 'Constanta', 'MST': 'Maastricht', 'BGO': 'Bergen', 'BOD': 'Bordeaux',
                    'ISE': 'Isparta', 'TKU': 'Turku', 'KSC': 'Kosice', 'SVG': 'Stavanger', 'LIL': 'Lille',
                    'ORK': 'Cork', 'RNS': 'Rennes', 'IEG': 'Zielona Gora', 'PNA': 'Pamplona', 'GVA': 'Geneva',
                    'OMR': 'Oradea', 'RZE': 'Rzeszow', 'MSR': 'Mus', 'RJK': 'Rijeka', 'INI': 'Nis', 'CKZ': 'Canakkale',
                    'SDR': 'Santander', 'SXZ': 'Siirt', 'PEG': 'Perugia', 'PRN': 'Pristina', 'ERC': 'Erzincan',
                    'SZG': 'Salzburg', 'CAG': 'Cagliari', 'NAV': 'Nevsehir', 'TGD': 'Podgorica', 'RJL': 'Logrono',
                    'AJI': 'Agri', 'KUT': 'Kutaisi', 'SBZ': 'Sibiu', 'AAL': 'Aalborg', 'LUX': 'Luxembourg',
                    'INN': 'Innsbruck', 'BAY': 'Baia Mare', 'KSY': 'Kars', 'LPI': 'Linkoping', 'IOA': 'Ioannina',
                    'SUJ': 'Satu Mare', 'KLU': 'Klagenfurt', 'REN': 'Orenburg', 'MMK': 'Murmansk',
                    'PES': 'Petrozavodsk', 'AOI': 'Ancona', 'SCW': 'Syktyvkar', 'PKV': 'Pskov', 'PEZ': 'Penza',
                    'OGZ': 'Vladikavkaz', 'SCN': 'Saarbrucken', 'PDV': 'Plovdiv', 'BOJ': 'Burgas', 'BCM': 'Bacau',
                    'TGM': 'Targu-Mures', 'LCJ': 'Lodz', 'VST': 'Stockholm', 'ORB': 'Orebro', 'TEQ': 'Tekirdag',
                    'ERF': 'Erfurt', 'STW': 'Stavropol', 'VIT': 'Vitoria-Gasteiz', 'QND': 'Novi Sad', 'ILZ': 'Zilina',
                    'LYN': 'Lyon', 'IFO': 'Ivano-Frankivsk', 'CSO': 'Magdeburg', 'BRN': 'Bern', 'VIN': 'Vinnytsia',
                    'BGZ': 'Braga', 'DOK': 'Donetsk', 'KRR': 'Krasnodar', 'HEM': 'Helsinki', 'NAL': 'Nalchik',
                    'VOZ': 'Voronezh', 'BQT': 'Brest', 'KEL': 'Kiel', 'XFW': 'Hamburg', 'NLV': 'Mykolaiv'}

codes = ["SVO",
         "VKO",
         "DME",
         "SAW",
         "IST",
         "LTN",
         "LHR",
         "LGW",
         "BQH",
         "LCY",
         "STN",
         "ORY",
         "CDG",
         "LBG",
         "MAD",
         "ESB",
         "LED",
         "BCN",
         "BER",
         "SXF",
         "ADB",
         "BUD",
         "YEI",
         "CIA",
         "FCO",
         "STR",
         "MUC",
         "HAM",
         "AYT",
         "BAK",
         "GYD",
         "KYA",
         "GZT",
         "MHP",
         "MSQ",
         "SFQ",
         "VIE",
         "WAW",
         "ADA",
         "BRU",
         "BMA",
         "NYO",
         "ARN",
         "SOF",
         "AMS",
         "ASR",
         "BEG",
         "CPH",
         "MXP",
         "LIN",
         "SZF",
         "PRG",
         "OPO",
         "CEK",
         "DUB",
         "KUF",
         "TBS",
         "UFA",
         "SVQ",
         "PEE",
         "DNZ",
         "VOG",
         "NAP",
         "RIX",
         "AOE",
         "RTW",
         "SKG",
         "ZAG",
         "KRK",
         "VLC",
         "ERZ",
         "VNO",
         "KIV",
         "ZAZ",
         "WRO",
         "DUS",
         "SKP",
         "BRE",
         "DRS",
         "POZ",
         "HAJ",
         "ASF",
         "LYS",
         "TLS",
         "GDN",
         "BTS",
         "KGD",
         "BAL",
         "KCM",
         "TLL",
         "ZRH",
         "TZX",
         "MLX",
         "EZS",
         "SJJ",
         "TIA",
         "SZZ",
         "BLQ",
         "BRQ",
         "KUN",
         "VAS",
         "VAN",
         "MMX",
         "ARH",
         "VAR",
         "BZG",
         "TMP",
         "EDO",
         "ECN",
         "DEB",
         "CLJ",
         "BRI",
         "TSR",
         "NTE",
         "ADF",
         "VLL",
         "SXB",
         "IAS",
         "LJU",
         "CND",
         "MST",
         "BGO",
         "BOD",
         "ISE",
         "TKU",
         "KSC",
         "SVG",
         "LIL",
         "ORK",
         "RNS",
         "IEG",
         "PNA",
         "GVA",
         "OMR",
         "RZE",
         "MSR",
         "RJK",
         "INI",
         "CKZ",
         "SDR",
         "SXZ",
         "PEG",
         "PRN",
         "ERC",
         "SZG",
         "CAG",
         "NAV",
         "TGD",
         "RJL",
         "AJI",
         "KUT",
         "SBZ",
         "AAL",
         "LUX",
         "INN",
         "BAY",
         "KSY",
         "LPI",
         "IOA",
         "SUJ",
         "KLU",
         "REN",
         "MMK",
         "PES",
         "AOI",
         "SCW",
         "PKV",
         "PEZ",
         "OGZ",
         "SCN",
         "PDV",
         "BOJ",
         "BCM",
         "TGM",
         "LCJ",
         "VST",
         "ORB",
         "TEQ",
         "ERF",
         "STW",
         "VIT",
         "QND",
         "ILZ",
         "LYN",
         "IFO",
         "CSO",
         "BRN",
         "VIN",
         "BGZ",
         "DOK",
         "KRR",
         "HEM",
         "NAL",
         "VOZ",
         "BQT",
         "KEL",
         "XFW",
         "NLV"]


def map_airports():
    dict = {}
    for code in codes:
        api_url = 'https://api.api-ninjas.com/v1/airports?iata={}'.format(code)
        response = requests.get(api_url, headers={'X-Api-Key': 'BTjPy66aC6uyrsQCb8erjg==kt14PLhKfSF2zrPT'})
        if response.status_code == requests.codes.ok:
            airport_data = json.loads(response.text)
            for i in range(len(airport_data)):
                dict[airport_data[i]['iata']] = airport_data[i]['city']
        else:
            print("Error:", response.status_code, response.text)
    print(dict)


def filter_co2_values(input_file, output_file):
    with open(input_file, 'r') as file:
        data = json.load(file)

    filtered_data = []
    for entry in data:
        if 'connections_flight' in entry:
            connections = entry['connections_flight']
            filtered_connections = [
                conn for conn in connections
                if 'details' in conn and 'co2_kg' in conn['details']
                   and conn['details']['co2_kg'] not in ('', '-1')
            ]
            entry['connections_flight'] = filtered_connections
        filtered_data.append(entry)

    with open(output_file, 'w') as file:
        json.dump(filtered_data, file, indent=2)


def graphml_to_json(file_path):
    try:
        G = nx.read_graphml(file_path)
        data = nx.readwrite.json_graph.node_link_data(G)
        return json.dumps(data, indent=4)
    except Exception as e:
        return f"Error: {e}"


def delete_rows(file_path, value):
    df = pd.read_excel(file_path)
    condition = df['Source'].str.contains(value, na=False) & df['Target'].str.contains(value, na=False)

    rows_to_delete = df[condition].shape[0]
    df = df.drop(df[condition].index)

    df.to_excel(file_path, index=False)
    print(f"{rows_to_delete} rows deleted.")


def filter_cities(file_path, cities):
    df = pd.read_excel(file_path)
    pattern = '|'.join(cities)
    filtered_df = df[df['Source'].str.contains(pattern, na=False) &
                     df['Target'].str.contains(pattern, na=False)]

    return filtered_df


valid_cities = ['Berlin', 'Hamburg', 'Hannover', 'München', 'Düsseldorf', 'Erfurt', 'Dresden', 'Bremen', 'Stuttgart',
                'Kiel', 'Magdeburg', 'Saarbrücken', 'Zürich', 'Amsterdam', 'Bern', 'Wien', 'Wroclaw', 'Wroclaw', 'Brno',
                'Bratislava', 'Bologna', 'Budapest', 'Bergen', 'Salzburg', 'Zagreb', 'Gdansk', 'Innsbruck', 'Warszawa',
                'Poznan', 'Krakow', 'Ljubljana', 'Klagenfurt', 'Rzeszow', 'Bydgoszcz', 'Zielona Góra']

# filtered_data = filter_cities('db_routes_with_co2.xlsx', valid_cities)
# filtered_data.to_excel('filtered_cities.xlsx', index=False)

delete_rows('filtered_cities.xlsx', 'Krakow')
