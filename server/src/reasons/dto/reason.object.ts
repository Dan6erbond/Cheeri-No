import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Reason")
export class ReasonObject {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly text: string;

  @Field()
  readonly source: string;

  @Field()
  readonly anonymous: boolean;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
