import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import TsunamiIcon from '@mui/icons-material/Tsunami';
import CloudIcon from '@mui/icons-material/Cloud';

import LocationCityIcon from '@mui/icons-material/LocationCity';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import LandscapeIcon from '@mui/icons-material/Landscape';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ForestIcon from '@mui/icons-material/Forest';
import WavesIcon from '@mui/icons-material/Waves';

import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import TrainIcon from '@mui/icons-material/Train';
import TramIcon from '@mui/icons-material/Tram';
import SubwayIcon from '@mui/icons-material/Subway';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

import VillaIcon from '@mui/icons-material/Villa';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GrassIcon from '@mui/icons-material/Grass';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';

import HiveIcon from '@mui/icons-material/Hive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CarRentalIcon from '@mui/icons-material/CarRental';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import WifiIcon from '@mui/icons-material/Wifi';

import { Colors } from '../helpers/Colors.js';

export const WeatherPattern = {
    Arctic: {
        icon: <AcUnitIcon sx={{ color: Colors.lightBlue }} />,
        text: 'Arctic',
    },
    Tropical: {
        icon: <WbSunnyIcon sx={{ color: Colors.sunnyYellow }} />,
        text: 'Tropical',
    },
    Continental: {
        icon: <ThermostatIcon sx={{ color: Colors.brown }} />,
        text: 'Continental',
    },
    Oceanic: {
        icon: <TsunamiIcon sx={{ color: Colors.darkBlue }} />,
        text: 'Oceanic',
    },
    Temperate: {
        icon: <CloudIcon sx={{ color: Colors.mutedBlue }} />,
        text: 'Temperate',
    },
};

export const Biodiversity = {
    LOW: {
        color: Colors.red,
        text: 'LOW',
    },
    MEDIUM: {
        color: Colors.yellow,
        text: 'MEDIUM',
    },
    HIGH: {
        color: Colors.lightGreen,
        text: 'HIGH',
    },
};

export const Geography = {
    Urban: {
        icon: <LocationCityIcon sx={{ color: Colors.red }} />,
        text: 'Urban',
    },
    Beach: {
        icon: <BeachAccessIcon sx={{ color: Colors.yellow }} />,
        text: 'Beach',
    },
    Mountainous: {
        icon: <LandscapeIcon sx={{ color: Colors.green }} />,
        text: 'Mountainous',
    },
    Farmland: {
        icon: <AgricultureIcon sx={{ color: Colors.green }} />,
        text: 'Farmland',
    },
    Forest: {
        icon: <ForestIcon sx={{ color: Colors.green }} />,
        text: 'Forest',
    },
    Desert: {
        icon: <WavesIcon sx={{ color: Colors.yellow }} />,
        text: 'Desert',
    },
};

export const Transport = {
    Airplane: {
        icon: <AirplanemodeActiveIcon sx={{ color: Colors.black }} />,
        text: 'Airplane',
    },
    Train: {
        icon: <TrainIcon sx={{ color: Colors.red }} />,
        text: 'Train',
    },
    Tram: {
        icon: <TramIcon sx={{ color: Colors.brown }} />,
        text: 'Tram',
    },
    Underground: {
        icon: <SubwayIcon sx={{ color: Colors.blue }} />,
        text: 'Underground',
    },
    Bus: {
        icon: <DirectionsBusIcon sx={{ color: Colors.green }} />,
        text: 'Bus',
    },
    Taxi: {
        icon: <LocalTaxiIcon sx={{ color: Colors.yellow }} />,
        text: 'Taxi',
    },
    Ferry: {
        icon: <DirectionsBoatIcon sx={{ color: Colors.mutedBlue }} />,
        text: 'Ferry',
    },
};

export const Accommodation = {
    Villas: {
        icon: <VillaIcon sx={{ color: Colors.sunnyYellow }} />,
        text: 'Villas',
    },
    Hotels: {
        icon: <BedroomParentIcon sx={{ color: Colors.blue }} />,
        text: 'Hotels',
    },
    Apartments: {
        icon: <ApartmentIcon sx={{ color: Colors.red }} />,
        text: 'Apartments',
    },
    Campsites: {
        icon: <GrassIcon sx={{ color: Colors.green }} />,
        text: 'Campsites',
    },
    Rooms: {
        icon: <BedroomChildIcon sx={{ color: Colors.brown }} />,
        text: 'Rooms',
    },
};

export const Amenities = {
    Honeymoon: {
        icon: <HiveIcon sx={{ color: Colors.yellow }} />,
        text: 'Honeymoon',
    },
    Shopping: {
        icon: <ShoppingCartIcon sx={{ color: Colors.green }} />,
        text: 'Shopping',
    },
    CarRentals: {
        icon: <CarRentalIcon sx={{ color: Colors.mutedBlue }} />,
        text: 'Car rentals',
    },
    Clubs: {
        icon: <NightlifeIcon sx={{ color: Colors.red }} />,
        text: 'Clubs',
    },
    TheaterMuseums: {
        icon: <TheaterComedyIcon sx={{ color: Colors.brown }} />,
        text: 'Theater, Museums',
    },
    Internet: {
        icon: <WifiIcon sx={{ color: Colors.blue }} />,
        text: 'Internet',
    },
};

export const AirportCityPairs = {
    GYD: 'Baku',
    KYA: 'Konya',
    GZT: 'Gaziantep',
    MHP: 'Minsk',
    MSQ: 'Minsk',
    SFQ: 'Sanliurfa',
    VIE: 'Vienna',
    WAW: 'Warsaw',
    ADA: 'Adana',
    BRU: 'Brussels',
    DIY: 'Diyarbakir',
    BMA: 'Stockholm',
    NYO: 'Stockholm',
    ARN: 'Stockholm',
    SOF: 'Sofia',
    AMS: 'Amsterdam',
    HRK: 'Kharkiv',
    ASR: 'Kayseri',
    BEG: 'Belgrade',
    CPH: 'Copenhagen',
    RKE: 'Stockholm',
    MXP: 'Milan',
    LIN: 'Milan',
    SZF: 'Samsun',
    PRG: 'Prague',
    OPO: 'Porto',
    HEM: 'Helsinki',
    KZN: 'Kazan',
    CEK: 'Chelyabinsk',
    DUB: 'Dublin',
    KUF: 'Samara',
    TBS: 'Tbilisi',
    UFA: 'Ufa',
    SVQ: 'Sevilla',
    VOZ: 'Voronezh',
    PEE: 'Perm',
    DNZ: 'Denizli',
    VOG: 'Volgograd',
    NAP: 'Naples',
    KRR: 'Krasnodar',
    DOK: 'Donetsk',
    RIX: 'Riga',
    AOE: 'Eskisehir',
    RTW: 'Saratov',
    SKG: 'Thessaloniki',
    ZAG: 'Zagreb',
    KRK: 'Krakow',
    VLC: 'Valencia',
    ERZ: 'Erzurum',
    OZH: 'Zaporizhzhia',
    LWO: 'Lviv',
    VNO: 'Vilnius',
    KIV: 'Chisinau',
    LCJ: 'Lodz',
    ZAZ: 'Zaragoza',
    WRO: 'Wroclaw',
    MJV: 'Murcia',
    DUS: 'Dusseldorf',
    SKP: 'Skopje',
    BRE: 'Bremen',
    REN: 'Orenburg',
    DRS: 'Dresden',
    POZ: 'Poznan',
    HAJ: 'Hannover',
    ASF: 'Astrakhan',
    PEZ: 'Penza',
    LYS: 'Lyon',
    LYN: 'Lyon',
    KVX: 'Kirov',
    NLV: 'Mykolaiv',
    TLS: 'Toulouse',
    CSY: 'Cheboksary',
    GDN: 'Gdansk',
    BTS: 'Bratislava',
    KGD: 'Kaliningrad',
    STW: 'Stavropol',
    BAL: 'Batman',
    KCM: 'Kahramanmaras',
    TLL: 'Tallinn',
    ZRH: 'Zurich',
    TZX: 'Trabzon',
    MLX: 'Malatya',
    EZS: 'Elazig',
    SJJ: 'Sarajevo',
    TIA: 'Tirana',
    SZZ: 'Szczecin',
    BLQ: 'Bologna',
    EGO: 'Belgorod',
    PDV: 'Plovdiv',
    BRQ: 'Brno',
    KUN: 'Kaunas',
    QND: 'Novi Sad',
    VAS: 'Sivas',
    VIN: 'Vinnytsia',
    VAN: 'Van',
    MMX: 'Malmo',
    ARH: 'Arkhangelsk',
    VAR: 'Varna',
    BZG: 'Bydgoszcz',
    SIP: 'Simferopol',
    BQT: 'Brest',
    EDO: 'Edirne',
    ECN: 'Ercan',
    DEB: 'Debrecen',
    CLJ: 'Cluj-Napoca',
    BRI: 'Bari',
    TSR: 'Timisoara',
    NTE: 'Nantes',
    OGZ: 'Vladikavkaz',
    ADF: 'Adiyaman',
    MMK: 'Murmansk',
    VLL: 'Valladolid',
    SXB: 'Strasbourg',
    IAS: 'Iasi',
    LJU: 'Ljubljana',
    CND: 'Constanta',
    PES: 'Petrozavodsk',
    MST: 'Maastricht',
    CRA: 'Craiova',
    BGO: 'Bergen',
    NAL: 'Nalchik',
    BOD: 'Bordeaux',
    ISE: 'Isparta',
    VIT: 'Vitoria',
    TKU: 'Turku',
    KEL: 'Kiel',
    RWN: 'Rovaniemi',
    SCW: 'Syktyvkar',
    KSC: 'Kosice',
    IFO: 'Ivano-Frankivsk',
    SVG: 'Stavanger',
    CSO: 'Oslo',
    LIL: 'Lille',
    ORK: 'Cork',
    RNS: 'Rennes',
    IEG: 'Zielona Gora',
    ERF: 'Erfurt',
    BOJ: 'Burgas',
    PKV: 'Pskov',
    TEQ: 'Tekirdag',
    PNA: 'Pamplona',
    GVA: 'Geneva',
    OMR: 'Oradea',
    RZE: 'Rzeszow',
    MSR: 'Mus',
    RJK: 'Rijeka',
    INI: 'Nis',
    BGZ: 'Braga',
    CKZ: 'Canakkale',
    SCN: 'Saarbrucken',
    SDR: 'Santander',
    SXZ: 'Siirt',
    PEG: 'Perugia',
    PRN: 'Pristina',
    ARW: 'Arad',
    DIJ: 'Dijon',
    ERC: 'Erzincan',
    SZG: 'Salzburg',
    CAG: 'Cagliari',
    NAV: 'Nevsehir',
    TGD: 'Podgorica',
    RJL: 'Logrono',
    MCQ: 'Miskolc',
    AJI: 'Agri',
    KUT: 'Kutaisi',
    SBZ: 'Sibiu',
    BCM: 'Bacau',
    AAL: 'Aalborg',
    CBP: 'Coimbra',
    RKV: 'Reykjavik',
    TGM: 'Targu Mures',
    BRN: 'Bern',
    LUX: 'Luxembourg',
    INN: 'Innsbruck',
    VST: 'Vasteras',
    ORB: 'Orebro',
    BAY: 'Bayreuth',
    ORE: 'Orleans',
    KSY: 'Kars',
    LPI: 'Linkoping',
    UDJ: 'Uzhhorod',
    IOA: 'Ioannina',
    JKG: 'Jonkoping',
    URO: 'Rouen',
    ILZ: 'Zilina',
    SUJ: 'Satu Mare',
    KLU: 'Klagenfurt',
    AOI: 'Ancona',
    SAW: 'Istanbul',
    IST: 'Istanbul',
    LTN: 'London',
    LHR: 'London',
    LGW: 'London',
    BQH: 'London',
    LCY: 'London',
    STN: 'London',
    ORY: 'Paris',
    CDG: 'Paris',
    LBG: 'Paris',
    TOJ: 'Madrid',
    MAD: 'Madrid',
    ESB: 'Ankara',
    LED: 'Saint Petersburg',
    BCN: 'Barcelona',
    TXL: 'Berlin',
    BER: 'Berlin',
    SXF: 'Berlin',
    ADB: 'Izmir',
    BUD: 'Budapest',
    YEI: 'Bursa',
    CIA: 'Rome',
    FCO: 'Rome',
    STR: 'Stuttgart',
    MUC: 'Munich',
    HAM: 'Hamburg',
    XFW: 'Hamburg',
    AYT: 'Antalya',
    BAK: 'Baku',
    VKO: 'Moscow',
    DME: 'Moscow',
};
