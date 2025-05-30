import qrcode from 'qrcode';

export async function generateQRCode(text: string, size: number = 4): Promise<string> {
    try {
        if (!text) {
            throw new Error('требуется текст или URL');
        }

        if (size < 1 || size > 20) {
            throw new Error('Размер должен быть от 1 до 20');
        }

        const options = {
            small: true,
            scale: size
        };

        const qr = await qrcode.toString(text, options);
        return qr;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Слишком много данных')) {
                throw new Error('Ошибка: текст слишком длинный для создания QR-кода.');
            }
            throw error;
        }
        throw new Error('Произошла неизвестная ошибка при генерации QR-кода');
    }
}