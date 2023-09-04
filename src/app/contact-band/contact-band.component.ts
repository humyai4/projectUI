import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contact-band',
  templateUrl: './contact-band.component.html',
  styleUrls: ['./contact-band.component.css']
})
export class ContactBandComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }
  confirmChoose(content:any) {
    this.modalService.open(content);
  }
  
  choosedband:any[] = [];

  ngOnInit(): void {
    const empid = localStorage.getItem("id")
    let url =`http://180.183.246.177:1114/choose/choosebandid?emp=${empid}`;
    this.http
    .get<any[]>(url)
    .subscribe((response) => {
      this.choosedband = response;
      const bjidArray = response.map(item => item.bjId);
      this.handleArray(bjidArray);
      console.log(this.choosedband,bjidArray)
    });


  }
  handleArray(bjidArray:any[]):void{
    let url = `http://180.183.246.177:1114/brandjob/jobid?job=${bjidArray.join(',')}`
    this.http
    .get<any[]>(url)
    .subscribe((response) =>{
       console.log(response)
    });
    console.log(bjidArray,)

    
    // const productIds = [1, 2, 3, 4, 5];
    // const queryString = productIds.map(id => `id=${id}`).join('&');
    
    // this.http.get(`https://example.com/api/products?${queryString}`)
    //   .subscribe(response => {
    //     console.log(response);
    //   });

    // const params : any = new URLSearchParams
    // const queryString = bjidArray.map(job => `job=${job}`).join('&');
    // bjidArray.forEach(param => params.append('job', param.toString()));
    // let url = `http://180.183.246.177:1114/brandjob/jobid?${queryString}`;
    // this.http.get<any[]>(url)
    // .subscribe((response) => {
    //   console.log(response)
    //   // Do something with the response array here
    // }, (error) => {
    //   console.error(error);
    // });


    // interface User {
    //   id: number;
    //   name: string;
    //   age: number;
    // }
    
    // const users: User[] = [
    //   { id: 1, name: 'Alice', age: 25 },
    //   { id: 2, name: 'Bob', age: 30 },
    //   { id: 3, name: 'Charlie', age: 35 },
    //   { id: 4, name: 'David', age: 40 },
    //   { id: 5, name: 'Eve', age: 45 }
    // ];
    
    // function getUsersByIds(ids: number[]): User[] {
    //   return users.filter(user => ids.includes(user.id));
    // }
    
    // const ids = [1, 3, 5];
    // const usersByIds = getUsersByIds(ids);
    // console.log

  }
  test():void{
  }
  




  choosed:FormGroup = this.fb.group({

  })

}
