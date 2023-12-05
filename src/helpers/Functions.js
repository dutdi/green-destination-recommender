import Papa from 'papaparse';

export async function fetchDataFromFile(filePath) {
    return new Promise((resolve, reject) => {
        Papa.parse(filePath, {
            header: true,
            dynamicTyping: true,
            download: true,
            complete: (result) => {
                resolve(result.data);
            },
            error: (error) => {
                reject(error.message);
            },
        });
    });
}

export function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function getRandomXElementsFromArray(array, x) {
    return array.sort(() => Math.random() - Math.random()).slice(0, x);
}

export function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours} hr ${minutes} min`;
}

export function convertToSec(duration) {
    const parts = duration.split(' ');
    let totalSeconds = 0;

    for (let i = 0; i < parts.length; i += 2) {
        const value = parseInt(parts[i]);
        const unit = parts[i + 1];

        if (unit === 'hr') {
            totalSeconds += value * 60 * 60;
        } else if (unit === 'min') {
            totalSeconds += value * 60;
        } else if (unit === 'sec') {
            totalSeconds += value;
        }
    }

    return totalSeconds;
}

export function calculateDistance(fromDestination, toDestination) {
    const fromLat = fromDestination.latitude;
    const fromLon = fromDestination.longitude;
    const toLat = toDestination.latitude;
    const toLon = toDestination.longitude;

    return getDistanceFromLatLonInKm(fromLat, fromLon, toLat, toLon);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance.toFixed(2);
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function formatPopulation(population) {
    const abbreviations = {
        B: 1000000000,
        M: 1000000,
        K: 1000,
    };

    for (const key in abbreviations) {
        if (population >= abbreviations[key]) {
            return (population / abbreviations[key]).toFixed(2) + key;
        }
    }

    return population.toString();
}

export function calculateMinCo2Value(fromDestination, toDestination) {
    const minCo2ValueFlight = parseInt(
        fromDestination.connections_flight
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => connection.details.co2_kg)
            .sort((a, b) => a - b)[0] || -1
    );

    const minCo2ValueCar = parseInt(
        fromDestination.connections_driving
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => connection.estd_emissions_osrm_gm)
            .sort((a, b) => a - b)[0] || -1
    );

    if (minCo2ValueFlight === -1 && minCo2ValueCar === -1) {
        return -1;
    } else if (minCo2ValueFlight === -1) {
        return minCo2ValueCar;
    } else if (minCo2ValueCar === -1) {
        return minCo2ValueFlight;
    } else {
        return Math.min(minCo2ValueFlight, minCo2ValueCar);
    }
}

export function findFlightConnectionWithMinCo2(fromDestination, toDestination) {
    return fromDestination.connections_flight
        .filter((connection) => connection.to_id === toDestination.id)
        .sort((a, b) => a.details.co2_kg - b.details.co2_kg)[0];
}

export function findDrivingConnectionWithMinCo2(fromDestination, toDestination) {
    return fromDestination.connections_driving
        .filter((connection) => connection.to_id === toDestination.id)
        .sort((a, b) => a.estd_emissions_osrm_gm - b.estd_emissions_osrm_gm)[0];
}
