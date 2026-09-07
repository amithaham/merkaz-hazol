import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true, index: true })
  category!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ required: true, trim: true })
  imageUrl!: string;

  @Prop({ default: true, index: true })
  inStock!: boolean;

  @Prop({ default: false })
  featured!: boolean;

  @Prop({ default: 0 })
  displayOrder!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
});
