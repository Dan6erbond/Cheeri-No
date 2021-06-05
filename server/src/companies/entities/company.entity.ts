import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../database/entities/base-entity.entity";

@Entity({ tableName: "companies" })
export class Company extends BaseEntity {
  @Property()
  name: string;

  @OneToOne(() => Company, (company) => company.parentCompany, {
    nullable: true,
    joinColumn: "parent_company_id",
    onDelete: "CASCADE",
  })
  parentCompany?: string;
}
