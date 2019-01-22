export default class InfoNibbleType {
    constructor(type, caption, icon = null, /**InfoNibDefinitionExtra*/options = null) {
        this.type = type;
        this.caption = caption;
        this.icon = icon;
        this.additionalField = options || {};
    }

    /** @returns {boolean} */
    hasIcon() {
        return !!this.icon;
    }
}

/**
 * @typedef {Object} InfoNibDefinitionExtra
 * @property {string} text
 */