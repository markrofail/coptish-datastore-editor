import React, { Fragment, useState } from "react";
import _ from "lodash";
import { Box, IconButton, Typography } from "@mui/material";
import { MultiLingualText, Reading, ReadingType, ReadingV2, Root } from "@/types";
import { useTranslations } from "next-intl";
import { ReadingForm } from "./ReadingForm";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import EditModeIcon from "@mui/icons-material/Edit";
import ViewModeIcon from "@mui/icons-material/ChromeReaderMode";
interface ReadingFormProps {
    formData: ReadingV2;
    setFormData: React.Dispatch<React.SetStateAction<Root>>;
}

export const ReadingV2Form = ({ formData, setFormData }: ReadingFormProps) => {
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    const { title, ...rest } = formData;

    const handleReadingChange = (readingType: ReadingType, index: number) => (value: Reading) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            _.set(newData, [readingType, index], value);
            return newData;
        });
    };

    const handleTitleChange = (readingType: ReadingType, index: number) => (value: MultiLingualText) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            _.set(newData, [readingType, index, "title"], value);
            return newData;
        });
    };

    return (
        <>
            <Box>
                {Object.entries(rest).map(([readingType, readings]) => (
                    <Fragment key={readingType}>
                        <EachReadingForm
                            readingType={readingType as ReadingType}
                            readings={readings}
                            onReadingChange={handleReadingChange}
                            onTitleChange={handleTitleChange}
                        />
                    </Fragment>
                ))}
            </Box>
        </>
    );
};

interface EachReadingFormProps {
    readingType: ReadingType;
    readings: Reading[];
    onReadingChange: (readingType: ReadingType, index: number) => (value: Reading) => void;
    onTitleChange: (readingType: ReadingType, index: number) => (value: MultiLingualText) => void;
}
const EachReadingForm = ({ readingType, readings, onReadingChange, onTitleChange }: EachReadingFormProps) => {
    const t = useTranslations("ReadingSection");
    const [mode, setMode] = useState<"view" | "edit">("view");

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h5"> {t(`readingType-field-option-${readingType}`)}</Typography>
                <Box>
                    <IconButton color="primary" onClick={() => setMode((prev) => (prev === "edit" ? "view" : "edit"))}>
                        {mode === "view" ? <EditModeIcon /> : <ViewModeIcon />}
                    </IconButton>
                </Box>
            </Box>
            {readings.map((reading, i) => (
                <Fragment key={i}>
                    <MultiLingualTextForm
                        value={reading.title}
                        onChange={onTitleChange(readingType, i)}
                        languages={["english", "arabic"]}
                        mode={mode}
                    />
                    {/* eslint-disable @typescript-eslint/no-explicit-any */}
                    <ReadingForm formData={reading} setFormData={onReadingChange(readingType, i) as any} mode={mode} />
                </Fragment>
            ))}
        </Box>
    );
};
