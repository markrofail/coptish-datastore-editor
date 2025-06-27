import React, { Fragment } from "react";
import { Reading as ReadingT, SubReading as SubReadingT } from "@/types";
import { MultiLingualText } from "./MultiLinguaglText";
import { convertMultiLingualTextArrayToMultiLingualText } from "./util";

/* eslint-disable  @typescript-eslint/no-unused-vars */
export const Reading = ({ title, type, ...readings }: Partial<ReadingT>) => {
    return (
        <>
            {Object.values(readings).map((subReadings, i) => (
                <Fragment key={i}>
                    {subReadings.map((subReading, j) => (
                        <SubReading key={j} {...subReading} />
                    ))}
                </Fragment>
            ))}
        </>
    );
};

const SubReading = ({ text }: SubReadingT) => {
    const reading = convertMultiLingualTextArrayToMultiLingualText(text);

    return (
        <>
            {reading.map((paragraph, i) => (
                <Fragment key={i}>
                    <MultiLingualText variant="body" color="white" {...paragraph} center />
                </Fragment>
            ))}
        </>
    );
};
