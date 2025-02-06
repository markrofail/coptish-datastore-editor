import { Typography, IconButton, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const Header = ({
  onSave,
  onLoad,
}: {
  onSave: () => void;
  onLoad: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box sx={{ flex: 1, display: "flex" }}>
      <Typography variant="h2" component="div" sx={{ flex: 1 }}>
        Data Input Form
      </Typography>

      <Box>
        {/* Load Button */}
        <IconButton color="inherit" onClick={onSave}>
          <SaveIcon />
        </IconButton>

        {/* SaveButton */}
        <IconButton
          color="inherit"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <CloudUploadIcon />
        </IconButton>
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          onChange={onLoad}
        />
      </Box>
    </Box>
  );
};
