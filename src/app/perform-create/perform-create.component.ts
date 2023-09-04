import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-perform-create',
  templateUrl: './perform-create.component.html',
  styleUrls: ['./perform-create.component.css']
})
export class PerformCreateComponent implements OnInit {
  public userId:any;

  constructor(
    private localStore: LocalService,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  
  ngOnInit(): void {
    this.getPerformList()
    this.getImgList()
  }

  
  performForm : FormGroup = this.fb.group({
    performName: ['test',[Validators.required]],
    performDescrips: ['test'],
    // performImg:[''],
    // performUser : ['']
  })





  sereal : any
  savePerform(): void{
    this.sereal =  Math.floor((Math.random()*100000000+1))
    this.userId = localStorage.getItem("id")
    const formData = this.performForm.value;
    const perform = new FormData();
    perform.append('performName',formData.performName);
    perform.append('performDescrips',formData.performDescrips);
    perform.append('performImg',this.sereal);
    perform.append('performUser',this.userId)
    let url = `http://180.183.246.177:1114/perform/performupdate`
    this.http.post(url,perform)
    .toPromise()
    .then((respon: any)=>{
      console.log(formData)
    })
    console.log(this.sereal,this.userId)
  }

  imgList:any[] = [];
  getImgList(): void{
    this.http.get<any[]>(`http://180.183.246.177:1114/image/img`)
    .subscribe((respone) => {
      this.imgList = respone
      console.log(respone)
    })
  }

  performList:any[] = [];
  getPerformList(): void{
    this.http
    .get<any[]>(`http://180.183.246.177:1114/perform/perform`)
    .subscribe((response) => {
      this.performList = response
      console.log(response);
    })
  }

}
