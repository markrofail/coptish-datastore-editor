import React, { useEffect } from "react";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Typography, Box } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/Description";
import { MultiLingualText, Prayer } from "@/types";
import { useFetchJson } from "./utils";

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
    const { fetchJson, fileName, jsonData } = useFetchJson();

    useEffect(() => {
        if (jsonData) {
            console.log(jsonData);
            onFileLoad(fileName, jsonData);
        }
    }, [jsonData]);

    const onSelect = (node: Node) => {
        if (!!node.children) return;

        console.log(node);
        fetchJson({ filePath: node.path });
    };

    return (
        <SimpleTreeView
            slots={{ collapseIcon: ExpandMoreIcon, expandIcon: ChevronRightIcon }}
            sx={{ flexGrow: 1, maxWidth: 400, width: 400, overflowY: "auto" }}
        >
            {directory.children?.map((node) => <DirectoryTree key={node.id} node={node} onSelect={onSelect} />)}
        </SimpleTreeView>
    );
};

const DirectoryTree = ({ node, prefix, onSelect }: { node: Node; prefix?: string; onSelect: (node: Node) => void }) => {
    return (
        <TreeItem
            key={node.id}
            itemId={node.id}
            label={
                <Box display="flex" alignItems="center" onDoubleClick={() => onSelect(node)}>
                    {!node.children ? (
                        <FileIcon sx={{ mr: 1, fontSize: "small" }} />
                    ) : (
                        <FolderIcon sx={{ mr: 1, fontSize: "small" }} />
                    )}
                    {prefix && !node.children && (
                        <Typography variant="body2">
                            {prefix}
                            {"- "}
                        </Typography>
                    )}
                    {node.title ? (
                        <Box display="flex" flexDirection="row" justifyContent="space-between" flex={1}>
                            <Typography variant="body2">{node.title.english}</Typography>
                            <Typography variant="body2">{node.title.arabic}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2">{node.name}</Typography>
                    )}
                </Box>
            }
        >
            {node.children?.map((n, i) => <DirectoryTree key={i} prefix={`${i + 1}`} node={n} onSelect={onSelect} />)}
        </TreeItem>
    );
};
