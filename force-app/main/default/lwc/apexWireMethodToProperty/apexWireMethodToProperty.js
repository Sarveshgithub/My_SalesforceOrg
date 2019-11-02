// Added in Account Record Detail Page
import { LightningElement, wire, track } from 'lwc';
import getAccountRelatedContact from '@salesforce/apex/ContactController.getAccountRelatedContact';

export default class ApexWireMethodToProperty extends LightningElement {
    @track conData;
    @wire(getAccountRelatedContact) accounts({ error, data }) {
        if (data) {
            console.log(data)
        }
        else if (error) {
            console.log(error)
        }
    }
}