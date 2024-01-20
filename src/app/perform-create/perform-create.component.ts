import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalService } from '../local.service';
import { event } from 'jquery';

@Component({
  selector: 'app-perform-create',
  templateUrl: './perform-create.component.html',
  styleUrls: ['./perform-create.component.css']
})
export class PerformCreateComponent implements OnInit {
  public userId: any;



  constructor(
    private localStore: LocalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  
  urls :any [] = [];
  onselect(e : any){
    if(e.target.files){
      for(let i=0; i<e.target.files.length; i++){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events : any) => {
          this.urls.push(events.target.result);
          console.log(this.urls)
        }
      }
    }

  }


 

  
  ngOnInit(): void {
    let imagesArray = []
    const input = document.querySelector("input")
    const output = document.querySelector("output")
    this.getPerformList()
    this.getImgList()
    
  }


  performForm: FormGroup = this.fb.group({
    performName: ['', [Validators.required]],
    performDescrips: [''],
    picture:[''],
  })


  imgList: any[] = [];
  getImgList(): void {
    this.http.get<any[]>(`http://180.183.246.177:1114/image/img`)
      .subscribe((respone) => {
        this.imgList = respone
        console.log()
      })
  }

  performList: any[] = [];
  getPerformList(): void {
    this.http
      .get<any[]>(`http://180.183.246.177:1114/perform/perform`)
      .subscribe((response) => {
        this.performList = response
        console.log();
      })
  }

  serealTest: any;
  savePerform(): void {
    const performImgValues = new FormData();
    let url = `http://180.183.246.177:1114/perform/checkPerform`;
    this.serealTest = Math.floor((Math.random()) * 1000000 + 1);
    performImgValues.append("performImg", this.serealTest)
    console.log(this.serealTest)
    this.http
      .post(url, performImgValues)
      .subscribe((performRes: any) => {
        console.log()
        if (performRes.status == 2) {
          console.log('ไม่ซ้ำ')
          this.userId = localStorage.getItem("id")
          let url = `http://180.183.246.177:1114/perform/performupdate`
          const formData = this.performForm.value;
          const perform = new FormData();
          perform.append('performName', formData.performName);
          perform.append('performDescrips', formData.performDescrips);
          perform.append('performImg', this.serealTest);
          perform.append('performUser', this.userId)
          this.http.post(url, perform)
            .toPromise()
            .then((respon: any) => {
              console.log(formData)
            })
        } else {
          console.log("ซ้ำ")
          this.savePerform()
        } 
      }

      )
  }

}
