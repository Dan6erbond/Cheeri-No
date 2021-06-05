import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entities/post.entity";

interface FindAllArgs {
  relations?: string[];
  authorId?: number;
}

interface FindOneArgs extends FindAllArgs {
  id: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: EntityRepository<Post>,
  ) {}

  async create(authorId: number, createPostInput: CreatePostInput) {
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...createPostInput,
    });
    await this.postsRepository.persistAndFlush(post);
    return post;
  }

  findAll(args?: FindAllArgs) {
    const { relations, authorId } = args;
    let where: FilterQuery<Post> = {};
    if (authorId) {
      where = { ...where, author: { id: authorId } };
    }
    return this.postsRepository.find(where, relations);
  }

  findOne({ id, relations }: FindOneArgs) {
    return this.postsRepository.findOne(id, relations);
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const post = await this.postsRepository.findOne(id);
    this.postsRepository.assign(post, updatePostInput);
    await this.postsRepository.flush();
    return post;
  }

  async remove(id: number) {
    await this.postsRepository.removeAndFlush({ id });
    return true;
  }
}
