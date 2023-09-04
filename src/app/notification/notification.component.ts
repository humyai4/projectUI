import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public id:any;

  constructor(
    private http:HttpClient
  ) { }

  noti: any[] = [];
  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    const url = `http://180.183.246.177:1114/noti/getbyuserid?userid=${this.id}`;
    this.http.get<any[]>(url)
    .subscribe((response) => {
      this.noti = response;
      console.log(response);
    });
  }

}
