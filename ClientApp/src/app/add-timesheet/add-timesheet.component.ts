import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css']
})
export class AddTimesheetComponent {
  objDOHome !: Home;
  objAttendance: Attendance = {};
  IsEdit: boolean = false;
  TrnAttendanceDetailId: number = 0;
  AttendanceDate: any;
  constructor(private readonly http: HttpClient, private router: Router) { }

  ngOnInit() {
    debugger
    if (this.objAttendance && history.state) {
      this.objAttendance.TrnAttendanceDetailId = this.TrnAttendanceDetailId = history.state['TrnAttendanceDetailId'];
      this.IsEdit = history.state['IsEdit'];
    }
    if (this.IsEdit) {
      let params = new HttpParams();
      params = params.append('TrnAttendanceDetailId', this.TrnAttendanceDetailId);
      params = params.append('IsEdit', this.IsEdit);
      this.http.get<any>('http://localhost:5118/api/' + 'attendanceapi/Get', { params: params }).subscribe({
        next: (result: any) => {
          debugger;
          this.objDOHome = result;
          if (this.objDOHome.LstAttendance && this.objDOHome.LstAttendance.length > 0) {
            this.objAttendance.TrnAttendanceDetailId = this.objDOHome.LstAttendance[0].TrnAttendanceDetailId;
            this.objAttendance.AttendanceDate = this.objDOHome.LstAttendance[0].AttendanceDate;
            this.objAttendance.AttendanceDate = new Date(new Date(this.objAttendance.AttendanceDate).setTime(new Date(this.objAttendance.AttendanceDate).getTime() + (3 * 60 * 60 * 1000)));
            this.objAttendance.AttendanceDate = new Date(this.objAttendance.AttendanceDate).toISOString().substring(0, 10);
            this.objAttendance.LoggedInTime = new Date(new Date(this.objDOHome.LstAttendance[0].LoggedInTime).setTime(new Date(this.objDOHome.LstAttendance[0].LoggedInTime).getTime() + (3 * 60 * 60 * 1000)));
            this.objAttendance.LoggedInTime = new Date(this.objAttendance.LoggedInTime).toISOString().substring(16, 11);
            this.objAttendance.LoggedOutTime = new Date(new Date(this.objDOHome.LstAttendance[0].LoggedOutTime).setTime(new Date(this.objDOHome.LstAttendance[0].LoggedOutTime).getTime() + (3 * 60 * 60 * 1000)));
            this.objAttendance.LoggedOutTime = new Date(this.objAttendance.LoggedOutTime).toISOString().substring(16, 11);
            this.objAttendance.Activity = this.objDOHome.LstAttendance[0].Activity;
          }
        },
        error: (error: any) => {
          debugger;
          console.error(error)
        }
      });
    }
    else {
      this.http.get<any>('http://localhost:5118/api/' + 'attendanceapi/Get').subscribe({
        next: (result: any) => {
          debugger;
          this.objDOHome = result;
        },
        error: (error: any) => {
          debugger;
          console.error(error)
        }
      });
    }
  }

  fnAdd() {
    debugger
    this.http.post<any>('http://localhost:5118/api/' + 'attendanceapi/Post', this.objAttendance).subscribe({
      next: (result: any) => {
        if (result) {
          alert('Data added successfully !!');
        }
        else {
          alert('Something went wrong !!');
        }
      },
      error: (error: any) => {
        alert('Something went wrong !!');
      }
    });
  }

  fnEdit() {
    debugger
    this.http.put<any>('http://localhost:5118/api/' + 'attendanceapi/Put', this.objAttendance).subscribe({
      next: (result: any) => {
        if (result) {
          alert('Data updated successfully !!');
        }
        else {
          alert('Something went wrong !!');
        }
      },
      error: (error: any) => {
        alert('Something went wrong !!');
      }
    });
  }

  fnCancel() {
    this.router.navigate(['/home']);
  }

  fnAddHours(date :any) {

  }
}

export interface Attendance {
  TrnAttendanceDetailId? : number
  AttendanceDate?: any;
  LoggedInTime?: any;
  LoggedOutTime?: any;
  Activity?: string;
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
  LstAttendance?:
  [{
    TrnAttendanceDetailId: number,
    AttendanceDate: any,
    LoggedInTime: any,
    LoggedOutTime: any,
    Activity?: string
  }];
}
