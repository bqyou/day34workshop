import { Component } from '@angular/core';
import { Query } from './models';
import { NewsService } from './news.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'day34workshop';
  query!: Query

  constructor(private newsSvc: NewsService){}

  getNews(query: Query){
    this.query = query
    this.newsSvc.getNews(query.country, query.category)
  }
}
