import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { UserService } from 'src/app/services/user.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { EducationLevel } from 'src/app/interfaces/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    education: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  educationLevels: EducationLevel[] | undefined;
  formGroup: FormGroup | undefined;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) { }

  get name() {
    return this.registerForm.controls['name'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get city() {
    return this.registerForm.controls['city'];
  }

  get country() {
    return this.registerForm.controls['country'];
  }

  get state() {
    return this.registerForm.controls['state'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  get education() {
    return this.registerForm.controls['education'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.userService.registerUser(postData as User).subscribe(
      response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Successo', detail: 'Registro realizado com sucesso!' });
        this.router.navigate(['login'])
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ops... Algo deu errado!' });
      }
    )
  }

  ngOnInit() {
    this.educationLevels = [
        { name: 'Aluno do ensino médio', code: 1 },
        { name: 'Aluno da Graduação', code: 2 },
        { name: 'Aluno da Pós-Graduação', code: 3 },
        { name: 'Professor', code: 4 }
    ];

    this.formGroup = new FormGroup({
        selectedEducation: new FormControl<EducationLevel | null>(null)
    });
  }

}
