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
    Low: {
        color: Colors.red,
        text: 'Low',
    },
    Medium: {
        color: Colors.yellow,
        text: 'Medium',
    },
    High: {
        color: Colors.lightGreen,
        text: 'High',
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

export const Amenity = {
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
};
