import { LightningElement,wire ,track} from "lwc";
import getAccountList from '@salesforce/apex/LWCLightningDataTable_Cntrl.fetchAccountDetails';

const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Industry", fieldName: "Industry" }
];

export default class LightningDatatable extends LightningElement {
  @track columns = columns;
  @track data = [];
  //@wire property to call apex 
  @wire(getAccountList) accounts({ error, data }) {
    if (data) {
      this.data = data
        console.log(JSON.parse(JSON.stringify(data)))
    }
    else if (error) {
        console.log(error)
    }
}
}