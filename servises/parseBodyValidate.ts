import {z} from 'zod';
export const orderSchema = z.object({
  userId:z.string(),
  name:z.string(),
  address:z.string(),
  email:z.string().email(),
  cardSessionId: z.string(),
});

export const orderItemsSchema = z.object({
  productId: z.string(),
  inventoryId: z.string(),
  quantity: z.number()
})