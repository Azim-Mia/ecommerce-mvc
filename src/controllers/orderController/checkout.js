"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var zod_1 = require("zod");
var uuidv4 = require('uuid').v4;
var schemas_1 = require("../../models/orderModel/schemas");
var parseBodyValidate_1 = require("../../../validatesSchema/parseBodyValidate");
var checkOut = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cardData, cardItemsData, parseBody, data, cardItems, orderDetails, orderItemsData, subtotal, tax, grandTotal, orderInitialData, createOrder_1, result, productAllItem, orderId, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                parseBody = parseBodyValidate_1.orderSchema.safeParse(req.body);
                //body data is exists
                if (!parseBody.success) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: parseBody.error.errors })];
                }
                ;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 8, , 9]);
                return [4 /*yield*/, axios_1.default.get("http://localhost:3001/carts/me", {
                        headers: {
                            'x-card-session-id': parseBody.data.cardSessionId,
                        },
                    })];
            case 2:
                data = (_c.sent()).data;
                //all data store
                cardData = data === null || data === void 0 ? void 0 : data.items;
                cardItems = zod_1.z.array(parseBodyValidate_1.orderItemsSchema).safeParse(cardData);
                //check data empty
                if (((_a = cardItems.data) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "cardItems is empty" })];
                }
                ;
                //asign value  cardItemsData
                cardItemsData = cardItems === null || cardItems === void 0 ? void 0 : cardItems.data;
                if (!cardItemsData)
                    return [2 /*return*/];
                orderDetails = Promise.all(cardItemsData.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, axios_1.default.get("http://localhost:3001/products/find/".concat(item.productId))];
                            case 1:
                                product = (_a.sent()).data;
                                return [2 /*return*/, {
                                        productId: product.findProduct.productId,
                                        productName: product.findProduct.name,
                                        sku: product.findProduct.sku,
                                        price: product.findProduct.price,
                                        quantity: Number(item.quantity),
                                        total: product.findProduct.price * item.quantity,
                                    }];
                        }
                    });
                }); }));
                return [4 /*yield*/, orderDetails];
            case 3:
                orderItemsData = _c.sent();
                subtotal = orderItemsData.reduce(function (acc, item) { return acc + item.total; }, 0);
                tax = 0;
                grandTotal = subtotal + tax;
                orderInitialData = {
                    id: uuidv4(),
                    userId: parseBody.data.userId,
                    name: parseBody.data.name,
                    email: parseBody.data.email,
                    address: parseBody.data.address,
                    subtotal: subtotal,
                    tax: tax,
                    grandTotal: grandTotal,
                    orderItems: {
                        create: orderItemsData.map(function (item) { return (__assign({}, item)); }),
                    }
                };
                createOrder_1 = new schemas_1.OrderDetailModel(orderInitialData);
                return [4 /*yield*/, createOrder_1.save()];
            case 4:
                result = _c.sent();
                productAllItem = orderItemsData.map(function (item) { return (__assign({ orderId: createOrder_1.id }, item)); });
                orderId = productAllItem.map(function (item) { return item.orderId; });
                //create orderitem
                return [4 /*yield*/, schemas_1.OrderItemModel.insertMany(productAllItem)];
            case 5:
                //create orderitem
                _c.sent();
                //clear cardhhhjhxhjgx
                return [4 /*yield*/, axios_1.default.get("http://localhost:3001/carts/clear", {
                        headers: {
                            'x-card-session-id': parseBody.data.cardSessionId,
                        },
                    })];
            case 6:
                //clear cardhhhjhxhjgx
                _c.sent();
                // semd email 
                return [4 /*yield*/, axios_1.default.post("http:localhost:3001/email/send", {
                        recipient: parseBody.data.email,
                        subject: "successfull order",
                        body: "<div> \n     <h1> Amount:".concat(grandTotal, "</h1>\n     <h2>orderId : ").concat(orderId, "</h2>\n     </div>"),
                        source: (_b = parseBody === null || parseBody === void 0 ? void 0 : parseBody.data) === null || _b === void 0 ? void 0 : _b.email,
                        sender: "Azim",
                    })];
            case 7:
                // semd email 
                _c.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true, message: 'order create successfull',
                        payload: {
                            result: result,
                        }
                    })];
            case 8:
                error_1 = _c.sent();
                console.log(error_1);
                if (error_1.status == "400") {
                    return [2 /*return*/, res.status(400).json({ message: "order session Id is not valid" })];
                }
                return [2 /*return*/, res.status(400).json({ message: "Internal Server Error" })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.default = checkOut;
