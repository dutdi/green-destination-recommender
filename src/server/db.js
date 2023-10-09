import Parse from 'parse/dist/parse.min.js';
import destinations from '../data/data.json';
import { GreenDestination } from '../models/Destination';
import { WeatherPattern, Biodiversity, Geography, Transport, Accommodation, Amenities, Images } from '../models/Props';

export async function saveDestinations() {
    for (const destination of destinations) {
        try {
            const name = destination.City;
            const description = destination.Description;
            const avgRating = Number(((Math.floor(Math.random() * (10 - 7 + 1)) + 7) / 2).toFixed(1));
            const numOfReviews = Number(Math.floor(Math.random() * (250 - 30 + 1)) + 30);
            const climateValues = destination.Climate.split('/');
            const biodiversityValue = destination.Biodiversity;
            const geographyValues = destination.Geography.split('/');
            const transportValues = destination.Transport.split('/');
            const accommodationValues = destination.Accommodation.split('/');
            const amenityValues = destination.Amenity.split('/');
            const imageId = Number(Math.floor(Math.random() * Images.length));

            let Destination = new Parse.Object('Destination');
            Destination.set('name', name);
            Destination.set('description', description);
            Destination.set('avgRating', avgRating);
            Destination.set('numOfReviews', numOfReviews);
            Destination.set('climateValues', climateValues);
            Destination.set('biodiversityValue', biodiversityValue);
            Destination.set('geographyValues', geographyValues);
            Destination.set('transportValues', transportValues);
            Destination.set('accommodationValues', accommodationValues);
            Destination.set('amenityValues', amenityValues);
            Destination.set('imageId', imageId);

            Destination.set('completeData', {
                name: name,
                description: description,
                avgRating: avgRating,
                numOfReviews: numOfReviews,
                climateValues: climateValues,
                biodiversityValue: biodiversityValue,
                geographyValues: geographyValues,
                transportValues: transportValues,
                accommodationValues: accommodationValues,
                amenityValues: amenityValues,
                imageId: imageId,
            });

            try {
                // await Destination.save();
            } catch (error) {
                console.log(`Error! ${error}`);
                return false;
            }
        } catch (error) {
            console.log(`Error! ${error}`);
            return false;
        }
    }
}

export async function getAllDestinations() {
    let destinations = [];
    let parseQuery = new Parse.Query('Destination');
    parseQuery.limit(500);
    let queryResult = await parseQuery.find();
    for (let result of queryResult) {
        let climateValues = [];
        for (const value of result.get('climateValues')) {
            climateValues.push(WeatherPattern[value]);
        }
        let geographyValues = [];
        for (const value of result.get('geographyValues')) {
            geographyValues.push(Geography[value]);
        }
        let transportValues = [];
        for (const value of result.get('transportValues')) {
            transportValues.push(Transport[value]);
        }
        let accommodationValues = [];
        for (const value of result.get('accommodationValues')) {
            accommodationValues.push(Accommodation[value]);
        }
        let amenityValues = [];
        for (const value of result.get('amenityValues')) {
            amenityValues.push(Amenities[value.replace('&', '')]);
        }
        destinations.push(
            new GreenDestination(
                result['id'],
                result.get('name'),
                result.get('description'),
                result.get('avgRating'),
                result.get('numOfReviews'),
                climateValues,
                Biodiversity[result.get('biodiversityValue')],
                geographyValues,
                transportValues,
                accommodationValues,
                amenityValues,
                result.get('imageId')
            )
        );
    }
    return destinations;
}
