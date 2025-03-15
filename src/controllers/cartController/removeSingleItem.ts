import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import redis from '../../../config/rdConfig';

const removeSingleItem = async (req: Request, res: Response, _next: NextFunction) => {
  const sessionId = req.headers['x-card-session-id'] as string;
  const productId = req.params.productId;

  if (!sessionId || !productId) {
    return res.status(400).json({ message: 'Session ID or productId missing' });
  }

  // Define Redis key
  const cartKey = `card:${sessionId}`;

  // Fetch the cart from Redis
  const cartData = await redis.exists(cartKey);

  if (!cartData) {
    return res.status(404).json({ message: 'Cart sessionId not found' });
  }

  const items = await redis.hgetall(cartKey);
  if (Object.keys(items).length === 0) {
    return res.status(200).json({ success: false, message: [] });
  }

  // Format the cart items
  const formatItems = Object.keys(items).map((key) => {
    const { quantity, inventoryId } = JSON.parse(items[key]) as {
      inventoryId: string;
      quantity: number;
    };
    return { 
      inventoryId,
      quantity,
      productId: key };
  });

  // Find and remove the item
  const matchId = formatItems.filter((item) => item.productId === productId);
  if (matchId.length === 0) {
    return res.status(404).json({ success: false, message: 'This Item is not found' });
  }

  const { inventoryId, quantity } = matchId[0];
  // Update inventory
  await axios.put(`http://localhost:3001/inventoris/update/${inventoryId}`, {
    quantity: Number(quantity),
    actionType: 'IN'
  });
  await redis.hdel(cartKey,productId);
/*
  // Remove the item from Redis
  await redis.hdel(cartKey, productId);

  // Fetch updated cart
  const updatedItems = await redis.hgetall(cartKey);
  const updatedCart = Object.keys(updatedItems).map((key) => {
    const { quantity, inventoryId } = JSON.parse(updatedItems[key]);
    return { inventoryId, quantity, productId: key };
  });
*/
  return res.json({ success: true, message: 'Item removed successfully', cart:formatItems,inventoryId,quantity});
};

export default removeSingleItem;
