import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidation } from './date_validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  show: string;
  rotateValue: string;
  pieAuto: boolean;
  pieClipped: boolean;

  testForm: FormGroup;

  name: string;
  value: number;
  start_date: string;
  end_date: string;
  form_submitted: boolean;

  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
    this.form_submitted = false;
    this.pieAuto = false;
    this.pieClipped = false;
    this.createForm();
  }

  createForm() {
    this.testForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern("[a-zA-Z ]*")]],
      value: ['', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern("[0-9]+")]],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required]
    }, {
        validator: DateValidation.CheckDate // your validation method
      });


    this.testForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }



  onValueChanged(data?: any) {
    if (!this.testForm) { return; }
    const form = this.testForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'value': '',
    'date_start': '',
    'date_end': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 6 characters long.',
      'maxlength': 'Name cannot be more than 15 characters long.',
      'pattern': 'Name should not contain any special characters or numbers.'
    },
    'value': {
      'required': 'Value is required.',
      'min': 'Minimum acceptable value is 1.',
      'max': 'Maximum acceptable value is 100.',
      'pattern': 'Only numerical values accepted.'
    },
    'date_start': {
      'required': 'Start Date is required.',
    },
    'date_end': {
      'required': 'End Date is required.',
      'invalidDate': 'End date should be greater than Start date.'
    },

  };

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    console.log(value, valid);
    this.name = this.testForm.get('name').value;
    this.value = this.testForm.get('value').value;
    this.start_date = this.testForm.get('date_start').value;
    this.end_date = this.testForm.get('date_end').value;
    this.form_submitted = true;
    let percentage = (360 * this.value) / 100;
    this.rotateValue = "rotate(" + percentage + "deg)";

    if (this.value > 50) {
      this.pieAuto = true;
      this.pieClipped = false;
      this.show = "block";
    }
    else {
      this.pieAuto = false;
      this.pieClipped = true;
      this.show = "none";
    }
  }

}
