import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService) {}

  // GET /comments
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  // POST /comments
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }
}
