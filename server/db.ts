import { eq, desc, and, gte, lte, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, products, cartItems, wishlists, orders, orderItems, reviews, InsertProduct, InsertCartItem, InsertWishlist, InsertOrder, InsertOrderItem, InsertReview } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ PRODUCTS ============

export async function getProducts(filters?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(products.isActive, true)];

  if (filters?.category) {
    conditions.push(eq(products.category, filters.category));
  }

  if (filters?.minPrice !== undefined) {
    conditions.push(gte(products.price, filters.minPrice.toString()));
  }
  if (filters?.maxPrice !== undefined) {
    conditions.push(lte(products.price, filters.maxPrice.toString()));
  }

  if (filters?.search) {
    conditions.push(like(products.name, `%${filters.search}%`));
  }

  return db.select().from(products).where(and(...conditions)).orderBy(desc(products.createdAt));
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(product: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(product);
  return result;
}

export async function updateProduct(id: number, product: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(products).set(product).where(eq(products.id, id));
}

// ============ CART ============

export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cartItems).where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number = 1) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db.select().from(cartItems).where(
    and(eq(cartItems.userId, userId), eq(cartItems.productId, productId))
  ).limit(1);

  if (existing.length > 0) {
    return db.update(cartItems).set({ quantity: existing[0].quantity + quantity }).where(eq(cartItems.id, existing[0].id));
  }
  
  return db.insert(cartItems).values({ userId, productId, quantity });
}

export async function removeFromCart(cartItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(cartItems).where(eq(cartItems.id, cartItemId));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(cartItems).where(eq(cartItems.userId, userId));
}

// ============ WISHLIST ============

export async function getWishlist(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(wishlists).where(eq(wishlists.userId, userId));
}

export async function addToWishlist(userId: number, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db.select().from(wishlists).where(
    and(eq(wishlists.userId, userId), eq(wishlists.productId, productId))
  ).limit(1);

  if (existing.length > 0) return existing[0];
  
  return db.insert(wishlists).values({ userId, productId });
}

export async function removeFromWishlist(wishlistId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(wishlists).where(eq(wishlists.id, wishlistId));
}

// ============ ORDERS ============

export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values(order);
  return result;
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function addOrderItem(item: InsertOrderItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(orderItems).values(item);
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

// ============ REVIEWS ============

export async function getProductReviews(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews).where(eq(reviews.productId, productId)).orderBy(desc(reviews.createdAt));
}

export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reviews).values(review);
}

export async function getUserReview(userId: number, productId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(reviews).where(
    and(eq(reviews.userId, userId), eq(reviews.productId, productId))
  ).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
