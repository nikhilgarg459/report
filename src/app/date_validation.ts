import {AbstractControl} from '@angular/forms';
export class DateValidation {

    static CheckDate(AC: AbstractControl) {
       let date_start = AC.get('date_start').value; // to get value in input tag
       let date_end = AC.get('date_end').value; // to get value in input tag
        if(date_end < date_start) {
            console.log('false');
            AC.get('date_end').setErrors( {invalidDate: true} )
        } else {
            console.log('true');
            return null
        }
    }
}