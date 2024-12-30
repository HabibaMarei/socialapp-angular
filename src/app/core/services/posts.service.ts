import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly _HttpClient = inject(HttpClient)
  constructor() { }

  CreatePost(data: object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}posts`, data)
  }

  GetAllPosts(limit: number):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}posts?limit=${limit}`)
  }

  GetUserPosts(limit: number): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}users/664bcf3e33da217c4af21f00/posts?limit=${limit}`)
  }

  GetSinglePost(postID:string): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}posts/${postID}`)
  }

  UpdatePost(postID:string, data: object): Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}posts/${postID}`, data)
  }

  DeletePost(postID:string): Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}posts/${postID}`)
  }
}
