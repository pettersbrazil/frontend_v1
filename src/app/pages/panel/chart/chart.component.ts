import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/core/services/dash.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  pet: any;
  tutor: any;
  scanner: any;

  isAlert = true;
  isLoading: boolean = true;

  status!: string;
  message!: string;

  constructor(
    private dashService: DashService
  ) { }

  ngOnInit(): void {
    this.getTutors();
    this.getPets();
    this.getScanners();
  }

  private getTutors() {
    this.dashService.getTutors()
    .subscribe(
      (t: any) => {
        this.tutor = t.data;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getPets() {
    this.dashService.getPets()
    .subscribe(
      (p: any) => {
        this.pet = p.data;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getScanners() {
    this.dashService.getScanners()
    .subscribe(
      (s: any) => {
        this.scanner = s.data;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private alert(data: any) {
    this.isLoading = false;
    this.isAlert = true;
    this.status = data.status;
    this.message = data.message;
  }
}
