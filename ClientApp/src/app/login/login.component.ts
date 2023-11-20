import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = 'app';
  registerForm: any = FormGroup;
  submitted = false;
  User: AdmUser = {
      EmailAddress: '',
      Password: ''
  };
  constructor(private formBuilder: FormBuilder, private router: Router, private readonly http: HttpClient) { }
  //Add user form actions
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^[0-9]{4,8}$")]]
    });
  }

  onSubmit() {
    this.submitted = true;
    debugger
    //const headers : HttpHeaders = new HttpHeaders().append('Content-Type', 'application/json');
    //const params: HttpParams = new HttpParams().set('objAdmUser', JSON.stringify( this.User));
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else if (this.submitted) { //True if all the fields are filled
      this.http.post<any>('http://localhost:5118/api/' + 'loginapi/Post', this.User).subscribe({
        next: (result: any) => {
          if (result) {
            this.router.navigate(['/home']);
          }
          else {
            alert('Invalid credentials !!');
          }
        },
        error: (error: any) => {
          console.error(error)
        }
      });
    }
  }
}

export interface AdmUser {
  EmailAddress: string;
  Password: string;
}
