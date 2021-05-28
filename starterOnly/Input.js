const REGEX_DATE = '[0-9]{2}\-[0-9]{2}\-[0-9]{4}';
const REGEX_EMAIL = '[A-Za-z0-9]{2,}\@[A-Za-z0-9]{2,}\.[A-Za-z]{2,}';
// const REGEX_EMAIL = '[A-Za-z0-9]';
class Input {
    id
    inputDiv;
    inputElement;
    errorMessage;
    list = false;
    conditions;

    constructor(id, data, conditions) {
        this.id = id;
        this.inputDiv = data;
        let inputs = data.getElementsByTagName('input');
        if(inputs.length > 1) {
            this.list = true;
            this.inputElement = Array.from(inputs);
        }
        else this.inputElement = inputs.item(0);
        this.conditions = conditions;
        if(!this.list) {
            this.inputElement.addEventListener('input', (event) => {this.checkValidity()});
            this.inputElement.addEventListener('change', (event) => {this.checkValidity()});
        } else {
            this.inputElement.forEach((inputs) => {
                inputs.addEventListener('change', (e) => {this.checkValidity()});
            })
        }
        this.errorMessage = document.createElement('label');
        this.errorMessage.classList.add('error-message');
        this.inputDiv.appendChild(this.errorMessage);
    }

    checkValidity() {
        for(const key in this.conditions) {
            switch(key) {
                case conditionList.required :
                    let nullInput = true;
                    if(this.list) {
                        this.inputElement.forEach(input => {
                            if(input.checked) {
                                nullInput = false;
                                return false;
                            }
                        });
                    } else {
                        if(this.inputElement.type == 'checkbox'
                            ?this.inputElement.checked
                            :this.inputElement.value )
                            nullInput = false;
                    }
                    if(nullInput) {
                        this.showError(this.conditions[key]);
                        return false;
                    }
                    break;
                case conditionList.twoChar :
                    if(this.inputElement.value.length < 2) {
                        this.showError(this.conditions[key]);
                        return false;
                    }
                    break;
                case conditionList.emailPattern :
                    if(!this.inputElement.value.match(REGEX_EMAIL)) {
                        this.showError(this.conditions[key]);
                        return false;
                    }
                    break;
                case conditionList.datePattern :
                    if(!this.inputElement.value.match(REGEX_DATE)) {
                        this.showError(this.conditions[key]);
                    }
                    break;
                case conditionList.adultOnly :
                    const date = new Date(Date.now());
                    let dateValue = this.inputElement.value;
                    let year = dateValue.substr(0, 4);
                    if(year < date.getFullYear() - 18) break;
                    else if(year > date.getFullYear() - 18) {
                        this.showError(this.conditions[key]);
                        return false;
                    } else {
                        let month = dateValue.substr(dateValue.indexOf('-') + 1, 2);
                        if(month < date.getMonth()+1) break;
                        else if(month > date.getMonth()+1) {
                            this.showError(this.conditions[key]);
                            return false;
                        } else {
                            let day = dateValue.substr(dateValue.lastIndexOf('-') + 1);
                            if(day <= date.getDate()) break;
                            else {
                                this.showError(this.conditions[key]);
                                return false;
                            }
                        }
                    }
                    break;
                case conditionList.noNegate :
                    if(parseInt(this.inputElement.value) < 0) {
                        this.showError(this.conditions[key]);
                        return false;
                    }
            }
        }
        this.showError('');
        return true;
        // if(!this.list) this.inputElement.setCustomValidity('');
    }

    consoleLog() {
        console.log(this.inputDiv);
    }

    showError(conditon) {
        this.errorMessage.innerHTML = conditon;
        if(!this.list) this.inputElement.setCustomValidity(conditon);
    }
}