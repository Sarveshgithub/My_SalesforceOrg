import { LightningElement, track } from 'lwc';

export default class Lwc_OnchangeEvent extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    handleChange(event) {
        const field = event.target.name;
        if(field === 'firstName'){
            this.firstName = event.target.value;
        }
        if(field === 'lastName'){
            this.lastName = event.target.value;
        }
    }
}