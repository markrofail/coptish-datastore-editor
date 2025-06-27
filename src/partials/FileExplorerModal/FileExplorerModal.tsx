import React, { useEffect } from "react";
import { Box, Dialog, DialogTitle, DialogContent, Typography, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FolderIcon from "@mui/icons-material/Folder";
import FileIcon from "@mui/icons-material/Description";
import { useTranslations } from "next-intl";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import { MultiLingualText, Root } from "@/types";
import { useFetchFile } from "./utils";
import { useLocale } from "@/app/providers";

const ExplorerContentBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(0.5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    maxHeight: 300,
    overflowY: "auto",
}));

interface Node {
    id: string;
    name: string;
    path: string;
    title?: MultiLingualText;
    children?: Node[];
}

export interface FileExplorerModalProps {
    directory: Node;
    onFileLoad: (fileName: string, data: Root) => void;
    open: boolean;
    onClose: () => void;
}
export const FileExplorerModal = ({ directory, onFileLoad, open, onClose }: FileExplorerModalProps) => {
    const { dir } = useLocale();
    const { fetchFile, fileName, fileContent } = useFetchFile();
    const t = useTranslations();

    useEffect(() => {
        if (fileContent) onFileLoad(fileName, fileContent);
    }, [fileContent, fileName, onFileLoad]);

    const onSelect = async (node: Node) => {
        if (!!node.children) return;

        onClose();
        await fetchFile({ filePath: node.path });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" dir={dir} fullWidth>
            <DialogTitle>{t("FileExplorer.heading-database")}</DialogTitle>
            <DialogContent>
                <ExplorerContentBox
                    id="file-explorer-content"
                    role="region"
                    aria-label={t("FileExplorer.heading-database")}
                >
                    <SimpleTreeView
                        slots={{
                            collapseIcon: ExpandMoreIcon,
                            expandIcon: dir === "ltr" ? ChevronRightIcon : ChevronLeftIcon,
                        }}
                        sx={{ flexGrow: 1, maxWidth: 400, width: "100%", overflowY: "auto" }}
                    >
                        {directory.children?.map((node) => (
                            <DirectoryTree key={node.id} node={node} onSelect={onSelect} />
                        ))}
                    </SimpleTreeView>
                </ExplorerContentBox>
            </DialogContent>
        </Dialog>
    );
};

const DirectoryTree = ({ node, onSelect }: { node: Node; onSelect: (node: Node) => void }) => {
    const { locale } = useLocale();
    const isFolder = !!node.children;

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
                    sx={{
                        padding: 0.5,
                        borderRadius: 0.5,
                    }}
                    role={isFolder ? "button" : "menuitem"}
                    aria-label={isFolder ? `${node.name} folder` : `${node.name} file`}
                >
                    {!isFolder ? (
                        <FileIcon sx={{ mr: 1, fontSize: "small", color: "text.secondary" }} />
                    ) : (
                        <FolderIcon sx={{ mr: 1, fontSize: "small", color: "primary.main" }} />
                    )}
                    {locale === "en" && node.title?.english ? (
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                            {node.title.english}
                        </Typography>
                    ) : locale === "ar" && node.title?.arabic ? (
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                            {node.title.arabic}
                        </Typography>
                    ) : (
                        <Typography variant="body2" dir="ltr" sx={{ color: "text.primary" }}>
                            {node.name}
                        </Typography>
                    )}
                </Box>
            }
            sx={{ "& .MuiTreeItem-content": { padding: 0 } }}
        >
            {node.children?.map((n, i) => <DirectoryTree key={i} node={n} onSelect={onSelect} />)}
        </TreeItem>
    );
};
