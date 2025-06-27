import { Document, Page, StyleSheet, Font } from "@react-pdf/renderer";
import { Root } from "@/types";
import { Reading } from "./Reading";

const FONT_BASE_URL = "/coptish-datastore-editor/fonts";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "blue",
        padding: 0,
        paddingTop: 150,
    },
});

export const MyDocument = ({ data }: { data: Root }) => {
    Font.register({ family: "AdobeArabic", src: `${FONT_BASE_URL}/AdobeArabic-Bold.otf` });
    Font.register({ family: "AdobeArabic", src: `${FONT_BASE_URL}/CSAvaVeni.ttf` });

    return (
        <Document>
            <Page size={{ height: "720", width: "405" }} orientation="landscape" style={styles.page}>
                {data.type === "reading" && <Reading {...data} />}
            </Page>
        </Document>
    );
};
