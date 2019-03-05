function Spinner(overlay, spinner) {
    this.overlay = overlay;
    this.spinner = spinner;
}

Spinner.prototype.showSpinner = function () {
    this.overlay.style.display = 'block';
    this.spinner.style.display = 'block';
};

Spinner.prototype.hideSpinner = function () {
    this.overlay.style.display = 'none';
    this.spinner.style.display = 'none';
};
