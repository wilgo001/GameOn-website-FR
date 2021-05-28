const FIRST = "first";
const LAST = "last";
const EMAIL = "email";
const DATE = "birthdate";
const QUANT = "quantity";
const LOCATE = "location1";
const COND = "checkbox1";

const conditionList = {
    required : "required",
    twoChar : "twoChar",
    emailPattern : "emailPattern",
    datePattern : "datePattern",
    adultOnly : "adultOnly",
    noNegate : "noNegate",
}
const errorFile = fetch(new Request('./errors_FR.json')).then((response) => {
    return response.json();
});


class Form {
    inputList;
    submitButton;
    errors;

    constructor(submit) {
        console.log('constructor');
        this.inputList = new Array();
        this.submitButton = submit;
        this.submitButton.addEventListener('click', (e) => {this.submit(e)});
        errorFile.then(data => {
            this.errors = data;
        })
    }

    start(formData) {
        formData.forEach(data => {
            let conditions = this.errors[data.querySelector('input').id];
            this.inputList.push(new Input(data.querySelector('input').id, data, conditions));
        });
    }

    stop() {

    }

    submit(e) {
        let validity = true;
        this.inputList.forEach(value => {
            validity = value.checkValidity() && validity;
        })
        e.preventDefault();
        this.globalErrorMessage(validity);
        if(validity) {
            this.validationView();
        }
    }

    validationView() {
        let formView = document.querySelector('form');
        let validView = document.getElementsByClassName('validation-view')[0];
        formView.classList.add('display-none');
        validView.classList.remove('display-none');
        
    }

    globalErrorMessage(bool) {
        let globalError = document.getElementsByClassName('global-error')[0];
        if(bool) {
            globalError.classList.add('display-none');
        } else {
            globalError.classList.remove('display-none');
        }
    }
    
}
