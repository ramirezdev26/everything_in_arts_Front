import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
    confirmPassword: ['', [Validators.required]],
    type: ['company', [Validators.required]],
    companyName: ['', [Validators.required]],
  }, {
    validators: MyValidators.matchPasswords
  });;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }


  register(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser(value.email, value.password)
      .then(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]],
    }, {
      validators: MyValidators.matchPasswords
    });

    this.typeField!.valueChanges
    .subscribe(value => {
      if (value === 'company') {
        this.companyNameField!.setValidators([Validators.required]);
      } else {
        this.companyNameField!.setValidators(null);
      }
      this.companyNameField!.updateValueAndValidity();
    });
  }

  get typeField() {
    return this.form.get('type');
  }

  get companyNameField() {
    return this.form.get('companyName');
  }

}
