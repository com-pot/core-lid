export default class InfoNibble {
    /**
     *
     * @param {string} type
     * @param {string} value
     * @param {Object} extra
     */
    constructor(type, value, extra = {}) {
        this.type = type;
        this.value = value;
        this.extra = extra;
    }

}