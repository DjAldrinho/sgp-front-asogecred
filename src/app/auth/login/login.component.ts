import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loading: boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    const body = document.querySelector('body');
    body.removeAttribute('class');
    body.removeAttribute('id');
    body.setAttribute('class', 'background no-footer ltr rounded');
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', [Validators.required]]
    });
  }

  // isInvalidField(field: string): boolean{
  //   const validatedField = this.loginForm.get(field);
  //   return (!validatedField.valid && validatedField.touched)
  //   ? true : false;
  // }

  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.userService.login(this.loginForm.value)
        .subscribe(resp => {
          this.loading = false;
          // navegar al dashboard
          this.router.navigateByUrl('/');
        }, (err) => {
          this.loading = false;
          Swal.fire('Error', 'Usuario o contraseña invalido', 'error');
        });
    }
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.loginForm.get('email');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.loginForm.get('password');
  }

}
