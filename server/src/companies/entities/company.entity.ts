import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "../../database/entities/base-entity.entity";

@Entity({ tableName: "companies" })
export class Company extends BaseEntity {
  @Property()
  name: string;

  @ManyToOne(() => Company, {
    nullable: true,
    onDelete: "CASCADE",
    joinColumn: "parent_company_id",
  })
  parentCompany?: Company;

  @OneToMany(() => Company, (company) => company.parentCompany, {
    cascade: [Cascade.REMOVE],
  })
  subsidiaries = new Collection<Company>(this);
}
