import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDoc = User & Document;

@Schema()
export class User {
  // @Prop({ required: true })
  // id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
