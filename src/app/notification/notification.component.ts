import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count } from 'rxjs';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public id: any;

  constructor(
    private http: HttpClient
  ) { }



  ngOnInit(): void {
this.getNoti()
this.getUserName()
// this.getUser()
  }


  userIdForm: any[] = [];
  userId: any[] = []
  noti: any[] = [];
  user:any = ''
  IdToUser: any[] = []
  


  getUserName() : void{
    // const url =`http://180.183.246.177:1114/user/userid?user=${this.userIdForm}`
    // console.log(url,'....')
  }


  getNoti(): void {
    this.id = localStorage.getItem("id")
    const url = `http://180.183.246.177:1114/noti/getbyuserid?userid=${this.id}`;
    this.http.get<any[]>(url)
      .subscribe((response) => {
        this.noti = response;
        this.noti.filter((i) => {
          this.userIdForm = i.userIdForm
          console.log(this.userIdForm,this.user)
          const url =`http://180.183.246.177:1114/user/userid?user=${this.userIdForm}`
          this.http.get<any>(url)
          .subscribe((res) =>{
            this.user = res;
            // console.log(this.user)
          })
          
        })
      })
  };
}
