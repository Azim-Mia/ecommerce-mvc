"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemsSchema = exports.orderSchema = void 0;
var zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    email: zod_1.z.string().email(),
    cardSessionId: zod_1.z.string(),
});
exports.orderItemsSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    inventoryId: zod_1.z.string(),
    quantity: zod_1.z.number()
});
