import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs/operators';

import { PoolRequestControllerService } from './shared/backend/api/poolRequestController.service';
import { PoolRequestWithRelations } from './shared/backend/model/poolRequestWithRelations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'PR List Manager';
  public loading: boolean;
  public poolRequestWithRelationss: PoolRequestWithRelations[] = [];
  public user: any;
  public users: any[] = [];
  public selectedUser: any = null;
  public event: LazyLoadEvent;
  public top: number = 100;
  public page: number = 0;
  public skip: number;
  
  constructor(private poolRequestControllerService: PoolRequestControllerService) {
    this.getUsers(); 
    this.getPRs(); 
  }

  private getUsers() {
    this.users.push(
      {name: "All users", username: ""},
      {name: "Miguel Salinas", username: "masalinas@bilbomatica.es"},
      {name: "Daniel Toro", username: "dtoro@bilbomatica.es"},
      {name: "Jaime Rivero", username: "jrivero@gloin.es"},
      {name: "Fernando Fernández Rivero", username: "ffernandez@gloin.es"},
      {name: "Jacob Uribe Ais", username: "juribe@bilbomatica.es"},
      {name: "Jose Dávila", username: "jadavila@gloin.es"},
      {name: "Jose Jurado", username: "jose.jurado@twtspain.com"},
      {name: "Fernando Pulido", username: "fpulido@gloin.es"},
      {name: "Ricardo", username: "rflores@gloin.es"},
      {name: "Cristian David Franco Garcia ", username: "cdfranco@bilbomatica.es"},
      {name: "Ainara Arizaga Beistegi", username: "aarizaga@bilbomatica.es"},
      {name: "Carlos Rodríguez", username: "carlos.rodriguez@gloin.es"},
      {name: "Cristian Gonzalo Giraldo Zúñiga", username: "cggiraldo@bilbomatica.es"},
      {name: "Jonathan Patiño Rico", username: "jpatino@bilbomatica.es"}      
    );
  }  

  public onRefresh() {
    this.getPRs();
  }

  public onPreviousPage() {
    if (this.page > 0)
      this.page = this.page - 1;

    this.getPRs();
  }

  public onNextPage() {
    this.page = this.page + 1;

    this.getPRs();
  }

  public onUserChange(user: any) {
    this.page = 0;
    this.user = user;

    this.getPRs();
  }

  private getPRs() {
    this.loading = true;
    let username: string;

    if (this.user)
      username = this.user.username;
    
    this.skip = this.page * this.top;

    this.poolRequestControllerService.poolRequestControllerFindById(this.skip.toString(), this.top.toString(), username).pipe(map((datum) => datum.map((poolRequestWithRelations: any) => {
      if (poolRequestWithRelations.closedDate != undefined)
        poolRequestWithRelations.closedDate = new Date(poolRequestWithRelations.closedDate);

      if (poolRequestWithRelations.targetRefName != undefined) {
        let tokens: string[] = poolRequestWithRelations.targetRefName.split('/');
        poolRequestWithRelations.targetRefName = tokens[tokens.length - 1];
      }

      if (poolRequestWithRelations.sourceRefName != undefined) {
        let tokens: string[] = poolRequestWithRelations.sourceRefName.split('/');
        poolRequestWithRelations.sourceRefName = tokens[tokens.length - 1];
      }

      return poolRequestWithRelations;
    }))).subscribe((poolRequestWithRelationss: any) => {
        this.poolRequestWithRelationss = poolRequestWithRelationss;

        this.loading = false;
    },
    err => {
      console.log(err);
      
      this.loading = false;
    });
  }
}
