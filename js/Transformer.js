function Transformer() {
}

Transformer.prototype.toJSON = function(response) {
    return JSON.parse(response);
};
