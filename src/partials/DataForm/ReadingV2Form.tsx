import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { ReadingV2, Root } from "@/types";
import { useTranslations } from "next-intl";
import { ReadingForm } from "./ReadingForm";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";

interface ReadingFormProps {
    formData: ReadingV2;
    setFormData: React.Dispatch<React.SetStateAction<Root>>;
}

export const ReadingV2Form = ({ formData, setFormData }: ReadingFormProps) => {
    const { title, ...rest } = formData;
    console.log({ formData });
    const t = useTranslations("ReadingSection");

    return (
        <>
            <Box>
                <MultiLingualTextForm value={title} onChange={() => {}} languages={["english", "coptic", "arabic"]} />
                {Object.entries(rest).map(([readingType, readings]) => (
                    <Fragment key={readingType}>
                        <Typography variant="h5"> {t(`readingType-field-option-${readingType}`)}</Typography>
                        {readings.map((reading, i) => (
                            <Fragment key={i}>
                                <MultiLingualTextForm
                                    value={reading.title}
                                    onChange={() => {}}
                                    languages={["english", "coptic", "arabic"]}
                                />
                                <ReadingForm formData={reading} setFormData={setFormData} />
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </Box>
        </>
    );
};
