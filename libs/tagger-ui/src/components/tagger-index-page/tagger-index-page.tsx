import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer';
import { Ecc, QrPdf } from '@common/ui';
import css from './tagger-index-page.module.css';

Font.register({
  family: 'Roboto',
  src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
          <QrPdf text="hello world" ecl={Ecc.HIGH} size={20} />
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
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
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

export default TaggerIndexPage;
