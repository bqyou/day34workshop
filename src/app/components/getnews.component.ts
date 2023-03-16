import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CATEGORIES_LIST, COUNTRIES_LIST } from '../constants';
import { country, Query } from '../models';
import { NewsService } from '../news.services';

@Component({
  selector: 'app-getnews',
  templateUrl: './getnews.component.html',
  styleUrls: ['./getnews.component.css']
})
export class GetnewsComponent implements OnInit {

  CATEGORIES: string[] = CATEGORIES_LIST
  countries: country[]=[]
  flag: string | undefined =""
  form!: FormGroup

  @Output()
  onGetNews = new Subject<Query>

  constructor(private fb:FormBuilder, private newsSvc: NewsService){}

  ngOnInit(): void {
    this.newsSvc.getCountries()
			.then(result => this.countries = result)
    this.form = this.fb.group({
      country: this.fb.control('', [Validators.required]),
      category: this.fb.control('', [Validators.required])
    })
  }

  onCountryChange(selectElem: any) {
		const code = selectElem.target.value
		const country = this.countries.find(c => c.code == code)
		this.flag = country?.flag
	}

  findNews(){
    const query = this.form.value as Query
    this.onGetNews.next(query)
    this.form.reset()
  }

  

}
