import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  getCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  createOrder,
  getOrdersByUserId,
  getOrderById,
  addOrderItem,
  getOrderItems,
  getProductReviews,
  createReview,
  getUserReview,
} from "../db";

export const shopRouter = router({
  // ============ PRODUCTS ============
  
  products: router({
    list: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          search: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        return getProducts(input);
      }),

    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return getProductById(input);
      }),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          category: z.string(),
          price: z.string(),
          originalPrice: z.string().optional(),
          image: z.string(),
          images: z.array(z.string()).optional(),
          stock: z.number().default(0),
          material: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can create products");
        }
        return createProduct(input);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          category: z.string().optional(),
          price: z.string().optional(),
          originalPrice: z.string().optional(),
          image: z.string().optional(),
          images: z.array(z.string()).optional(),
          stock: z.number().optional(),
          material: z.string().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new Error("Only admins can update products");
        }
        const { id, ...data } = input;
        return updateProduct(id, data);
      }),
  }),

  // ============ CART ============

  cart: router({
    getItems: protectedProcedure.query(async ({ ctx }) => {
      const items = await getCartItems(ctx.user.id);
      // Enrich with product details
      const enriched = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );
      return enriched;
    }),

    addItem: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          quantity: z.number().default(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return addToCart(ctx.user.id, input.productId, input.quantity);
      }),

    removeItem: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return removeFromCart(input);
      }),

    clear: protectedProcedure.mutation(async ({ ctx }) => {
      return clearCart(ctx.user.id);
    }),
  }),

  // ============ WISHLIST ============

  wishlist: router({
    getItems: protectedProcedure.query(async ({ ctx }) => {
      const items = await getWishlist(ctx.user.id);
      // Enrich with product details
      const enriched = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...item, product };
        })
      );
      return enriched;
    }),

    addItem: protectedProcedure
      .input(z.number())
      .mutation(async ({ input, ctx }) => {
        return addToWishlist(ctx.user.id, input);
      }),

    removeItem: protectedProcedure
      .input(z.number())
      .mutation(async ({ input }) => {
        return removeFromWishlist(input);
      }),
  }),

  // ============ ORDERS ============

  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getOrdersByUserId(ctx.user.id);
    }),

    getById: protectedProcedure
      .input(z.number())
      .query(async ({ input, ctx }) => {
        const order = await getOrderById(input);
        if (!order || order.userId !== ctx.user.id) {
          throw new Error("Order not found");
        }
        const items = await getOrderItems(input);
        return { ...order, items };
      }),

    create: protectedProcedure
      .input(
        z.object({
          orderNumber: z.string(),
          total: z.string(),
          subtotal: z.string(),
          shippingCost: z.string().optional(),
          tax: z.string().optional(),
          shippingName: z.string(),
          shippingEmail: z.string(),
          shippingPhone: z.string(),
          shippingAddress: z.string(),
          shippingCity: z.string(),
          shippingPostalCode: z.string(),
          shippingCountry: z.string(),
          paymentMethod: z.enum(["credit_card", "pix", "boleto"]),
          items: z.array(
            z.object({
              productId: z.number(),
              productName: z.string(),
              price: z.string(),
              quantity: z.number(),
            })
          ),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { items, ...orderData } = input;
        const order = await createOrder({
          ...orderData,
          userId: ctx.user.id,
          status: "pending",
        });

        // Add order items
        const orderId = (order as any).insertId as number;
        for (const item of items) {
          await addOrderItem({
            orderId,
            ...item,
          });
        }

        // Clear cart
        await clearCart(ctx.user.id);

        return order;
      }),
  }),

  // ============ REVIEWS ============

  reviews: router({
    getByProduct: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return getProductReviews(input);
      }),

    create: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          rating: z.number().min(1).max(5),
          title: z.string().optional(),
          comment: z.string().optional(),
          tags: z.array(z.string()).optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        return createReview({
          ...input,
          userId: ctx.user.id,
        });
      }),

    getUserReview: protectedProcedure
      .input(z.number())
      .query(async ({ input, ctx }) => {
        return getUserReview(ctx.user.id, input);
      }),
  }),
});
