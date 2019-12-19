
export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.langChangeBind(this.changeLangHandle);
        this.view.searchInputBind(this.searchInputHandle);
        this.view.buttonFarBind(this.convertToFarengeit);
        this.view.buttonCelBind(this.convertToCelsius);
        this.model.appChangesBind(this.appChangesRespond);

        this.model.initApp();
    }

    appChangesRespond = (data) => {
        this.view.displayApp(data)
    }

    changeLangHandle = () => {
        this.model.changeLang()
    }

    searchInputHandle = (query) => {
        this.model.inputNewLocation(query) 
    }

    convertToFarengeit = () => {
        this.model.convertToF ()
    }

    convertToCelsius = () => {
        this.model.convertToC ()
    }
}