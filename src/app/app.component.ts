import { Component } from '@angular/core';
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
  public poolRequestWithRelationss: PoolRequestWithRelations[];

  constructor(private poolRequestControllerService: PoolRequestControllerService) {
    this.poolRequestControllerService.poolRequestControllerFind().pipe(map((datum) => datum.map((poolRequestWithRelations: any) => {
      if (poolRequestWithRelations.closedDate != undefined)
        poolRequestWithRelations.closedDate = new Date(poolRequestWithRelations.closedDate);

      return poolRequestWithRelations;
    }))).subscribe((poolRequestWithRelationss: any) => {
        this.poolRequestWithRelationss = poolRequestWithRelationss;

        //this.loadGrid(this.machines);
        this.loading = false;

        console.log(this.poolRequestWithRelationss);
    },
    err => {
      console.log(err);
      this.loading = false;
    });
  }
}
