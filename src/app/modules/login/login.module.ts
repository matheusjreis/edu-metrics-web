import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CpuManagerRoutingModule } from './login-routing.module';


@NgModule({
  imports: [CommonModule, CpuManagerRoutingModule],
  declarations: [LoginComponent],
})
export class CpuManagerModule {}
