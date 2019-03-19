class Spinner {
    constructor(overlay, spinner) {
        this.overlay = overlay;
        this.spinner = spinner;
    }
    showSpinner() {
        this.overlay.style.display = 'block';
        this.spinner.style.display = 'block';
    }
    hideSpinner() {
        this.overlay.style.display = 'none';
        this.spinner.style.display = 'none';
    }
}
