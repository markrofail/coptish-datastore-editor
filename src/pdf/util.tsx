import { Root, MultiLingualTextArray, MultiLingualText } from "@/types";
import { pdf } from "@react-pdf/renderer";
import { MyDocument } from "./main";

export const exportToPdf = async (data: Root, filename: string) => {
    const blob = await pdf(<MyDocument data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};

/**
 * Converts a MultiLingualTextArray to an array of MultiLingualText objects.
 * Each index of the arrays in MultiLingualTextArray becomes a MultiLingualText object.
 * @param textArray - The MultiLingualTextArray to convert.
 * @returns An array of MultiLingualText objects.
 */
export const convertMultiLingualTextArrayToMultiLingualText = (
    textArray: MultiLingualTextArray,
): MultiLingualText[] => {
    // Get the keys (languages) dynamically from the input object
    const languages = Object.keys(textArray) as (keyof MultiLingualTextArray)[];

    // Determine the length of the longest array
    const lengths = languages.map((lang) => textArray[lang]?.length || 0);
    const maxLength = Math.max(...lengths);

    // Create an array of MultiLingualText objects
    const result: MultiLingualText[] = [];
    for (let i = 0; i < maxLength; i++) {
        const textObj: MultiLingualText = {};
        languages.forEach((lang) => {
            if (textArray[lang] && textArray[lang]![i]) {
                textObj[lang] = textArray[lang]![i];
            }
        });
        result.push(textObj);
    }

    return result;
};
