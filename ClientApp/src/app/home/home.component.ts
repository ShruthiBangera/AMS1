import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Data, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  objDOHome!: Home ;
  //searchForm: any = FormGroup;
  //get f() { return this.searchForm.controls; }
  constructor(private readonly http: HttpClient, private router: Router) {
    
  }

  ngOnInit() {
    this.fnSearch(new Date().getMonth() + 1);
  }

  fnSearch(month :any) {
    let searchParams = new HttpParams().set("MonthNum", month);
    this.http.get<any>('http://localhost:5118/api/' + 'homeapi', { params: searchParams }).subscribe({
      next: (result: any) => {
        this.objDOHome = result;
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }

  fnReset() {
    this.objDOHome.MonthNum = 0;
  }

  fnAdd() {
    this.router.navigate(['/add-timesheet']);
    //const navigationExtras: NavigationExtras = {
    //  state: { TrnAttendanceDetailId: 6, IsEdit: true },
    //};
    //this.router.navigate(['/add-timesheet'], navigationExtras);
  }

  fnEdit(TrnAttendanceDetailId:any) {
    const navigationExtras: NavigationExtras = {
      state: { TrnAttendanceDetailId: TrnAttendanceDetailId, IsEdit : true },
    };
    this.router.navigate(['/add-timesheet'], navigationExtras);
  }

  fnDelete(TrnAttendanceDetailId: any) {
    debugger
    if (confirm("Are you sure to delete record ?")) {
      let deleteParams = new HttpParams().set("TrnAttendanceDetailId", TrnAttendanceDetailId);
      this.http.delete<any>('http://localhost:5118/api/' + 'attendanceapi/Delete', { params: deleteParams }).subscribe({
        next: (result: any) => {
          debugger
          if (result) {
            alert("Record deleted successfully !!")
          }
        },
        error: (error: any) => {
          console.error(error)
        }
      });
    }
    else {
      return;
    }
  }
}

export interface Home {
  AdmUserId?: number; 
  AdmVendorId?: number;
  ProjectName?: string;
  AdmProjectManagerId?: number;
  MonthNum: number;
  LstMonths?:
  [{
    MonthNum?: number,
    Month?: string
  }];
  LstVendor?:
  [{
    AdmVendorId?: number,
    VendorName?: string
  }];
  LstProjectManager?:
  [{
    AdmProjectManagerId?: number,
    ProjectManagerName?: string
  }];
  LstAttendanceDetails?:
  [{
    TrnAttendanceDetailId?: number,
    AttendanceDateStr?: string,
    LoggedInTimeStr?: string,
    LoggedOutTimeStr?: string,
    Activity?: string
  }];
}


