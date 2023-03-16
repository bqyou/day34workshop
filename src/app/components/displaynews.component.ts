import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News, Query } from '../models';
import { NewsService } from '../news.services';

@Component({
  selector: 'app-displaynews',
  templateUrl: './displaynews.component.html',
  styleUrls: ['./displaynews.component.css']
})
export class DisplaynewsComponent implements OnInit, OnDestroy{

  news: News[] = []

  @Input()
  query!: Query

  newsSub!: Subscription

  constructor(private newsSvc: NewsService){}

  ngOnInit(){
    this.newsSub = this.newsSvc.onNews.subscribe(
      news => this.news = news
    )
    console.info(this.news[0])
  }

  ngOnDestroy(): void {
      this.newsSub.unsubscribe()
  }


}
