import { GreenDestination, RedDestination } from '../models/Destination';
import { WeatherPattern, Biodiversity, Geography, Transport, Amenity } from '../models/Props';

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

export const GreenDestinations = [
    new GreenDestination(
        `01`,
        `Matera, Italy`,
        `Known for its cave dwellings and sustainable tourism initiatives.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban, Geography.Farmland],
        [Transport.Airplane, Transport.Train],
        [Amenity.Hotels],
        materaImg
    ),
    new GreenDestination(
        `02`,
        `Ljubljana, Slovenia`,
        `A green capital city with a focus on eco-friendly practices.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Airplane, Transport.Train],
        [Amenity.Hotels, Amenity.Apartments],
        ljubljanaImg
    ),
    new GreenDestination(
        `03`,
        `Ghent, Belgium`,
        `A charming canal city with strong sustainability efforts.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Train],
        [Amenity.Hotels],
        ghentImg
    ),
    new GreenDestination(
        `04`,
        `Lombok, Indonesia`,
        `A quieter island with beautiful beaches and a commitment to preserving its natural beauty.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach, Geography.Forest],
        [Transport.Airplane],
        [Amenity.Hotels, Amenity.Apartments],
        lombokImg
    ),
    new GreenDestination(
        `05`,
        `Flores, Indonesia`,
        `Offers stunning landscapes, including the famous Kelimutu volcano, and a more laid-back atmosphere.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach, Geography.Forest],
        [Transport.Airplane],
        [Amenity.Hotels, Amenity.Apartments],
        floresImg
    ),
    new GreenDestination(
        `06`,
        `Komodo Island, Indonesia`,
        `Known for its cave dwellings and sustainable tourism initiatives.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach],
        [Transport.Airplane],
        [Amenity.Hotels, Amenity.Campsites],
        komodoImg
    ),
    new GreenDestination(
        `07`,
        `Tulum, Mexico`,
        `Famous for its eco-friendly resorts and commitment to sustainable tourism.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach],
        [Transport.Airplane],
        [Amenity.Hotels],
        tulumImg
    ),
    new GreenDestination(
        `08`,
        `Mahahual, Mexico`,
        `A quieter beach destination with a focus on conservation.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach],
        [Transport.Airplane],
        [Amenity.Hotels, Amenity.Campsites],
        mahahualImg
    ),
    new GreenDestination(
        `09`,
        `Holbox Island, Mexico`,
        `Offers a tranquil atmosphere and emphasizes responsible tourism practices.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach],
        [Transport.Airplane, Transport.Ferry],
        [Amenity.Hotels, Amenity.Campsites],
        holboxImg
    ),
    new GreenDestination(
        `010`,
        `Koh Lanta, Thailand`,
        `Known for its sustainable accommodations and commitment to marine conservation.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach],
        [Transport.Airplane, Transport.Ferry],
        [Amenity.Hotels, Amenity.Campsites],
        kohlantaImg
    ),
    new GreenDestination(
        `011`,
        `Koh Tao, Thailand`,
        `A popular diving destination with efforts to protect its marine environment.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Beach],
        [Transport.Airplane, Transport.Ferry],
        [Amenity.Hotels, Amenity.Campsites],
        kohtaoImg
    ),
    new GreenDestination(
        `012`,
        `Khao Sok National Park, Thailand`,
        `Offers ecotourism opportunities within a pristine rainforest.`,
        0,
        0,
        [WeatherPattern.Tropical],
        Biodiversity.High,
        [Geography.Forest],
        [Transport.Airplane, Transport.Bus],
        [Amenity.Campsites],
        khaosokImg
    ),
    new GreenDestination(
        `013`,
        `Rovinj, Croatia`,
        `A charming coastal town with a focus on sustainable tourism practices.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach, Geography.Urban],
        [Transport.Airplane],
        [Amenity.Hotels],
        rovinjImg
    ),
    new GreenDestination(
        `014`,
        `Zadar, Croatia`,
        `Known for its historic architecture and efforts to balance tourism with preservation.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach, Geography.Urban],
        [Transport.Airplane],
        [Amenity.Hotels, Amenity.Apartments],
        zadarImg
    ),
    new GreenDestination(
        `015`,
        `Pula, Croatia`,
        `Offers a mix of Roman history and environmental awareness.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach, Geography.Urban],
        [Transport.Airplane],
        [Amenity.Hotels, Amenity.Apartments],
        pulaImg
    ),
    new GreenDestination(
        `016`,
        `Choquequirao, Peru`,
        `A less-visited Inca ruin with stunning views and sustainable tourism management`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Mountainous],
        [Transport.Train, Transport.Taxi],
        [Amenity.Campsites],
        choquequiraoImg
    ),
    new GreenDestination(
        `017`,
        `Huaraz, Peru`,
        `Gateway to the Cordillera Blanca mountains, promoting responsible trekking.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Mountainous],
        [Transport.Train, Transport.Taxi],
        [Amenity.Campsites],
        huarazImg
    ),
    new GreenDestination(
        `018`,
        `Ollantaytambo, Peru`,
        `Rich in history and culture, with a more relaxed atmosphere.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Train],
        [Amenity.Hotels],
        ollantaytamboImg
    ),
    new GreenDestination(
        `019`,
        `Muscat, Oman`,
        `Blends traditional and modern architecture while preserving natural landscapes.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Airplane],
        [Amenity.Hotels],
        muscatImg
    ),
    new GreenDestination(
        `020`,
        `Doha, Qatar`,
        `Focuses on sustainable urban planning and eco-friendly initiatives.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Train],
        [Amenity.Hotels, Amenity.Apartments],
        dohaImg
    ),
    new GreenDestination(
        `021`,
        `Abu Dhabi, UAE`,
        `Developing cultural and eco-friendly attractions alongside modern architecture.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Train, Transport.Taxi],
        [Amenity.Hotels],
        abudhabiImg
    ),
    new GreenDestination(
        `022`,
        `Formentera, Spain`,
        `Known for its stunning beaches and commitment to sustainable tourism.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach],
        [Transport.Ferry],
        [Amenity.Hotels, Amenity.Apartments],
        formenteraImg
    ),
    new GreenDestination(
        `023`,
        `Menorca, Spain`,
        `Offers tranquility, UNESCO-listed biosphere reserves, and eco-conscious practices.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach],
        [Transport.Ferry],
        [Amenity.Hotels, Amenity.Apartments],
        menorcaImg
    ),
    new GreenDestination(
        `024`,
        `La Gomera, Spain`,
        `Part of the Canary Islands, emphasizing sustainable tourism and natural beauty.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach],
        [Transport.Ferry],
        [Amenity.Hotels, Amenity.Apartments],
        lagomeraImg
    ),
    new GreenDestination(
        `025`,
        `Santa Fe, New Mexico`,
        `Known for its artistic and cultural scene, and focus on water and energy conservation.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Train, Transport.Bus],
        [Amenity.Hotels],
        santafeImg
    ),
    new GreenDestination(
        `026`,
        `Portland, Oregon`,
        `Emphasizes eco-conscious living, urban planning, and green spaces.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban],
        [Transport.Train, Transport.Tram],
        [Amenity.Hotels, Amenity.Apartments],
        portlandImg
    ),
    new GreenDestination(
        `027`,
        `Asheville, North Carolina`,
        `Offers a blend of nature, arts, and sustainability initiatives.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Urban, Geography.Forest],
        [Transport.Train, Transport.Bus],
        [Amenity.Hotels, Amenity.Apartments],
        ashevilleImg
    ),
    new GreenDestination(
        `028`,
        `Milos, Greece`,
        `Known for its volcanic landscapes, pristine beaches, and more peaceful atmosphere.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach],
        [Transport.Airplane, Transport.Ferry],
        [Amenity.Hotels],
        milosImg
    ),
    new GreenDestination(
        `029`,
        `Naxos, Greece`,
        `Offers a variety of landscapes, local culture, and sustainable tourism practices.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach, Geography.Urban],
        [Transport.Airplane, Transport.Bus],
        [Amenity.Hotels, Amenity.Apartments],
        naxosImg
    ),
    new GreenDestination(
        `030`,
        `Crete, Greece`,
        `The largest Greek island with diverse attractions and an emphasis on sustainable travel.`,
        0,
        0,
        [WeatherPattern.Temperate],
        Biodiversity.Medium,
        [Geography.Beach, Geography.Urban],
        [Transport.Airplane, Transport.Bus],
        [Amenity.Hotels, Amenity.Apartments],
        creteImg
    ),
];

export const RedDestinations = [
    new RedDestination(
        `10`,
        `Venice, Italy`,
        `Venice is known for its historic canals and stunning architecture, but over-tourism has led to environmental degradation and erosion of the city's foundations.`,
        0,
        0,
        ['01', '02', '03']
    ),
    new RedDestination(
        `11`,
        `Bali, Indonesia`,
        `Bali has faced issues like excessive waste, water scarcity, and overdevelopment due to mass tourism, affecting its natural beauty and local culture.`,
        0,
        0,
        ['04', '05', '06']
    ),
    new RedDestination(
        `12`,
        `Cancún, Mexico`,
        `Cancún's rapid growth has resulted in habitat destruction, pollution, and damage to the fragile coral reefs of the Mesoamerican Barrier Reef System.`,
        0,
        0,
        ['07', '08', '09']
    ),
    new RedDestination(
        `13`,
        `Phuket, Thailand`,
        `The extensive development and high tourist numbers in Phuket have led to over-extraction of water resources, pollution, and degradation of natural areas.`,
        0,
        0,
        ['010', '011', '012']
    ),
    new RedDestination(
        `14`,
        `Dubrovnik, Croatia`,
        `Dubrovnik's popularity has led to overcrowding, excessive cruise ship visits, and strain on local infrastructure and resources.`,
        0,
        0,
        ['013', '014', '015']
    ),
    new RedDestination(
        `15`,
        `Machu Picchu, Peru`,
        `Unregulated tourism has taken a toll on the delicate ecosystem around Machu Picchu, leading to erosion and degradation of the historic site.`,
        0,
        0,
        ['016', '017', '018']
    ),
    new RedDestination(
        `16`,
        `Dubai, UAE`,
        `Dubai's rapid urbanization and extravagant development have resulted in high energy consumption, water scarcity, and disruption of local ecosystems.`,
        0,
        0,
        ['019', '020', '021']
    ),
    new RedDestination(
        `17`,
        `Ibiza, Spain`,
        `Ibiza's party scene and high-energy consumption have contributed to waste accumulation, pollution, and strain on its limited resources.`,
        0,
        0,
        ['022', '023', '024']
    ),
    new RedDestination(
        `18`,
        `Las Vegas, USA`,
        `The excessive water usage, energy consumption, and desert ecosystem disruption caused by Las Vegas' entertainment and hospitality industry are unsustainable.`,
        0,
        0,
        ['025', '026', '027']
    ),
    new RedDestination(
        `19`,
        `Santorini, Greece`,
        `Over-tourism in Santorini has led to overcrowding, waste issues, and strain on the island's infrastructure, impacting its iconic white-washed beauty.`,
        0,
        0,
        ['028', '029', '030']
    ),
];

export const Destinations = [...new Set([...GreenDestinations, ...RedDestinations])];
