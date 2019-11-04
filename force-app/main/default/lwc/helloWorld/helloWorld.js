import { LightningElement, track } from 'lwc';
export default class HelloWorld extends LightningElement {
    @track greeting = 'World';
    changeHandler(event) {
        this.greeting = event.target.value;
    }
    handleClick(event){
        console.log('test')
            const container = this.template.querySelector('.container');
            console.dir(container)
            container.innerHTML = '<lightning:input type="date" name="input1" label="Enter a date" />';
            // ... Do some logic with the container ...
          
    }
}