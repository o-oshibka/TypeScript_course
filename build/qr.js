"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = generateQRCode;
const qrcode = __importStar(require("qrcode"));
function generateQRCode(text_1) {
    return __awaiter(this, arguments, void 0, function* (text, userSize = 4) {
        try {
            // Нормализуем размер (1-10) и преобразуем в параметры для qrcode
            const normalizedSize = Math.max(1, Math.min(10, userSize));
            // Разные режимы для разных размеров
            let options;
            if (normalizedSize <= 3) { // Маленькие QR-коды
                options = {
                    errorCorrectionLevel: 'L',
                    type: 'terminal',
                    scale: 1,
                    margin: 0,
                    color: { dark: '█', light: ' ' }
                };
            }
            else if (normalizedSize <= 6) { // Средние QR-коды
                options = {
                    errorCorrectionLevel: 'M',
                    type: 'terminal',
                    scale: 2,
                    margin: 1,
                    color: { dark: '██', light: '  ' }
                };
            }
            else { // Большие QR-коды (7-10)
                options = {
                    errorCorrectionLevel: 'H',
                    type: 'terminal',
                    scale: 3 + Math.floor((normalizedSize - 7) / 2),
                    margin: 2,
                    color: { dark: '███', light: '   ' }
                };
            }
            const qrString = yield qrcode.toString(text, options);
            // Для маленьких QR-кодов убираем пустые строки
            return normalizedSize <= 3
                ? qrString.split('\n').filter(l => l.trim()).join('\n')
                : qrString;
        }
        catch (error) {
            throw new Error(`Ошибка генерации: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
}
