import * as qrcode from 'qrcode';

export async function generateQRCode(text: string, userSize: number = 4): Promise<string> {
    try {
        const normalizedSize = Math.max(1, Math.min(10, userSize));
        
        let options: qrcode.QRCodeToStringOptions;
        
        if (normalizedSize <= 3) {
            options = {
                errorCorrectionLevel: 'L',
                type: 'terminal',
                scale: 1,
                margin: 0,
                color: { dark: '█', light: ' ' }
            };
        } 
        else if (normalizedSize <= 6) {
            options = {
                errorCorrectionLevel: 'M',
                type: 'terminal',
                scale: 2,
                margin: 1,
                color: { dark: '██', light: '  ' }
            };
        } 
        else {
            options = {
                errorCorrectionLevel: 'H',
                type: 'terminal',
                scale: 3 + Math.floor((normalizedSize - 7) / 2),
                margin: 2,
                color: { dark: '███', light: '   ' }
            };
        }

        const qrString = await qrcode.toString(text, options);
        
        return normalizedSize <= 3 
            ? qrString.split('\n').filter(l => l.trim()).join('\n')
            : qrString;
    } catch (error) {
        throw new Error(`Ошибка генерации: ${error instanceof Error ? error.message : String(error)}`);
    }
}