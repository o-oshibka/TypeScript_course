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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const qr_1 = require("./qr");
const program = new commander_1.Command();
program
    .name('qr-cli')
    .description('Генератор QR-кодов для терминала')
    .version('1.0.0');
program
    .command('generate <text>')
    .description('Генерирует QR-код из текста/ссылки')
    .option('-s, --size <size>', 'Размер QR-кода (1-10, по умолчанию 4)', (val) => {
    const size = parseInt(val);
    if (isNaN(size) || size < 1 || size > 10) {
        console.error('Размер должен быть числом от 1 до 10');
        process.exit(1);
    }
    return size;
}, 4)
    .action((text_1, _a) => __awaiter(void 0, [text_1, _a], void 0, function* (text, { size }) {
    try {
        console.log(yield (0, qr_1.generateQRCode)(text, size));
    }
    catch (error) {
        console.error(error instanceof Error ? error.message : 'Неизвестная ошибка');
        process.exit(1);
    }
}));
program.parse(process.argv);
if (process.argv.length < 3) {
    program.help();
}
