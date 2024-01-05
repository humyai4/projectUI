import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { News } from './news-bar';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-news-bar',
  templateUrl: './news-bar.component.html',
  styleUrls: ['./news-bar.component.css'],
})
export class NewsBarComponent {
  images = '';
  pauseOnHover = true;
  pauseOnFocus = true;
  paused = false;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (
      slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
      slideEvent.source === NgbSlideEventSource.ARROW_RIGHT
    ) {
      this.togglePaused();
    }
    if (
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  newsList: News[] = [];
  constructor(private http: HttpClient,private localStore: LocalService) {}
  ngOnInit(): void {
    this.HaveRoleAccess()
    this.http
      .get<News[]>('http://180.183.246.177:1114/news/newsList')
      .subscribe((response) => {
        this.newsList = response;
      });
  }


  HaveRoleAccess() {
   
    const role = this.localStore.getData('role');
    if (role == '' || role == '3') {
      console.log(role)
      return false;
    } else {
      return true
    }
    
  }
}
