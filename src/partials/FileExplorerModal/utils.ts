import { useState } from "react";
import { Root } from "@/types";
import { parse } from "yaml";

interface DownloadFileProps {
    repoOwner?: string;
    repoName?: string;
    branch?: string;
    filePath: string;
}

export const useFetchFile = () => {
    const [fileContent, setFileContent] = useState<Root>();
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    const fetchFile = async ({
        filePath,
        repoOwner = "markrofail",
        repoName = "coptish-datastore",
        branch = "main",
    }: DownloadFileProps) => {
        const rawFileUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${filePath}`;

        try {
            const response = await fetch(rawFileUrl);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch YAML: ${response.status} - ${errorText || "Unknown error"}`);
            }

            const text = await response.text();
            setFileContent(parse(text) as Root);
            setFileName(filePath.split("/").pop() || "");
        } catch (error) {
            console.error("Error fetching YAML:", error);
            if (error instanceof Error) setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { fetchFile, fileName, fileContent, loading, error };
};
