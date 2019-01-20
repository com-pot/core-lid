import Rest from "../../../services/rest"

export class Categories {
    constructor(/**Rest*/ rest) {
        this.rest = rest;
    }

    /** @returns {{id: string, title: string}[]} */
    listPairs() {
        return this.rest.get("topic-categories")
    }
}

export default new Categories(new Rest("/api/forum/"));