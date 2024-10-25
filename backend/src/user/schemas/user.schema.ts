import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
