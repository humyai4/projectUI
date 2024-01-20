import { Component, Input, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { HttpClient } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-band-detail-page',
  templateUrl: './band-detail-page.component.html',
  styleUrls: ['./band-detail-page.component.css']
})
export class BandDetailPageComponent implements OnInit {
  constructor(
    private localStore: LocalService,
    private http: HttpClient,
    private modalService: NgbModal,


  ) {
    
  }

  ngOnInit(): void {
    this.id()
    this.getBj()  
    this.getChoosebandid()  
  }

  codeId:any
  id():void{
    this.codeId = this.localStore.getData('codeId');
    console.log()
  }



  userName : any = '';
  BjDetail : any = '';
  getBj():void{
    let url = `http://180.183.246.177:1114/brandjob/jobid?job=${this.codeId}`
    this.http.get(url)
    .subscribe((respone) =>{
      this.BjDetail = respone
      let userUrl = `http://180.183.246.177:1114/user/userid?user=${this.BjDetail.userId}`
      this.http.get(userUrl)
      .subscribe((respone2) => {
        this.userName = respone2
        console.log()
      })

    })
  }


  confirmChoose(content:any) {
    this.modalService.open(content);
  }

  empId:any 
  chooseBand(bjIds:any): void {
    this.empId = localStorage.getItem("id")
    const chooseBandForm = new FormData();
    chooseBandForm.append('empId',this.empId);
    chooseBandForm.append('bjId', this.codeId);
    let url = 'http://180.183.246.177:1114/choose/createorder';
    console.log('สนใจ')
    this.http
      .post(url, chooseBandForm)
      .toPromise()
      .then((data: any) => {
        console.log(Math);
        window.location.reload();
      });
  }


  noti(userIds:any): void {
    this.empId = localStorage.getItem("id")
    let readstatus = '1';
    const chooseBandForm = new FormData();
    chooseBandForm.append('descrip','สนใจงานลงที่คุณประกาศไว้')
    chooseBandForm.append('readstatus',readstatus);
    chooseBandForm.append('userIdTo',userIds.value);
    chooseBandForm.append('userIdForm',this.empId);
    let notiurl = 'http://180.183.246.177:1114/noti/createnoti';
    this.http
      .post(notiurl,chooseBandForm)
      .toPromise()
      .then((data: any) => {
        console.log();
            });
  }


  getBjIdByEmpId: any[] = [];
  getChoosebandid():void{
    let id = localStorage.getItem('id')
    this.http
      .get<any[]>(`http://180.183.246.177:1114/choose/choosebandid?emp=${id}`)
      .subscribe((response) => {
        this.getBjIdByEmpId = response;
        console.log()
      });
  }

  ownerButton(userIds:any): Boolean{
    let ownerButton:Boolean 
    let id = localStorage.getItem('id')
    if(id == userIds.value){
      ownerButton = false
      console.log(userIds.value)
    } else {
      ownerButton = true
    }
    return ownerButton
    
  }

  isToggleButton(a:any): Boolean {
    let isToggle:Boolean = true
    this.getBjIdByEmpId.filter((i) => {
      if (a.value == i.bjId) {
              isToggle = false
              console.log()
      }
    })
    return isToggle
  }


  

}
