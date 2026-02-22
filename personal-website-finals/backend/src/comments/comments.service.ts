import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { supabase } from '../app/supabase';
import { CreateCommentDto } from './create-comment.dto';

@Injectable()
export class CommentsService {

  // GET all comments
  async findAll() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // POST a new comment
  async create(dto: CreateCommentDto) {
    if (!dto.name || !dto.message) {
      throw new BadRequestException('Name and message are required.');
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{
        name:       dto.name.trim(),
        location:   dto.location?.trim() || null,
        message:    dto.message.trim(),
      }])
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }
}
