import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private readonly http: HttpClient, private router: Router) {

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  SignOut() {
    this.http.post<any>('http://localhost:5118/api/' + 'loginapi/PostSignOut',null).subscribe({
      next: (result: any) => {
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error(error)
      }
    });
  }
}
