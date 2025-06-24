import React from "react";
import { MultiLingualText as MultiLingualTextT } from "../types";
import { StyleSheet } from "@react-pdf/renderer";
import { Text, TextProps } from "./Text";
import { View } from "./View";
// import { ZOOM_MULTIPLIER } from "../constants";

interface MultiLingualTextProps extends MultiLingualTextT, Pick<TextProps, "color" | "variant" | "bold" | "center"> {}

export const MultiLingualText = ({
    english,
    coptic,
    coptic_english,
    coptic_arabic,
    arabic,
    ...props
}: MultiLingualTextProps) => {
    return (
        <View direction="row" style={{ backgroundColor: "black", flex: 1 }} gap="xs" break>
            {!!english && (
                <View style={{ flex: 1, ...styles.english }}>
                    <Text language="english" text={english} {...props} />
                </View>
            )}
            {!!coptic_english && (
                <View style={{ flex: 1, ...styles.english }}>
                    <Text language="english" text={coptic_english} {...props} />
                </View>
            )}
            {!!arabic && <Text style={styles.all} language="arabic" text={arabic} {...props} />}
            {!!coptic && (
                <View style={[styles.all]}>
                    <Text language="coptic" text={coptic} {...props} />
                </View>
            )}
            {!!coptic_arabic && (
                <View style={[styles.all]}>
                    <Text language="arabic" text={coptic_arabic} {...props} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    all: { justifyContent: "center", flex: 1 },
    english: {},
    coptic: {},
    arabic: {},
});
