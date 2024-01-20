import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-band-page',
  templateUrl: './band-page.component.html',
  styleUrls: ['./band-page.component.css']
})
export class BandPageComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.clearBj()
  }

  clearBj() : void {
    let url1 = 'http://180.183.246.177:1114/choose/chooseband'
    this.http.get<any[]>(url1).subscribe((response) => {
      console.log(response)
    })
  }

}
