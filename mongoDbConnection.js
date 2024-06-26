"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const devUri = "mongodb://127.0.0.1:27017/clubhouse?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6";
const uri = process.env.MONGODB_URI || "";
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri, {
                serverSelectionTimeoutMS: 5000, // 5 seconds
            });
            console.log("Connected to MongoDB");
        }
        catch (err) {
            console.log("in mongoDB connection: ", err.message);
            //process.exit(1);
        }
    });
}
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose connected to HERE!!' + uri);
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
exports.default = connectDB;
