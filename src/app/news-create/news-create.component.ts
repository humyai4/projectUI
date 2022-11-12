import {
  Component,
  OnInit,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { News } from 'src/app/news-create/news-create';
import { LocalService } from '../local.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css'],
})
export class NewsCreateComponent implements OnInit {
  public newsdetails: any;
  newlinks: any;
  file: any = null;
  username : any;

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private http: HttpClient,
    private fb: FormBuilder,
    private localStore: LocalService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  confirmDelete(content:any) {
    this.modalService.open(content);
  }
  

  //WHEN CHOOSE FILE

  onSelectFile(event: any) {
    if (event.target.files) {
      this.file = event.target.files[0];
    }
    console.log(this.file);
  }

  createNewsForm: FormGroup = this.fb.group({
    newsTitle: ['', [Validators.required, Validators.maxLength(25)]],
    newsDetail: [''],
    newLink: [''],
    newsImg: [''],
    newsId:[''],
  });
  get newsTitle(): any {
    return this.createNewsForm.get('newsTitle');
  }
  get newsDetail(): any {
    return this.createNewsForm.get('newsDetail');
  }
  get newLink(): any {
    return this.createNewsForm.get('newLink');
  }
  get newsId(): any {
    return this.createNewsForm.get('newsId');
  }

  //TABLE *****
  newsList: News[] = [];
  ngOnInit(): void {
    this.http
      .get<News[]>('http://180.183.246.177:1114/news/newsList')
      .subscribe((response) => {
        this.newsList = response;
        // console.log( response);
      });
  }

  createNewsFormSubmit(): void {
    const createNewsForm = new FormData();
    this.username = this.localStore.getData('U')
    const formData = this.createNewsForm.value;
    createNewsForm.append('userID',this.username);
    createNewsForm.append('picture', this.file);
    createNewsForm.append('newsTitle', formData.newsTitle);
    createNewsForm.append('newsDetails', formData.newsDetail);
    createNewsForm.append('newLink', formData.newLink);
    let url = 'http://180.183.246.177:1114/news/newsCreate';
    this.http
      .post(url, createNewsForm)
      .toPromise()
      .then((data: any) => {
        console.log(data,this.username);
        window.location.reload();
      });
  }

  newsDelete(newsIDS: any): void {
    
    const newsDeleteForm = new FormData();
    newsDeleteForm.append('newsId',newsIDS.value);
    let url = 'http://180.183.246.177:1114/news/newsDelete'
    this.http.post(url,newsDeleteForm).toPromise().then((data:any)=>{
      console.log(Math)
      window.location.reload();
    })
  }
}
