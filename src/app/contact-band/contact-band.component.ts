import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
import { data } from 'jquery';


@Component({
  selector: 'app-contact-band',
  templateUrl: './contact-band.component.html',
  styleUrls: ['./contact-band.component.css']
})
export class ContactBandComponent implements OnInit {

  constructor(
    private localStore: LocalService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  confirmChoose(content: any) {
    this.modalService.open(content);
  }

  choosedband: any[] = [];

  ngOnInit(): void {
    const empid = localStorage.getItem("id")
    let url = `http://180.183.246.177:1114/choose/choosebandid?emp=${empid}`;
    this.http
      .get<any[]>(url)
      .subscribe((response) => {
        this.choosedband = response;
        const bjidArray = response.map(item => item.bjId);
        this.handleArray(bjidArray);
        // console.log(bjidArray)
      });


  }

  contactBand : any[] = [];
  handleArray(bjidArray: any[]): void {
    let observables = [];
    for (var val of bjidArray) {
      let url = `http://180.183.246.177:1114/brandjob/jobid?job=${val}`
      let observable = this.http.get<any[]>(url);
      observables.push(observable);
    }
    // ใช้ forkJoin เพื่อรวม Observables ทั้งหมด
    forkJoin(observables).subscribe((responses) => {
      this.contactBand = responses
      // console.log(this.contactBand);
      // responses คือ Array ที่มีข้อมูลทั้งหมดจาก HTTP requests
    });
  }
  detailBut(id: any): void {
    this.localStore.saveData('codeId', id);
    this.router.navigate(['/bandDetail']);
    // console.log()
  }

  chooseDelete(bandid : any): void {
    const chooseDeleteForm = new FormData
    chooseDeleteForm.append('id',bandid.value)
    console.log(this.contactBand)
    // const chooseDeleteForm = new FormData
    // chooseDeleteForm.append('id',bandid.value)
    // let url = `http://180.183.246.177:1114/choose/choosebandDelete`
    // this.http.post(url,chooseDeleteForm).toPromise().then((data:any) =>{
    //   console.log(data)
    // })
  }





  choosed: FormGroup = this.fb.group({

  })

}
