import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Rect,
  Svg,
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
});

const CallibrationDocument = () => {
  const callibrationWidths = [1, 2, 3, 4, 5, 6, 7, 8, 8.27];
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
      <Page size="A4" style={styles.page}>
        <View>
          <Text>Callibration Width</Text>
          {callibrationWidths.map((width) => (
            <View key={width}>
              <Text>Width: {width}</Text>
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

          <Text>QR Codes</Text>

          {sizes.map((size) => (
            <View key={size}>
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
    <div className={css['container']}>
      <h1>Welcome to TaggerIndexPadge!</h1>
      <PDFViewer>
        <CallibrationDocument />
      </PDFViewer>
    </div>
  );
}

export default TaggerIndexPage;
