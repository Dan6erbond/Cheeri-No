import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Company } from "../../companies/entities/company.entity";
import { BaseEntity } from "../../database/entities/base-entity.entity";
import { User } from "../../users/entities/user.entity";

@Entity({ tableName: "reasons" })
export class Reason extends BaseEntity {
  @Property()
  text: string;

  @Property()
  source: string;

  @Property()
  anonymous: boolean;

  @ManyToOne(() => User, { joinColumn: "author_id", onDelete: "CASCADE" })
  author: User;

  @ManyToOne(() => Company, { joinColumn: "company_id", onDelete: "CASCADE" })
  company: Company;
}
