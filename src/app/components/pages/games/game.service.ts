import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class GameService {

	private gamesUrl = 'http://playngo.com/api/Games';
	private newHeaders = new Headers();

	constructor(private http: Http) { }

	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	}

	getGames():Observable<any> {
		this.newHeaders.append('Content-Type', 'text/xml');

			//Using Promise

	    // return this.http.get(this.gamesUrl,{headers: this.newHeaders})
	    //            .toPromise()
	    //            .then(response => JSON.parse(response.text()))
	    //            .catch(this.handleError);

		 return this.http.get(this.gamesUrl,{headers: this.newHeaders})
              .map(res => res.json())
              .catch(this.handleError);
	}

	// getGameById(id:number): Promise<void> {
	// 	const newGameUrl = this.gamesUrl + '/' + id;
	// 	this.newHeaders.append('Content-Type', 'text/xml');
	// 	return this.http.get(newGameUrl,{headers: this.newHeaders})
	// 						 .toPromise()
	// 						 .then(response => JSON.parse(response.text()))
	// 						 .catch(this.handleError);
	// }

	getGameById(id:number): Observable<any> {
		const newGameUrl = this.gamesUrl + '/' + id;
		this.newHeaders.append('Content-Type', 'text/xml');
		return this.http.get(newGameUrl,{headers: this.newHeaders})
										.map(res => res.json())
										.catch(this.handleError);
	}

	getGameType(){
		return ['flash', 'mobile', 'desktop'];
	}
	//methods

	//fetch all hero
	// getHeroes(): Promise<Hero[]> {
	//     return this.http.get(this.heroesUrl)
	//                .toPromise()
	//                .then(response => response.json().data as Hero[])
	//                .catch(this.handleError);
	// }



	// //fetch specific hero
	// getHero(id:number): Promise<Hero> {
	// 	const url = `${this.heroesUrl}/${id}`;
	// 	return this.http.get(url)
	// 		.toPromise()
	// 		.then(response => {
	// 			return response.json().data as Hero
	// 		})
	// 		.catch(this.handleError);
	// }

	// //update hero
	// update(hero: Hero): Promise<Hero> {
	//   const url = `${this.heroesUrl}/${hero.id}`;
	//   return this.http
	//     .put(url, JSON.stringify(hero), {headers: this.headers})
	//     .toPromise()
	//     .then(() => hero)
	//     .catch(this.handleError);
	// }

	// //create new hero
	// create(name: string): Promise<Hero> {
	//   return this.http
	//     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
	//     .toPromise()
	//     .then(res => res.json().data as Hero)
	//     .catch(this.handleError);
	// }

	// //delete a hero
	// delete(id: number): Promise<void> {
	//   const url = `${this.heroesUrl}/${id}`;
	//   return this.http.delete(url, {headers: this.headers})
	//     .toPromise()
	//     .then(() => null)
	//     .catch(this.handleError);
	// }

	// // getGames():Promise<void>{
	// // 	const gamesUrl = `http://playngo.com/api/Games`;
	// // 	var newHeaders = new Headers();
	// // 	newHeaders.append('Accept', 'application/xml');
	// // 	return this.http.get(gamesUrl, {headers: newHeaders})
	// // 	.map(res => {
	// // 		console.log(res);
	// // 		return JSON.parse(xml2json(res.text(),'  '))
	// // 	});
	// // }


}
