import Papa from 'papaparse';
import { calculateOverallScore } from './SF';

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
    return allConnections.length > 0
        ? allConnections.reduce((acc, connection) => {
              return acc + connection.co2_kg;
          }, 0) / allConnections.length
        : 0;
}

export function calculateAvgValues(fromDestination, toDestinations, month) {
    const avgValues = {
        co2: calculateAvgCo2AllConnections(
            fromDestination.connections_flight.concat(fromDestination.connections_driving).concat(fromDestination.connections_train)
        ),
        popularity:
            toDestinations.length > 0
                ? toDestinations.reduce((acc, dest) => acc + dest.popularity.popularity_score, 0) / toDestinations.length
                : 0,
        seasonality:
            toDestinations.length > 0 ? toDestinations.reduce((acc, dest) => acc + dest.seasonality[month], 0) / toDestinations.length : 0,
    };

    return avgValues;
}

export function calculateMinCo2Mode(fromDestination, toDestination) {
    const trainConnectionWithMinCo2 = findTrainConnectionWithMinCo2(fromDestination, toDestination);
    const drivingConnectionWithMinCo2 = findDrivingConnectionWithMinCo2(fromDestination, toDestination);
    const flightConnectionWithMinCo2 = findFlightConnectionWithMinCo2(fromDestination, toDestination);

    const trainMinCo2 = trainConnectionWithMinCo2 ? trainConnectionWithMinCo2.co2_kg : Number.MAX_VALUE;
    const drivingMinCo2 = drivingConnectionWithMinCo2 ? drivingConnectionWithMinCo2.co2_kg : Number.MAX_VALUE;
    const flightMinCo2 = flightConnectionWithMinCo2 ? flightConnectionWithMinCo2.co2_kg : Number.MAX_VALUE;

    const minimum = Math.min(flightMinCo2, drivingMinCo2, trainMinCo2);

    const minCo2Mode =
        minimum === trainMinCo2
            ? {
                  mode: 'Train 🚉',
                  co2: trainMinCo2,
                  duration: formatDuration(trainConnectionWithMinCo2.duration_sec),
                  distance_km: trainConnectionWithMinCo2.distance_km,
              }
            : minimum === drivingMinCo2
            ? {
                  mode: 'Driving 🚗',
                  co2: drivingMinCo2,
                  duration: formatDuration(drivingConnectionWithMinCo2.duration_sec),
                  distance_km: drivingConnectionWithMinCo2.distance_km,
              }
            : {
                  mode: 'Flight 🛫',
                  co2: flightMinCo2,
                  duration: flightConnectionWithMinCo2.duration_str,
                  distance_km: getDistanceFromLatLonInKm(
                      fromDestination.latitude,
                      fromDestination.longitude,
                      toDestination.latitude,
                      toDestination.longitude
                  ),
              };

    return minCo2Mode;
}

export function calculateOffset(sortBy, averages, co2, popularity, seasonality) {
    if (sortBy === 'emission') {
        return parseInt((co2 * 100) / averages.co2 - 100);
    } else if (sortBy === 'popularity') {
        return parseInt((popularity * 100) / averages.popularity - 100);
    } else if (sortBy === 'seasonality') {
        return parseInt((seasonality * 100) / averages.seasonality - 100);
    }
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
                    if (sortBy === 'overall') {
                        const aDestination = destinations.find((destination) => destination.id === a.to_id);
                        const bDestination = destinations.find((destination) => destination.id === b.to_id);
                        let aOverall = calculateOverallScore(fromDestination, aDestination, month);
                        let bOverall = calculateOverallScore(fromDestination, bDestination, month);
                        return aOverall - bOverall;
                    } else if (sortBy === 'emission') {
                        return a.co2_kg - b.co2_kg;
                    } else if (sortBy === 'popularity') {
                        let aPopularity = destinations.find((destination) => destination.id === a.to_id).popularity.popularity_score;
                        let bPopularity = destinations.find((destination) => destination.id === b.to_id).popularity.popularity_score;
                        return aPopularity - bPopularity;
                    } else if (sortBy === 'seasonality') {
                        const aSeasonality = destinations.find((destination) => destination.id === a.to_id).seasonality[month];
                        const bSeasonality = destinations.find((destination) => destination.id === b.to_id).seasonality[month];
                        return aSeasonality - bSeasonality;
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

export function getAllMapValues(fromDestination, toDestinations, sortBy, month) {
    if (sortBy === 'overall') {
        return toDestinations.map((destination) => calculateOverallScore(fromDestination, destination, month));
    } else if (sortBy === 'emission') {
        return toDestinations.map((destination) => calculateMinCo2Value(fromDestination, destination));
    } else if (sortBy === 'popularity') {
        return toDestinations.map((destination) => destination.popularity.popularity_score);
    } else if (sortBy === 'seasonality') {
        return toDestinations.map((destination) => destination.seasonality[month]);
    }
}

export function getPopularityIndex(score) {
    if (score >= 0 && score < 0.08) {
        return 0;
    } else if (score >= 0.08 && score < 0.2) {
        return 1;
    } else if (score >= 0.2 && score < 0.4) {
        return 2;
    } else if (score >= 0.4 && score < 1) {
        return 3;
    } else {
        return -1;
    }
}

export function getSeasonalityIndex(score) {
    if (score >= 0.041 && score < 0.07) {
        return 0;
    } else if (score >= 0.07 && score < 0.9) {
        return 1;
    } else if (score >= 0.9 && score < 0.115) {
        return 2;
    } else if (score >= 0.115 && score < 0.2) {
        return 3;
    } else {
        return -1;
    }
}

export function getSortedMinCo2Modes(fromDestination, toDestination) {
    const modes = [];
    const minDrivingCo2Mode = findDrivingConnectionWithMinCo2(fromDestination, toDestination);
    if (minDrivingCo2Mode) {
        const md = {
            mode: 'Driving 🚗',
            duration: minDrivingCo2Mode.duration_sec,
            co2: minDrivingCo2Mode.co2_kg,
        };
        modes.push(md);
    }
    const minFlightCo2Mode = findFlightConnectionWithMinCo2(fromDestination, toDestination);
    if (minFlightCo2Mode) {
        const mf = {
            mode: 'Flight ✈️',
            duration: convertToSec(minFlightCo2Mode.duration_str),
            co2: minFlightCo2Mode.co2_kg,
        };
        modes.push(mf);
    }
    const minTrainCo2Mode = findTrainConnectionWithMinCo2(fromDestination, toDestination);
    if (minTrainCo2Mode) {
        const mt = {
            mode: 'Train 🚉',
            duration: minTrainCo2Mode.duration_sec,
            co2: minTrainCo2Mode.co2_kg,
        };
        modes.push(mt);
    }
    return modes.sort((a, b) => a.co2 - b.co2);
}

export function getColorForValue(value, maxValue) {
    const normalizedValue = value / maxValue;
    const red = normalizedValue < 0.5 ? Math.round(2 * normalizedValue * 255) : 255;
    const green = normalizedValue > 0.5 ? Math.round(2 * (1 - normalizedValue) * 255) : 255;
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
}
