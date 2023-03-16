import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { firstValueFrom, Subject } from "rxjs"
import { country, News } from "./models"
import { COUNTRYURL, COUNTRIES_LIST } from "./constants"

const NEWS_URL = "https://newsapi.org/v2/top-headlines"
const API_KEY = "74d1384d5e63402e87916edaf0b938be"

@Injectable()
export class NewsService{
    
    onNews = new Subject<News[]>
    countries:country[]=[]

    
    constructor(private http: HttpClient){}

    

    getNews(country: string, category: string): Promise<News[]>{
        const q = new HttpParams()
        .set('country', country)
        .set('category', category)
        .set('apiKey', API_KEY)

        return firstValueFrom(this.http.get<News[]>(NEWS_URL, {params: q}).pipe())
                    .then(
                        (data:any)=>{
                            const w = data['articles'] as News[]
                            return w
                        })
                    .then(
                        data=> {
                            this.onNews.next(data)
                            return data
                        }
                    )

    }

    getCountries(): Promise<country[]> {

		if (!!this.countries.length)
			return Promise.resolve(this.countries)

		const params = new HttpParams()
					.set('codes', COUNTRIES_LIST)

		return firstValueFrom(
			this.http.get<country[]>(COUNTRYURL, { params })
		).then(result => {
			this.countries = result.map(
				(c: any) => (
					{
						name: c.name.common,
						code: c.cca2.toLowerCase(),
						flag: c.flags.png
					} as country
				)
			)
			this.countries.sort((a, b) => a.name > b.name? 1: -1)
			return this.countries
		})
	}
}