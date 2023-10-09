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

import materaImg from '../media/matera.jpg';
import ljubljanaImg from '../media/ljubljana.jpg';
import ghentImg from '../media/ghent.jpg';
import lombokImg from '../media/lombok.jpg';
import floresImg from '../media/flores.jpg';
import komodoImg from '../media/komodo.jpg';
import tulumImg from '../media/tulum.jpg';
import mahahualImg from '../media/mahahual.jpg';
import holboxImg from '../media/holbox.jpg';
import kohlantaImg from '../media/kohlanta.jpg';
import kohtaoImg from '../media/kohtao.jpg';
import khaosokImg from '../media/khaosok.jpg';
import rovinjImg from '../media/rovinj.jpg';
import zadarImg from '../media/zadar.jpg';
import pulaImg from '../media/pula.jpg';
import choquequiraoImg from '../media/choquequirao.jpg';
import huarazImg from '../media/huaraz.jpg';
import ollantaytamboImg from '../media/ollantaytambo.jpg';
import muscatImg from '../media/muscat.jpg';
import dohaImg from '../media/doha.jpg';
import abudhabiImg from '../media/abudhabi.jpg';
import formenteraImg from '../media/formentera.jpg';
import menorcaImg from '../media/menorca.jpg';
import lagomeraImg from '../media/lagomera.jpg';
import santafeImg from '../media/santafe.jpg';
import portlandImg from '../media/portland.jpg';
import ashevilleImg from '../media/asheville.jpg';
import milosImg from '../media/milos.jpg';
import naxosImg from '../media/naxos.jpg';
import creteImg from '../media/crete.jpg';

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

export const Images = [
    materaImg,
    ljubljanaImg,
    ghentImg,
    lombokImg,
    floresImg,
    komodoImg,
    tulumImg,
    mahahualImg,
    holboxImg,
    kohlantaImg,
    kohtaoImg,
    khaosokImg,
    rovinjImg,
    zadarImg,
    pulaImg,
    choquequiraoImg,
    huarazImg,
    ollantaytamboImg,
    muscatImg,
    dohaImg,
    abudhabiImg,
    formenteraImg,
    menorcaImg,
    lagomeraImg,
    santafeImg,
    portlandImg,
    ashevilleImg,
    milosImg,
    naxosImg,
    creteImg,
];
