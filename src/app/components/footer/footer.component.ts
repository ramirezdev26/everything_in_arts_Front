import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  emailField: UntypedFormControl;

  constructor(){
    this.emailField = new UntypedFormControl('', [
      Validators.required,
      Validators.email
    ]);
  }

  sendMail() {
    if (this.emailField.valid) {
      console.log(this.emailField.value);
    }
  }

}
