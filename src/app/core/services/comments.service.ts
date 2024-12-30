import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly _HttpClient = inject(HttpClient)

  constructor() { }

  CreateComment(data: object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}comments`, data)
  }

  GetPostComments(postID: string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}posts/${postID}/comments`)
  }

  UpdateComment(commentID:string , data: object):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}comments/${commentID}`, data)
  }

  DeleteComment(commentID:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}comments/${commentID}`)
  }
}
