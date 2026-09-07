import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';import { CreateProductDto } from './dto/create-product.dto';
import { ProductsQueryDto } from './dto/products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

const INITIAL_PRODUCTS: CreateProductDto[] = [
  {
    name: 'בישום',
    category: 'בישום',
    description: 'מבחר בשמים אהובים במחירים מצוינים',
    imageUrl: 'https://merkazhazol.com/store/perfumes.jpeg',
    inStock: true,
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'איפור',
    category: 'איפור',
    description: 'מוצרי איפור במגוון גוונים וסגנונות',
    imageUrl: 'https://merkazhazol.com/store/makeup.jpeg',
    inStock: true,
    featured: true,
    displayOrder: 2,
  },
  {
    name: 'חומרי ניקוי',
    category: 'ניקיון',
    description: 'מגוון חומרי ניקוי לבית נקי ורענן',
    imageUrl: 'https://merkazhazol.com/store/cleaning-products.jpeg',
    inStock: true,
    featured: true,
    displayOrder: 3,
  },
  {
    name: 'טיפוח וקוסמטיקה',
    category: 'טיפוח',
    description: 'מגוון מוצרי טיפוח וקוסמטיקה לפנים ולגוף',
    imageUrl: 'https://merkazhazol.com/store/face-care.jpeg',
    inStock: true,
    featured: true,
    displayOrder: 4,
  },
  {
    name: 'מוצרי שיער',
    category: 'שיער',
    description: 'מוצרים לטיפוח, חיזוק ושיקום השיער',
    imageUrl: 'https://merkazhazol.com/store/hair-products.jpeg',
    inStock: true,
    featured: true,
    displayOrder: 5,
  },
  {
    name: 'היגיינה',
    category: 'היגיינה',
    description: 'מגוון מוצרי היגיינה לנשים ולמבוגרים',
    imageUrl: 'https://merkazhazol.com/store/hygiene.jpeg',
    inStock: true,
    featured: true,
    displayOrder: 6,
  },
    {
    name: 'ניקיון ותחזוקה',
    category: 'ניקיון',
    description: 'פתרונות יעילים לניקיון ולתחזוקת הבית',
    imageUrl: 'https://merkazhazol.com/store/cleaning-display.jpg',
    inStock: true,
    featured: false,
    displayOrder: 7,
  },

  {
    name: 'אביזרי שיער',
    category: 'שיער',
    description: 'כל האביזרים לשיער מעוצב',
    imageUrl: 'https://merkazhazol.com/store/hair-accessories.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 8,
  },

  {
    name: 'טיפוח הגוף',
    category: 'טיפוח',
    description: 'קרמים, דאודורנטים ומוצרי גילוח לשגרת טיפוח',
    imageUrl: 'https://merkazhazol.com/store/body-care.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 9,
  },

  {
    name: 'חד-פעמי',
    category: 'מוצרי צריכה',
    description: 'מגוון מוצרים חד-פעמיים',
    imageUrl: 'https://merkazhazol.com/store/disposables.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 10,
  },

  {
    name: 'כפכפי Havaianas',
    category: 'כפכפים',
    description: 'מגוון דגמי Havaianas לנשים ולגברים',
    imageUrl: 'https://merkazhazol.com/store/flipflops.jpg',
    inStock: true,
    featured: false,
    displayOrder: 11,
  },

  {
    name: 'סבונים',
    category: 'היגיינה',
    description: 'מוצרי רחצה לניקיון ולרעננות',
    imageUrl: 'https://merkazhazol.com/store/soaps.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 12,
  },

  {
    name: 'צבעים לשיער',
    category: 'שיער',
    description: 'מבחר גוונים ומותגים',
    imageUrl: 'https://merkazhazol.com/store/hair-colors.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 13,
  },

  {
    name: 'מטאטאים ומגבים',
    category: 'ניקיון',
    description: 'מטאטאים, מגבים ואביזרי ניקיון לבית',
    imageUrl: 'https://merkazhazol.com/store/brooms-mops.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 14,
  },

  {
    name: 'לקים',
    category: 'טיפוח',
    description: 'הגוון המושלם לכל סגנון',
    imageUrl: 'https://merkazhazol.com/store/nail-polish.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 15,
  },

  {
    name: 'מטהרי אוויר',
    category: 'ניקיון',
    description: 'רעננות הבית והגנה מפני יתושים',
    imageUrl: 'https://merkazhazol.com/store/air-fresheners.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 16,
  },

  {
    name: 'לבנים וגרביים',
    category: 'ביגוד',
    description: 'לבנים, גרביים וגרביונים לנשים ולגברים',
    imageUrl: 'https://merkazhazol.com/store/underwear-hosiery.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 17,
  },

  {
    name: 'היגיינת הפה',
    category: 'היגיינה',
    description: 'שמירה על היגיינת הפה',
    imageUrl: 'https://merkazhazol.com/store/oral-care.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 18,
  },

  {
    name: 'נעלי בית וכובעים',
    category: 'ביגוד',
    description: 'פריטים נוחים ושימושיים לכל עונה',
    imageUrl: 'https://merkazhazol.com/store/slippers-hats.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 19,
  },

  {
    name: 'כפפות, מגבונים ושקיות',
    category: 'ניקיון',
    description: 'אביזרים לניקיון ולסדר',
    imageUrl: 'https://merkazhazol.com/store/gloves-wipes-bags.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 20,
  },

  {
    name: 'אביזרי רחצה וציפורניים',
    category: 'טיפוח',
    description: 'אביזרים להשלמת שגרת הטיפוח',
    imageUrl: 'https://merkazhazol.com/store/shower-caps-nails.jpeg',
    inStock: true,
    featured: false,
    displayOrder: 21,
  },
];

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async onModuleInit() {
      await Promise.all(
        INITIAL_PRODUCTS.map((product) =>
          this.productModel.updateOne(
            { name: product.name },
            { $setOnInsert: product },
            { upsert: true },
          ),
        ),
      );
    }

  async findAll(query: ProductsQueryDto) {
    const filter: Record<string, unknown> = {};

    if (query.category) {
      filter.category = query.category;
    }

    if (typeof query.inStock === 'boolean') {
      filter.inStock = query.inStock;
    }

    if (query.search?.trim()) {
      filter.$text = {
        $search: query.search.trim(),
      };
    }

    const skip = (query.page - 1) * query.limit;

    const [items, total] = await Promise.all([
      this.productModel
        .find(filter)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(query.limit)
        .lean()
        .exec(),
      this.productModel.countDocuments(filter),
    ]);

    return {
      items,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit),
      },
    };
  }

  async findOne(id: string) {
    this.validateId(id);

    const product = await this.productModel.findById(id).lean().exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = new this.productModel(createProductDto);
    return product.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    this.validateId(id);

    const product = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async remove(id: string) {
    this.validateId(id);

    const product = await this.productModel.findByIdAndDelete(id).lean().exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      deleted: true,
      id,
    };
  }

  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product id');
    }
  }
}
