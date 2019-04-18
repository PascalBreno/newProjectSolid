import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class CommonService {

    constructor(private http: Http) { }

    saveUser(user){
        return this.http.post('http://localhost:8888/api/SaveUser/', user)
    }

    GetUser(){
        return this.http.get('http://localhost:8888/api/getUser/')
    }
    deleteUser(id){
        return this.http.post('http://localhost:8888/api/deleteUser/',{'id': id})

    }

}
