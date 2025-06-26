import React, { Dispatch, Fragment, SetStateAction } from "react";
import _ from "lodash";
import { Box, IconButton, Typography } from "@mui/material";
import {
    MultiLingualText,
    MultiLingualTextArray,
    Reading,
    ReadingType,
    ReadingTypeEnum,
    Root,
    SubReading,
} from "@/types";
import { useTranslations } from "next-intl";
import { MultiLingualTextForm } from "@/components/MultiLingualTextForm";
import { MultiLingualTextArrayForm } from "@/components/MultiLingualTextArrayForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const READING_TYPES = Object.values(ReadingTypeEnum).filter((type) => type !== ReadingTypeEnum.Synaxarium);

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

    const handleSubReadingAdd = (readingType: ReadingType) => {
        setFormData((prev) => {
            const prevReading = prev as Reading;
            return {
                ...prevReading,
                [readingType]: [...(prevReading[readingType] || []), { title: {}, text: [] }],
            };
        });
    };

    const handleSubReadingDelete = (readingType: ReadingType, index: number) => {
        setFormData((prev) => {
            const prevReading = prev as Reading;
            const updated = [...(prevReading[readingType] || [])];
            updated.splice(index, 1);
            return {
                ...prev,
                [readingType]: updated,
            };
        });
    };

    return (
        <Box>
            {READING_TYPES.map((readingType) => (
                <Fragment key={readingType}>
                    <EachReadingForm
                        readingType={readingType as ReadingType}
                        readings={rest[readingType] || []}
                        languages={languages}
                        onReadingsAdd={handleSubReadingAdd}
                        onReadingDelete={handleSubReadingDelete}
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
    onReadingsAdd: (readingType: ReadingType) => void;
    onReadingDelete: (readingType: ReadingType, index: number) => void;
}
const EachReadingForm = ({
    readingType,
    readings,
    languages,
    onReadingChange,
    onTitleChange,
    onReadingsAdd,
    onReadingDelete,
}: EachReadingFormProps) => {
    const t = useTranslations("ReadingSection");
    return (
        <Box sx={{ marginBottom: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Typography variant="h5">{t(`readingType-field-option-${readingType}`)}</Typography>
                <IconButton onClick={() => onReadingsAdd(readingType)} size="small" color="primary">
                    <AddIcon fontSize="small" />
                </IconButton>
            </Box>

            {readings.map((reading, i) => (
                <Box
                    key={i}
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        padding: 2,
                        mb: 2,
                        gap: 2,
                        position: "relative",
                        backgroundColor: "#fff",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="subtitle1">
                            {t("readingType-field-label")} {i + 1}
                        </Typography>
                        <IconButton
                            onClick={() => onReadingDelete(readingType, i)}
                            size="small"
                            color="error"
                            aria-label={`Delete subreading ${i + 1}`}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <MultiLingualTextForm
                        value={reading.title}
                        onChange={onTitleChange(readingType, i)}
                        languages={languages}
                    />
                    <MultiLingualTextArrayForm
                        value={reading.text}
                        onChange={onReadingChange(readingType, i)}
                        languages={languages}
                        direction="row"
                        multiline
                    />
                </Box>
            ))}
        </Box>
    );
};
