import { Destination } from '../models/Destination';
import CostaRicaImgPath from '../media/costa-rica.jpg';
import IcelandImgPath from '../media/iceland.jpg';
import BhutanImgPath from '../media/bhutan.jpg';
import NewZealandImgPath from '../media/new-zealand.jpg';
import NorwayImgPath from '../media/norway.jpg';
import VancouverImgPath from '../media/vancouver.jpg';
import PalauImgPath from '../media/palau.jpg';
import BotswanaImgPath from '../media/botswana.jpg';
import SloveniaImgPath from '../media/slovenia.jpg';

export const Destinations = [
    new Destination(
        `0`,
        `Costa Rica`,
        `Known for its rich biodiversity and commitment to conservation, Costa Rica offers eco-lodges, lush rainforests, and opportunities for responsible wildlife encounters.`,
        CostaRicaImgPath
    ),
    new Destination(
        `1`,
        `Iceland`,
        `With geothermal energy powering most of the country, Iceland's stunning landscapes include glaciers, volcanoes, and geysers, providing an eco-friendly adventure.`,
        IcelandImgPath
    ),
    new Destination(
        `2`,
        'Bhutan',
        `Famous for its "Gross National Happiness" index and focus on environmental preservation, Bhutan allows visitors to experience its traditional culture while promoting sustainability.`,
        BhutanImgPath
    ),
    new Destination(
        `3`,
        'New Zealand',
        `A leader in eco-tourism, New Zealand boasts pristine landscapes, eco-friendly accommodations, and numerous outdoor activities like hiking and wildlife encounters.`,
        NewZealandImgPath
    ),
    new Destination(
        `4`,
        'Norway',
        `Embrace sustainable travel in Norway as you explore its stunning fjords, glaciers, and Northern Lights, all while enjoying a country committed to green initiatives.`,
        NorwayImgPath
    ),
    new Destination(
        `5`,
        'Vancouver',
        `A sustainability-driven city, Vancouver offers access to beautiful nature, local organic food, and a commitment to eco-friendly transportation options.`,
        VancouverImgPath
    ),
    new Destination(
        `6`,
        'Palau',
        `This island nation is a leader in marine conservation, with pristine coral reefs and initiatives to protect its marine life, making it a haven for eco-conscious travelers.`,
        PalauImgPath
    ),
    new Destination(
        `7`,
        'Botswana',
        `Experience eco-friendly safaris in Botswana, where wildlife conservation and community involvement are integral to protecting the country's natural heritage.`,
        BotswanaImgPath
    ),
    new Destination(
        `8`,
        'Slovenia',
        `A hidden gem in sustainable tourism, Slovenia showcases its stunning Alpine landscapes, picturesque lakes, and environmentally-friendly practices.`,
        SloveniaImgPath
    ),
];
