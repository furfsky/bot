import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey({ type: "string" })
  id!: string;

  @Property({ type: "date", default: "NOW()" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: "number", default: 0 })
  xp!: number;

  // constructor(id: string) {
  //   this.id = id;
  // }
}
