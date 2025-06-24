import React, { ReactNode } from "react";
import { View as PDFView, ViewProps, StyleSheet } from "@react-pdf/renderer";
// import { ZOOM_MULTIPLIER } from "../constants";

const ZOOM_MULTIPLIER = 1; // Adjust this multiplier as needed

export type Spacing = "xxs" | "xs" | "s" | "m" | "l" | "xl";
export type Direction = "row" | "column";

export interface StackProps extends ViewProps {
    // spacing props
    spaceAbove?: Spacing;
    spaceBelow?: Spacing;
    spaceLeft?: Spacing;
    spaceRight?: Spacing;
    spaceVertical?: Spacing;
    spaceHorizontal?: Spacing;

    margin?: Spacing;
    padding?: Spacing;

    // flex props
    direction?: Direction;
    gap?: Spacing;
    centered?: boolean;

    children?: ReactNode;
}

export const View = ({
    spaceAbove,
    spaceBelow,
    spaceLeft,
    spaceRight,
    spaceHorizontal,
    spaceVertical,
    margin,
    padding,
    direction,
    gap,
    centered,
    children,
    style,
    ...rest
}: StackProps) => {
    const marginStyle = marginStyles[margin ?? "none"];
    const spacingStyles = {
        ...spaceAboveStyles[spaceAbove ?? spaceVertical ?? "none"],
        ...spaceBelowStyles[spaceBelow ?? spaceVertical ?? "none"],
        ...spaceLeftStyles[spaceLeft ?? spaceHorizontal ?? "none"],
        ...spaceRightStyles[spaceRight ?? spaceHorizontal ?? "none"],
        ...paddingStyles[padding ?? "none"],
    };
    const flexStyles = {
        ...gapStyles[gap ?? "none"],
        flexDirection: direction,
        justifyContent: centered ? ("center" as const) : undefined,
    };

    return (
        <PDFView
            style={{
                ...spacingStyles,
                ...flexStyles,
                ...marginStyle,
                ...style,
            }}
            {...rest}
        >
            {children}
        </PDFView>
    );
};

const createSpaceStyles = (
    property: "marginTop" | "marginBottom" | "marginLeft" | "marginRight" | "gap" | "margin" | "padding",
) =>
    StyleSheet.create({
        none: {},
        xxs: { [property]: 2 * ZOOM_MULTIPLIER + "pt" },
        xs: { [property]: 4 * ZOOM_MULTIPLIER + "pt" },
        s: { [property]: 8 * ZOOM_MULTIPLIER + "pt" },
        m: { [property]: 16 * ZOOM_MULTIPLIER + "pt" },
        l: { [property]: 24 * ZOOM_MULTIPLIER + "pt" },
        xl: { [property]: 32 * ZOOM_MULTIPLIER + "pt" },
    });

const gapStyles = createSpaceStyles("gap");
const spaceBelowStyles = createSpaceStyles("marginBottom");
const spaceAboveStyles = createSpaceStyles("marginTop");
const paddingStyles = createSpaceStyles("padding");
const marginStyles = createSpaceStyles("margin");
const spaceLeftStyles = createSpaceStyles("marginLeft");
const spaceRightStyles = createSpaceStyles("marginRight");
