import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { RefreshToken } from "../../auth/entities/refresh-token.entity";
import { BaseEntity } from "../../database/entities/base-entity.entity";
import { Reason } from "../../reasons/entities/reason.entity";

@Entity({ tableName: "users" })
export class User extends BaseEntity {
  @Property()
  username: string;

  @Property({ nullable: true })
  firstName: string;

  @Property({ nullable: true })
  lastName: string;

  @OneToMany(() => Reason, (reason) => reason.author, {
    cascade: [Cascade.REMOVE],
  })
  reasons = new Collection<Reason>(this);

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: [Cascade.REMOVE],
  })
  refreshTokens = new Collection<RefreshToken>(this);
}
