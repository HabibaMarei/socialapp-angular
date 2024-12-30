import { DatePipe } from '@angular/common';
import { Ipost } from '../../core/interfaces/ipost';
import { PostsService } from './../../core/services/posts.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommentsComponent } from "../shared/comments/comments.component";

@Component({
  selector: 'app-timeline',
  imports: [DatePipe, CommentsComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  private readonly _PostsService = inject(PostsService)
  PostsList: Ipost[] = []
  constructor() { }
  ngOnInit(): void {
    this._PostsService.GetAllPosts(200).subscribe({
      next: (res) => {
        console.log(res)
        this.PostsList = res.posts
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  changeImage(e: Event){
    const input = e.target as HTMLInputElement;
    console.log(input.files);
    
  }
}
