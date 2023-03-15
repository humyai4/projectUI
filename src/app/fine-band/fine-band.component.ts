import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fine-band',
  templateUrl: './fine-band.component.html',
  styleUrls: ['./fine-band.component.css'],
})
export class FineBandComponent implements OnInit {
  public id:any;
  public readstatus: any;

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
  ngOnInit(): void {
    this.http
      .get<any[]>('http://180.183.246.177:1114/brandjob/job')
      .subscribe((response) => {
        this.findband = response;
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

}
