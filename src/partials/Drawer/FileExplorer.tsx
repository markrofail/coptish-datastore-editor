import React, { useEffect } from "react";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Typography, Box } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/Description";
import { MultiLingualText, Prayer } from "@/types";
import { useFetchFile } from "./utils";
import { useLocale } from "@/app/providers";
import { useTranslations } from "next-intl";

interface Node {
    id: string;
    name: string;
    path: string;
    title?: MultiLingualText;
    children?: Node[];
}

export interface FileExplorerProps {
    directory: Node;
    onFileLoad: (fileName: string, data: Prayer) => void;
}
export const FileExplorer = ({ directory, onFileLoad }: FileExplorerProps) => {
    const t = useTranslations("FileExplorer");
    const { dir } = useLocale();
    const { fetchFile, fileName, fileContent } = useFetchFile();

    useEffect(() => {
        if (fileContent) {
            onFileLoad(fileName, fileContent);
        }
    }, [fileContent]);

    const onSelect = (node: Node) => {
        if (!!node.children) return;

        console.log(node);
        fetchFile({ filePath: node.path });
    };

    return (
        <>
            <Typography variant="h6">{t("heading-database")}</Typography>
            <SimpleTreeView
                slots={{ collapseIcon: ExpandMoreIcon, expandIcon: dir === "ltr" ? ChevronRightIcon : ChevronLeftIcon }}
                sx={{ flexGrow: 1, maxWidth: 400, width: 400, overflowY: "auto" }}
            >
                {directory.children?.map((node) => <DirectoryTree key={node.id} node={node} onSelect={onSelect} />)}
            </SimpleTreeView>
        </>
    );
};

const DirectoryTree = ({ node, onSelect }: { node: Node; onSelect: (node: Node) => void }) => {
    const { locale } = useLocale();

    return (
        <TreeItem
            key={node.id}
            itemId={node.id}
            label={
                <Box
                    display="flex"
                    alignItems="center"
                    onDoubleClick={(e) => {
                        onSelect(node);
                        e.stopPropagation();
                    }}
                >
                    {!node.children ? (
                        <FileIcon sx={{ mr: 1, fontSize: "small" }} />
                    ) : (
                        <FolderIcon sx={{ mr: 1, fontSize: "small" }} />
                    )}
                    {locale === "en" && node.title?.english ? (
                        <Typography variant="body2">{node.title.english}</Typography>
                    ) : locale === "ar" && node.title?.arabic ? (
                        <Typography variant="body2">{node.title.arabic}</Typography>
                    ) : (
                        <Typography variant="body2">{node.name}</Typography>
                    )}
                </Box>
            }
        >
            {node.children?.map((n, i) => <DirectoryTree key={i} node={n} onSelect={onSelect} />)}
        </TreeItem>
    );
};
