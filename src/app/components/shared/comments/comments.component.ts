import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { Comment } from '../../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  @Input({ required: true }) postID!: string
  private readonly _CommentsService = inject(CommentsService)
  CommentsList: Comment[] = [];

  CommentForm!: FormGroup

  ngOnInit(): void { 
    this.CommentForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      post: new FormControl(this.postID, Validators.required),
    });
    

    this._CommentsService.GetPostComments(this.postID).subscribe({
      next: (res) => {
        console.log(res.comments)
        this.CommentsList = res.comments
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  createComment(): void {
    this._CommentsService.CreateComment(this.CommentForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.CommentsList = res.comments.reverse()
        this.CommentForm.get('content')?.reset()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
