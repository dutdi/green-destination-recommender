import { findTrainConnectionWithMinCo2, findDrivingConnectionWithMinCo2, findFlightConnectionWithMinCo2, convertToSec } from './Functions';

export function calculateOverallScore(fromDestination, toDestination, month) {
    const alpha = 0.281;
    const beta = 0.334;
    const gamma = 0.385;

    const transportationScore = calculateTransportationScore(fromDestination, toDestination);
    const popularityScore = calculatePopularityScore(toDestination);
    const seasonalityScore = calculateSeasonalityScore(toDestination, month);
    let overallScore = alpha * transportationScore + beta * popularityScore + gamma * seasonalityScore;

    return (overallScore * 100).toFixed(2);
}

function calculateTransportationScore(fromDestination, toDestination) {
    const zScores = normalizeTransportationScore(fromDestination, toDestination);
    const minZScore = Math.min(...Object.values(zScores).filter((z) => z !== null));
    return minZScore;
}

function calculatePopularityScore(toDestination) {
    const popularityScore = toDestination.popularity.popularity_score;
    return popularityScore < 1 ? popularityScore : 0.5;
}

function calculateSeasonalityScore(toDestination, month) {
    const seasonalityScore = toDestination.seasonality[month];
    return seasonalityScore < 1 ? seasonalityScore : 0.5;
}

function normalizeTransportationScore(fromDestination, toDestination) {
    const alphaTT = 0.352;
    const alphaEM = 0.218;
    const alphaCost = 0.431;

    let scores = {
        driving: null,
        train: null,
        flight: null,
    };

    const minCo2TrainConnection = findTrainConnectionWithMinCo2(fromDestination, toDestination);
    const minCo2DrivingConnection = findDrivingConnectionWithMinCo2(fromDestination, toDestination);
    const minCo2FlightConnection = findFlightConnectionWithMinCo2(fromDestination, toDestination);

    const drivingEmission = minCo2DrivingConnection?.co2_kg;
    const trainEmission = minCo2TrainConnection?.co2_kg;
    const flightEmission = minCo2FlightConnection?.co2_kg;

    const drivingTime = minCo2DrivingConnection?.duration_sec;
    const trainTime = minCo2TrainConnection?.duration_sec;
    const flightTime = minCo2FlightConnection && convertToSec(minCo2FlightConnection?.duration_str);

    const drivingCost = minCo2DrivingConnection?.cost;
    const trainCost = minCo2TrainConnection?.cost;
    const flightCost = minCo2FlightConnection?.cost;

    let emissions = [drivingEmission, trainEmission, flightEmission].filter((e) => e !== undefined);
    let times = [drivingTime, trainTime, flightTime].filter((t) => t !== undefined);
    let costs = [drivingCost, trainCost, flightCost].filter((c) => c !== undefined);

    if (emissions.length === 0 || times.length === 0 || costs.length === 0) {
        return scores;
    }

    let maxEmission = Math.max(...emissions);
    let minEmission = Math.min(...emissions);

    let maxTime = Math.max(...times);
    let minTime = Math.min(...times);

    let maxCost = Math.max(...costs);
    let minCost = Math.min(...costs);

    if (drivingEmission !== undefined && drivingTime !== undefined && drivingCost !== undefined) {
        let normDrivingEmission = calculateNormalized(drivingEmission, minEmission, maxEmission);
        let normDrivingTime = calculateNormalized(drivingTime, minTime, maxTime);
        let normDrivingCost = calculateNormalized(drivingCost, minCost, maxCost);
        scores.driving = alphaEM * normDrivingEmission + alphaTT * normDrivingTime + alphaCost * normDrivingCost;
    }

    if (trainEmission !== undefined && trainTime !== undefined && trainCost !== undefined) {
        let normTrainEmission = calculateNormalized(trainEmission, minEmission, maxEmission);
        let normTrainTime = calculateNormalized(trainTime, minTime, maxTime);
        let normTrainCost = calculateNormalized(trainCost, minCost, maxCost);
        scores.train = alphaEM * normTrainEmission + alphaTT * normTrainTime + alphaCost * normTrainCost;
    }

    if (flightEmission !== undefined && flightTime !== undefined && flightCost !== undefined) {
        let normFlightEmission = calculateNormalized(flightEmission, minEmission, maxEmission);
        let normFlightTime = calculateNormalized(flightTime, minTime, maxTime);
        let normFlightCost = calculateNormalized(flightCost, minCost, maxCost);
        scores.flight = alphaEM * normFlightEmission + alphaTT * normFlightTime + alphaCost * normFlightCost;
    }

    return scores;
}

const calculateNormalized = (value, min, max) => {
    return min === max ? 0.5 : (value - min) / (max - min);
};
