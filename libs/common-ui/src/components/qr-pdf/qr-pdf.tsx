import { Qr, Ecc } from '@dash/qr';
import { Svg, Rect } from '@react-pdf/renderer';

export type QrPdfProps = {
  text: string;
  ecl: Ecc;
  size?: number | undefined;
};

export const QrPdf: React.FC<QrPdfProps> = ({ text, ecl, size = 250 }) => {
  const qr0 = Qr.encodeText(text, ecl);
  const pw = size / qr0.size; // the pixel width of each module
  const svg = []; // conatiner for the svg elements
  for (let y = 0; y < qr0.size; y++) {
    for (let x = 0; x < qr0.size; x++) {
      if (qr0.getModule(x, y)) {
        svg.push(
          <Rect
            key={`${x}-${y}`}
            x={x * pw}
            y={y * pw}
            width={pw}
            height={pw}
            rx={0}
            ry={0}
            fill={'#000000'}
          />
        );
      }
    }
  }

  return <Svg style={{ width: size, height: size }}>{svg}</Svg>;
};
