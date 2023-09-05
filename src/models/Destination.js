class Destination {
    constructor(id, name, description, avgRating, numOfRatings) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.avgRating = avgRating;
        this.numOfRatings = numOfRatings;
    }
}

export class GreenDestination extends Destination {
    constructor(
        id,
        name,
        description,
        avgRating,
        numOfRatings,
        weatherPatterns,
        biodiversity,
        geographies,
        transports,
        amenities,
        imgPath
    ) {
        super(id, name, description, avgRating, numOfRatings);
        this.weatherPatterns = weatherPatterns;
        this.biodiversity = biodiversity;
        this.geographies = geographies;
        this.transports = transports;
        this.amenities = amenities;
        this.imgPath = imgPath;
    }
}

export class RedDestination extends Destination {
    constructor(id, name, description, avgRating, numOfRatings, alternativeIds) {
        super(id, name, description, avgRating, numOfRatings);
        this.alternativeIds = alternativeIds;
    }
}
