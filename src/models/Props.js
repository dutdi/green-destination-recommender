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
        icon: <AcUnitIcon style={{ color: Colors.lightBlue }} />,
        text: 'Arctic',
    },
    Tropical: {
        icon: <WbSunnyIcon style={{ color: Colors.sunnyYellow }} />,
        text: 'Tropical',
    },
    Continental: {
        icon: <ThermostatIcon style={{ color: Colors.brown }} />,
        text: 'Continental',
    },
    Oceanic: {
        icon: <TsunamiIcon style={{ color: Colors.darkBlue }} />,
        text: 'Oceanic',
    },
    Temperate: {
        icon: <CloudIcon style={{ color: Colors.mutedBlue }} />,
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
        icon: <LocationCityIcon style={{ color: Colors.red }} />,
        text: 'Urban',
    },
    Beach: {
        icon: <BeachAccessIcon style={{ color: Colors.yellow }} />,
        text: 'Beach',
    },

    Mountainous: {
        icon: <LandscapeIcon style={{ color: Colors.green }} />,
        text: 'Mountainous',
    },
    Farmland: {
        icon: <AgricultureIcon style={{ color: Colors.green }} />,
        text: 'Farmland',
    },
    Forest: {
        icon: <ForestIcon style={{ color: Colors.green }} />,
        text: 'Forest',
    },

    Desert: {
        icon: <WavesIcon style={{ color: Colors.yellow }} />,
        text: 'Desert',
    },
};

export const Transport = {
    Airplane: {
        icon: <AirplanemodeActiveIcon style={{ color: Colors.black }} />,
        text: 'Airplane',
    },
    Train: {
        icon: <TrainIcon style={{ color: Colors.red }} />,
        text: 'Train',
    },
    Tram: {
        icon: <TramIcon style={{ color: Colors.brown }} />,
        text: 'Tram',
    },
    Underground: {
        icon: <SubwayIcon style={{ color: Colors.blue }} />,
        text: 'Underground',
    },
    Bus: {
        icon: <DirectionsBusIcon style={{ color: Colors.green }} />,
        text: 'Bus',
    },
    Taxi: {
        icon: <LocalTaxiIcon style={{ color: Colors.yellow }} />,
        text: 'Taxi',
    },
    Ferry: {
        icon: <DirectionsBoatIcon style={{ color: Colors.mutedBlue }} />,
        text: 'Ferry',
    },
};

export const Amenity = {
    Villas: {
        icon: <VillaIcon style={{ color: Colors.sunnyYellow }} />,
        text: '',
    },
    Hotels: {
        icon: <BedroomParentIcon style={{ color: Colors.blue }} />,
        text: 'Hotels',
    },
    Apartments: {
        icon: <ApartmentIcon style={{ color: Colors.red }} />,
        text: 'Apartments',
    },
    Campsites: {
        icon: <GrassIcon style={{ color: Colors.green }} />,
        text: 'Campsites',
    },
};
