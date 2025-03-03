import { parse, stringify } from "yaml";
import { Root } from "@/types";

export const loadYmlFile = async (file?: File): Promise<{ name?: string; data?: Root; error?: Error }> => {
    if (!file) return { error: new Error("No file provided") };

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const text = reader.result as string;
                resolve({ name: file.name, data: parse(text) });
            } catch (error) {
                console.error("Error parsing JSON:", error);
                reject({ error });
            }
        };

        reader.onerror = () => reject({ error: reader.error });
        reader.readAsText(file);
    });
};

export function ymlToUrl(data: Root) {
    const yamlData = stringify(data, { lineWidth: 9999999999 });
    const blob = new Blob([yamlData], { type: "text/yaml" });
    return URL.createObjectURL(blob);
}
