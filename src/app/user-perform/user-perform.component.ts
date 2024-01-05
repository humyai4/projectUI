import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-perform',
  templateUrl: './user-perform.component.html',
  styleUrls: ['./user-perform.component.css']
})
export class UserPerformComponent implements OnInit {

  constructor(
    private http: HttpClient,

  ) { }


  performList:any;
  ngOnInit(): void {
    const user = localStorage.getItem('id');
    let url = `http://180.183.246.177:1114/perform/performuser?user=${user}`;
    this.http.get(url).subscribe((response) => {
      this.performList = response;
      console.log()
    })
    }

  }

