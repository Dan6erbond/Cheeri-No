import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("Company")
export class CompanyObject {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly name: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
