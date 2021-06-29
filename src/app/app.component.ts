import { Component } from '@angular/core';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { map } from 'rxjs/operators';

import { PoolRequestControllerService } from './shared/backend/api/poolRequestController.service';
import { User } from './shared/backend/model/user';
import { PoolRequestWithRelations } from './shared/backend/model/poolRequestWithRelations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'PR List Manager';
  public loading: boolean;
  public poolRequestWithRelationss: PoolRequestWithRelations[];
  public users: User[] = [];
  public selectedUser: User = null;

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
      {name: "Carlos  Rodríguez", username: "carlos.rodriguez@gloin.es"}
    );
  }  

  public onUserChange(user: User) {
    this.getPRs(user);
  }

  private getPRs(user?: User) {
    this.loading = true;
    let username: string;

    if (user)
      username = user.username;
    
    this.poolRequestControllerService.poolRequestControllerFindById(username).pipe(map((datum) => datum.map((poolRequestWithRelations: any) => {
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
