import { Command } from 'commander';
import { generateQRCode } from './qr';

const program = new Command();

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
    .action(async (text, { size }) => {
        try {
            console.log(await generateQRCode(text, size));
        } catch (error) {
            console.error(error instanceof Error ? error.message : 'Неизвестная ошибка');
            process.exit(1);
        }
    });

program.parse(process.argv);

if (process.argv.length < 3) {
    program.help();
}