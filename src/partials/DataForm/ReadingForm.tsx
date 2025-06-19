import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import _ from "lodash";
import { Box, IconButton, Typography } from "@mui/material";
import { MultiLingualText, MultiLingualTextArray, Reading, ReadingType, Root, SubReading } from "@/types";
import { useTranslations } from "next-intl";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import { MultiLingualTextArrayForm } from "@/components/MultiLingualTextArrayForm";
import EditModeIcon from "@mui/icons-material/Edit";
import ViewModeIcon from "@mui/icons-material/ChromeReaderMode";
interface ReadingFormProps {
    formData: Reading;
    languages: (keyof MultiLingualText)[];
    setFormData: Dispatch<SetStateAction<Root>>;
}

export const ReadingForm = ({ formData, languages, setFormData }: ReadingFormProps) => {
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    const { title, ...rest } = formData;

    const handleReadingChange = (readingType: ReadingType, index: number) => (value: MultiLingualTextArray) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            _.set(newData, [readingType, index, "text"], value);
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
        <Box>
            {Object.entries(rest).map(([readingType, readings]) => (
                <Fragment key={readingType}>
                    <EachReadingForm
                        readingType={readingType as ReadingType}
                        readings={readings}
                        languages={languages}
                        onReadingChange={handleReadingChange}
                        onTitleChange={handleTitleChange}
                    />
                </Fragment>
            ))}
        </Box>
    );
};

interface EachReadingFormProps {
    readingType: ReadingType;
    readings: SubReading[];
    languages: (keyof MultiLingualText)[];
    onReadingChange: (readingType: ReadingType, index: number) => (value: MultiLingualTextArray) => void;
    onTitleChange: (readingType: ReadingType, index: number) => (value: MultiLingualText) => void;
}
const EachReadingForm = ({
    readingType,
    readings,
    languages,
    onReadingChange,
    onTitleChange,
}: EachReadingFormProps) => {
    const t = useTranslations("ReadingSection");
    const [mode, setMode] = useState<"view" | "edit">("edit");

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
                        languages={languages}
                        mode={mode}
                    />
                    <Box>
                        {mode !== "view" && <Typography variant="h6">{t("text-field-label")}</Typography>}

                        <MultiLingualTextArrayForm
                            value={reading.text}
                            onChange={onReadingChange(readingType, i)}
                            languages={["english", "arabic"]}
                            direction="row"
                            mode={mode}
                            multiline
                        />
                    </Box>
                </Fragment>
            ))}
        </Box>
    );
};
