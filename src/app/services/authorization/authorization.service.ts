import {Injectable} from '@angular/core';
import {Authorize} from "./authorization.model";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";
import {AppConfig} from "../../config";


@Injectable()
export class AuthorizationService {
  authorize: Authorize;
  token: string;

  constructor(private http: Http, private router: Router) {
    this.authorize = {active: false};
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
      this.token = currentUser.token;
      this.authorize.active = true;
    }
  }

  login(username: string, password: string) {
    const url = AppConfig.serwerUrl + '/oauth/token';

    const paramsT: URLSearchParams = new URLSearchParams('grant_type=password&username=' + username + '&password=' + password);

    const encoded = btoa('pik-webapp-client:secret');

    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encoded);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const options = new RequestOptions({headers: headers, params: paramsT});

    this.http.post(url, undefined, options)
      .map(res => res.json())
      .subscribe(access_token => {
          this.token = access_token.access_token;
          this.authorize.active = true;
          this.router.navigate(['./eBay']);
          localStorage.setItem('currentUser', JSON.stringify({token: this.token}));
        },
        error2 => console.log("Zle haslo"));

  }


}
