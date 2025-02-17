import { Prayer } from "@/types";
import { useState } from "react";

interface DownloadFileProps {
    repoOwner?: string;
    repoName?: string;
    branch?: string;
    filePath: string;
}

export const useFetchJson = () => {
    const [jsonData, setJsonData] = useState<Prayer>();
    const [fileName, setFileName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();

    const fetchJson = async ({
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
                throw new Error(`Failed to fetch JSON: ${response.status} - ${errorText || "Unknown error"}`);
            }

            const data = await response.json();
            setJsonData(data);
            setFileName(filePath.split("/").pop() || "");
        } catch (err) {
            console.error("Error fetching JSON:", err);
            if (err instanceof Error) setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchJson, jsonData, isLoading, error, fileName };
};
