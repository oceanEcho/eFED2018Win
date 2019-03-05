function Renderer(data) {
    this.data = data;
}

Renderer.prototype.renderHeader = function(header) {
    header.innerHTML = `header`;
};

Renderer.prototype.renderFooter = function(footer) {
    footer.innerHTML = `footer`;
};
