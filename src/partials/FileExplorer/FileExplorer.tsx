import React, { useEffect } from "react";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Typography, Box, Tooltip } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/Description";
import { MultiLingualText, Prayer } from "@/types";
import { useFetchFile } from "./utils";
import { useLocale } from "@/app/providers";

interface Node {
    id: string;
    name: string;
    path: string;
    title?: MultiLingualText;
    children?: Node[];
}

interface FileExplorerProps {
    directory: Node;
    onFileLoad: (fileName: string, data: Prayer) => void;
}
export const FileExplorer = ({ directory, onFileLoad }: FileExplorerProps) => {
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
        <SimpleTreeView
            slots={{ collapseIcon: ExpandMoreIcon, expandIcon: dir === "ltr" ? ChevronRightIcon : ChevronLeftIcon }}
            sx={{ flexGrow: 1, maxWidth: 400, width: 400, overflowY: "auto" }}
        >
            {directory.children?.map((node) => <DirectoryTree key={node.id} node={node} onSelect={onSelect} />)}
        </SimpleTreeView>
    );
};

const DirectoryTree = ({ node, onSelect }: { node: Node; onSelect: (node: Node) => void }) => {
    return (
        <TreeItem
            key={node.id}
            itemId={node.id}
            label={
                <Tooltip
                    title={
                        node.title ? (
                            <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
                                <Typography variant="body2">{node.title.english}</Typography>
                                <Typography variant="body2">{node.title.arabic}</Typography>
                            </Box>
                        ) : undefined
                    }
                >
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
                        <Typography variant="body2">{node.name}</Typography>
                    </Box>
                </Tooltip>
            }
        >
            {node.children?.map((n, i) => <DirectoryTree key={i} node={n} onSelect={onSelect} />)}
        </TreeItem>
    );
};
