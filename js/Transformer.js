function Transformer(response) {
    this.response = response;
}

Transformer.prototype.toJSON = function() {
    return this.response.json();
};
