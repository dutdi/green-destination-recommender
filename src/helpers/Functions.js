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

export function formatNumber(number) {
    const abbreviations = {
        B: 1000000000,
        M: 1000000,
        K: 1000,
    };

    for (const key in abbreviations) {
        if (number >= abbreviations[key]) {
            return (number / abbreviations[key]).toFixed(2) + key;
        }
    }

    return number.toString();
}

export function calculateMinCo2Value(fromDestination, toDestination) {
    const minCo2ValueFlight =
        fromDestination.connections_flight
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => connection.co2_kg)
            .sort((a, b) => a - b)[0] || Number.MAX_VALUE;

    const minCo2ValueDriving =
        fromDestination.connections_driving
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => connection.co2_kg)
            .sort((a, b) => a - b)[0] || Number.MAX_VALUE;

    const minCo2ValueTrain =
        fromDestination.connections_train
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => connection.co2_kg)
            .sort((a, b) => a - b)[0] || Number.MAX_VALUE;

    return Math.min(minCo2ValueFlight, minCo2ValueDriving, minCo2ValueTrain);
}

export function calculateMinDuration(fromDestination, toDestination) {
    const minDurationFlight =
        fromDestination.connections_flight
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => convertToSec(connection.duration_str))
            .sort((a, b) => a - b)[0] || Number.MAX_VALUE;

    const minDurationDriving =
        fromDestination.connections_driving
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => connection.duration_sec)
            .sort((a, b) => a - b)[0] || Number.MAX_VALUE;

    const minDurationTrain =
        fromDestination.connections_train
            .filter((connection) => connection.to_id === toDestination.id)
            .map((connection) => convertToSec(connection.duration_sec))
            .sort((a, b) => a - b)[0] || Number.MAX_VALUE;

    return Math.min(minDurationFlight, minDurationDriving, minDurationTrain);
}

export function findFlightConnectionWithMinCo2(fromDestination, toDestination) {
    return fromDestination.connections_flight
        .filter((connection) => connection.to_id === toDestination.id)
        .sort((a, b) => a.co2_kg - b.co2_kg)[0];
}

export function findDrivingConnectionWithMinCo2(fromDestination, toDestination) {
    return fromDestination.connections_driving
        .filter((connection) => connection.to_id === toDestination.id)
        .sort((a, b) => a.co2_kg - b.co2_kg)[0];
}

export function findTrainConnectionWithMinCo2(fromDestination, toDestination) {
    return fromDestination.connections_train
        .filter((connection) => connection.to_id === toDestination.id)
        .sort((a, b) => a.co2_kg - b.co2_kg)[0];
}

export function calculateAvgCo2AllConnections(allConnections) {
    return (
        allConnections.reduce((acc, connection) => {
            return acc + connection.co2_kg;
        }, 0) / allConnections.length
    );
}

export function getSortedToDestinations(fromDestination, destinations, sortBy, month) {
    var allConnections = [
        ...fromDestination.connections_train,
        ...fromDestination.connections_driving,
        ...fromDestination.connections_flight,
    ];

    const sortedToIds = [
        ...new Set(
            allConnections
                .sort((a, b) => {
                    if (sortBy === 'emission') {
                        return a.co2_kg - b.co2_kg;
                    } else if (sortBy === 'seasonality') {
                        const aSeasonality = destinations.find((destination) => destination.id === a.to_id).seasonality[month];
                        const bSeasonality = destinations.find((destination) => destination.id === b.to_id).seasonality[month];
                        return bSeasonality - aSeasonality;
                    } else if (sortBy === 'popularity') {
                        const aPopularity = destinations.find((destination) => destination.id === a.to_id).popularity.review_count;
                        const bPopularity = destinations.find((destination) => destination.id === b.to_id).popularity.review_count;
                        return bPopularity - aPopularity;
                    } else if (sortBy === 'duration') {
                        console.log(a);
                        const aDuration = a.type === 'flight' ? convertToSec(a.duration_str) : a.duration_sec;
                        const bDuration = b.type === 'flight' ? convertToSec(b.duration_str) : b.duration_sec;
                        return aDuration - bDuration;
                    }
                    return 0;
                })
                .map((connection) => connection.to_id)
        ),
    ];

    const filteredToDestinations = destinations.filter((destination) => sortedToIds.includes(destination.id));
    const sortedToDestinations = sortedToIds.map((id) => {
        return filteredToDestinations.find((obj) => obj.id === id);
    });

    return sortedToDestinations;
}
