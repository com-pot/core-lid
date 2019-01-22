import InfoNibbleType from '../model/InfoNibbleType';
import InfoNibble from "../model/InfoNibble";

export class InfoNibbles {
    /**@type {ReadonlyArray<InfoNibbleType>} */
    static types = Object.freeze([
        new InfoNibbleType('occupancy', 'Occupancy', 'briefcase'),
        new InfoNibbleType('twitter', 'Twitter', ['fab', 'twitter']),
        new InfoNibbleType('facebook', 'Facebook', ['fab', 'facebook']),
        new InfoNibbleType('steam', 'Steam', ['fab', 'steam']),
        new InfoNibbleType('discord', 'Discord', ['fab', 'discord']),
        new InfoNibbleType('custom', 'Custom', 'ellipsis-h', {text: 'label'}),
    ]);

    create() {
        return new InfoNibble('custom', '');
    }

    /** @returns {ReadonlyArray<InfoNibbleType>} */
    getTypes() {
        return InfoNibbles.types;
    }

    /**
     *
     * @param {string} type
     * @returns {InfoNibbleType|undefined}
     */
    getType(type) {
        return InfoNibbles.types.find((t) => t.type === type);
    }
}

export default new InfoNibbles();