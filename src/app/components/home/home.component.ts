import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemModule } from 'src/app/interfaces/systemModule';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-home',
  template: `<body class="module-page">
  <div class="headbar">
      <div class="user-info">
          <div>Olá,<span id="userName">{{userInformations?.Name}}</span> </div> 
          <div class="user-photo">
              <img src="https://via.placeholder.com/150" alt="User Photo">
          </div>
      </div>
  </div>
  
  <p-card [style]="{ width: '560px' }" class="module-card">
      <header id="cpuHeader">
          <img alt="Card" src="../../../assets/images/cpu-logo.png" width="100px"/>
          <p>Módulos do sistema</p>
        </header>
      <section class="listing">
          <a class="listing-heading-item" href="https://www.facom.ufu.br/~thiago/simulateOS/">Escalonador de Processos</a>
          <a class="listing-heading-item" href="https://www.facom.ufu.br/~thiago/memory/" >Gerenciador de memória</a>
          <a class="listing-heading-item" href="https://www.facom.ufu.br/~thiago/filesystem" >Sistemas de arquivos</a>
          <a class="listing-heading-item" href="https://www.facom.ufu.br/~thiago/deadlock/" >Threads</a>
      </section>
  </p-card>
</body>`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInformations: User | null;

  constructor(private router: Router,
              private userService: UserService) { 
                this.userInformations = null;
  }

  ngOnInit(): void {
    this.userInformations =  this.userService.getUserInformationOnLocalStorage();
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  @Input() systemModule!: SystemModule;
}
