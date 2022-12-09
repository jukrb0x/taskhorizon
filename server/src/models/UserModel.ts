import { User } from "../client";
import { Integer, Required, Property, Email, Description, Allow, CollectionOf } from "@tsed/schema";
import { TodoModel } from "./TodoModel";
import { EventModel } from "./EventModel";

export class UserModel implements User {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @Property(String)
  @Required()
  @Email()
  @Description("Email of the user")
  email: string;

  @Property(String)
  @Allow(null)
  name: string | null;

  @CollectionOf(() => TodoModel)
  @Required()
  Todo: TodoModel[];

  @CollectionOf(() => EventModel)
  @Required()
  Event: EventModel[];
}

