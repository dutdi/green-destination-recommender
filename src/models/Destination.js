class Destination {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
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
        accommodations,
        amenities,
        imgPath
    ) {
        super(id, name, description);
        this.avgRating = avgRating;
        this.numOfRatings = numOfRatings;
        this.weatherPatterns = weatherPatterns;
        this.biodiversity = biodiversity;
        this.geographies = geographies;
        this.transports = transports;
        this.accommodations = accommodations;
        this.amenities = amenities;
        this.imgPath = imgPath;
    }
}

export class RedDestination extends Destination {
    constructor(id, name, description, nudge1, nudge2, nudge3, nudge4) {
        super(id, name, description);
        this.nudge1 = nudge1;
        this.nudge2 = nudge2;
        this.nudge3 = nudge3;
        this.nudge4 = nudge4;
    }
}
