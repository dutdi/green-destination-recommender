const alpha = 0.281;
const beta = 0.334;
const gamma = 0.385;

export function calculateOverallScore(destination, duration_sec, emission_kg, distance_km, month) {
    let transportationScore = calculateTransportationScore(duration_sec, emission_kg, distance_km);
    let popularityScore = calculatePopularityScore(destination);
    let seasonalityScore = calculateSeasonalityScore(destination, month);
    let overallScore = alpha * transportationScore + beta * popularityScore + gamma * seasonalityScore;

    return overallScore.toFixed(0);
}

function calculateTransportationScore(duration_sec, emission_kg, distance_km) {
    const alphaTT = 0.352;
    const alphaEM = 0.218;
    const alphaCost = 0.431;
    const euroPerKm = 0.11;
    const minute = duration_sec / 60;
    const emissionInLbs = emission_kg * 2.205;
    let transportationScore = 1 * alphaTT * minute + 1 * alphaEM * emissionInLbs + 1 * alphaCost * distance_km * euroPerKm;
    return transportationScore;
}

function calculatePopularityScore(destination) {
    let popularityScore = destination.popularity.popularity_score;
    return popularityScore < 1 ? popularityScore : 0;
}

function calculateSeasonalityScore(destination, month) {
    let seasonalityScore = destination.seasonality[month];
    return seasonalityScore < 1 ? seasonalityScore : 0;
}
