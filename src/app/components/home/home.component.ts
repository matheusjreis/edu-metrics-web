import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SystemModule } from 'src/app/interfaces/systemModule';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // template: `<div>
  //               <section class="listing">
  //                   <h2 class="listing-heading">Escalonador</h2>
  //                   <h2 class="listing-heading">Gerenciador de memória</h2>
  //               </section>
  //             </div>`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  moduleList: SystemModule[] = [];

  constructor(private router: Router) { 
    // this.moduleList = [{
    //   name : "Escalonador",
    //   id : 1
    // },
    // {
    //   name : "Gerenciador de memória",
    //   id : 2
    // }];
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  @Input() systemModule!: SystemModule;
}
