import {z} from 'zod';
export const addCardSchema = z.object({
  productId:z.string(),
  inventoryId:z.string(),
  quantity:z.number(),
  color:z.string(),
  size:z.string()
});
