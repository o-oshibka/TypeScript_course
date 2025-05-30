import { Command } from 'commander';
import { generateQRCode } from './qr';

const program = new Command();

program
    .name('qr-cli')
    .description('Генератор QR-кодов для терминала')
    .version('1.0.0');

program
    .command('Генерация <Текста>')
    .description('Сгенерируйте QR-код из текста или URL')
    .option('-s, --размер <number>', 'Размер QR-кода (1-20)', '4')
    .action(async (text, options) => {
        try {
            const size = parseInt(options.size) || 4;
            const qr = await generateQRCode(text, size);
            console.log(qr);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`ОШибка: ${error.message}`);
                process.exit(1);
            }
            console.error('Произошла неизвестная ошибка');
            process.exit(1);
        }
    });

program.parse(process.argv);