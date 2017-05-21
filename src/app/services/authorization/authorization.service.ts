import { Injectable } from '@angular/core';
import {Authorize} from "./authorization.model";
import {Observable} from "rxjs/Observable";
import {Headers,Http, RequestOptions, URLSearchParams} from "@angular/http";
import {isNullOrUndefined} from "util";


@Injectable()
export class AuthorizationService {
  authorize: Authorize;
  token: string;

  constructor(private http: Http) {
    this.authorize = {active : true};
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(!isNullOrUndefined(currentUser))
      this.token = currentUser.token;
  }

  login(username: string, password: string) {
    const url = 'https://192.168.1.72:8800/oauth/token';

    const paramsT: URLSearchParams = new URLSearchParams('grant_type=password&username=' + username + '&password=' + password);

    const encoded = btoa('pik-webapp-client:secret');

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encoded);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const options = new RequestOptions({ headers: headers, params: paramsT});

    this.http.post(url, undefined , options)
      .map(res =>  res.json())
      .subscribe(access_token => this.token = access_token.access_token,
                error2 => console.log("Zle haslo"));
    localStorage.setItem('currentUser', JSON.stringify({ token: this.token}));
  }



}
