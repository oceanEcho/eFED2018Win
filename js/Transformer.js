class Transformer {
    constructor() {
    }
    toJSON(response) {
        if (response !== null) {
            return JSON.parse(response);
        }
        else {
            return null;
        }
    }
}
