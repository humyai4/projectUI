import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { count } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { type } from 'jquery';

@Component({
  selector: 'app-fine-band',
  templateUrl: './fine-band.component.html',
  styleUrls: ['./fine-band.component.css'],
})

export class FineBandComponent implements OnInit {
  public id:any;
  public readstatus: any;
  searchData: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  confirmChoose(content:any) {
    this.modalService.open(content);
  }
  findband: any[] = [];
  
  getBjIdByEmpId: any[] = [];
  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    count 
    this.http
      .get<any[]>('http://180.183.246.177:1114/brandjob/job')
      .subscribe((response) => {
        this.findband = response;
        console.log()
      });
      //callApiByEmpId for get BJId
      this.http
      .get<any[]>(`http://180.183.246.177:1114/choose/choosebandid?emp=${this.id}`)
      .subscribe((response) => {
        this.getBjIdByEmpId = response;
      });
    
  }
  chooseBandForm: FormGroup = this.fb.group({
    bjId: [''],
    empId: [''],
    userId: [''],
  });
  get userId(): any {
    return this.chooseBandForm.get('userId');
  }
  get bjId(): any {
    return this.chooseBandForm.get('bjId');
  }
  get empId(): any {
    return this.chooseBandForm.get('empId');
  }

  key: string = 'bjId';
  reverse : boolean = false;
  sort(key : any){
    this.key= key;
    this.reverse = !this.reverse;
  }
  

  isToggleButton(a:any): Boolean {
    let isToggle:Boolean = true
    this.getBjIdByEmpId.filter((i) => {
      if (a.value == i.bjId) {
              isToggle = false
      }
    })
    return isToggle
  }

  chooseBand(bjIds:any): void {
    this.id = localStorage.getItem("id")
    const chooseBandForm = new FormData();
    chooseBandForm.append('empId',this.id);
    chooseBandForm.append('bjId', bjIds.value);
    let url = 'http://180.183.246.177:1114/choose/createorder';
    this.http
      .post(url, chooseBandForm)
      .toPromise()
      .then((data: any) => {
        console.log(Math);
        window.location.reload();
      });
  }

  noti(userIds:any): void {
    this.id = localStorage.getItem("id")
    this.readstatus = '1';
    const chooseBandForm = new FormData();
    chooseBandForm.append('descrip','สนใจงานลงที่คุณประกาศไว้')
    chooseBandForm.append('readstatus',this.readstatus);
    chooseBandForm.append('userIdTo',userIds.value);
    chooseBandForm.append('userIdForm',this.id);
    let notiurl = 'http://180.183.246.177:1114/noti/createnoti';
    this.http
      .post(notiurl,chooseBandForm)
      .toPromise()
      .then((data: any) => {
        console.log(userIds.value);
            });
  }


  createForm : FormGroup = this.fb.group({
    bjName  : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    jobPrice : ['',[Validators.required]],
    memSize : ['',[Validators.required]],
    jobType : ['',[Validators.required]],
    description : [''],
  });


  create():void{
    const bandcreateForm = new FormData();
    const formData = this.createForm.value;
    this.id = localStorage.getItem("id")
    let url = 'http://180.183.246.177:1114/brandjob/jobcreate';
    bandcreateForm.append('userId',this.id)
    bandcreateForm.append('bjName',formData.bjName)
    bandcreateForm.append('jobPrice',formData.jobPrice)
    bandcreateForm.append('memSize',formData.memSize)
    bandcreateForm.append('jobType',formData.jobType)
    bandcreateForm.append('description',formData.description)
    this.http.post(url,bandcreateForm)
    .toPromise().then((data: any) => {
      if(data.status = 1){
        alert(data.message)
        window.location.reload();
      } else {
        alert(data.message)
      }
      console.log()
    })
  }

}
