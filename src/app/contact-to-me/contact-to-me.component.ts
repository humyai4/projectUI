import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { forkJoin, observable , Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-to-me',
  templateUrl: './contact-to-me.component.html',
  styleUrls: ['./contact-to-me.component.css']
})
export class ContactToMeComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getcontactOrder()
  }

  getcontactOrder(): void {
    const userid = localStorage.getItem("id")
    let url = `http://180.183.246.177:1114/choose/choosebanduserid?userid=${userid}`;
    this.http.get<any[]>(url)
      .subscribe((response) => {
        const contactmeId = response.map(item => ({ job: item.bjId, id: item.empId }))
        this.joinBjAndEmpId(contactmeId);
      })
  }

  contactmeArray: any[] = [];
  joinBjAndEmpId(contactmeId: any[]): void {
    const observables: Observable<any>[] = [];
  
    for (const valBjid of contactmeId) {
      const url = `http://180.183.246.177:1114/brandjob/jobid?job=${valBjid.job}`;
      const url2 = `http://180.183.246.177:1114/user/userid?user=${valBjid.id}`;
  
      // สร้าง Observable สำหรับแต่ละ URL
      const observable1 = this.http.get<any[]>(url);
      const observable2 = this.http.get<any[]>(url2);
  
      // mergeMap ให้แต่ละ Observable รองรับและรวมผลลัพธ์
      const combinedObservable = observable1.pipe(
        mergeMap(response1 => observable2.pipe(
          map(response2 => ({ response1, response2 }))
        ))
      );
      observables.push(combinedObservable);
    }
  
    forkJoin(observables).subscribe((responses) => {
      // responses จะเป็น array ของ objects ที่มีข้อมูลจากทั้งสอง URL
      this.contactmeArray = responses;
      console.log(contactmeId)
    });
    
  }

}