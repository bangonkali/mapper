import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Rect,
  Svg,
  PDFViewer,
} from '@react-pdf/renderer';
import { QrPdf } from '@dash/common-ui';
import { Ecc } from '@dash/qr';

import css from './tagger-index-page.module.css';

Font.register({
  family: 'Roboto',
  src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
});

const inch = 72;

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  text: {
    marginLeft: 72 / 16,
  },
});

const CallibrationDocument: React.FC = () => {
  const callibrationWidths = [1, 2, 3, 4, 5, 6, 7, 8, 8.5];
  const sizes = [
    inch * (1 / 4),
    inch * (2 / 4),
    inch * (3 / 4),
    inch,
    inch * 2,
  ];
  return (
    <Document
      title="Dash Tagger Callibration"
      author="bangonkali@gmail.com"
      subject="A callibration pdf for the Dash Tagger application."
      keywords='["dash", "tagger", "callibration"]'
      creator="Dash Tagger"
      producer="Dash Tagger"
      language="en"
    >
      <Page size="LETTER" style={styles.page}>
        <View>
          <Text style={styles.text}>Callibration Width</Text>
          {callibrationWidths.map((width) => (
            <View key={width}>
              <Text style={styles.text}>Width: {width}</Text>
              <Svg width={`${width * inch}`} height={`${inch / 32}px`}>
                <Rect
                  x={0}
                  y={0}
                  width={`${width * inch}`}
                  height={`${inch}px`}
                  rx={0}
                  ry={0}
                  fill="#000000"
                ></Rect>
              </Svg>
            </View>
          ))}

          <Text style={styles.text}>QR Codes</Text>

          {sizes.map((size) => (
            <View style={styles.text} key={size}>
              <Text>
                Size: {size}x{size}
              </Text>
              <QrPdf
                text={`Size ${size}`}
                ecl={Ecc.HIGH}
                size={Math.floor(size)}
              />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export function TaggerIndexPage() {
  return (
    <>
      <div className={css['param-container']}></div>
      <div className={css['pdf-container']}>
        <PDFViewer width="100%" height="100%" showToolbar={true}>
          <CallibrationDocument />
        </PDFViewer>
      </div>
    </>
  );
}

export default TaggerIndexPage;
