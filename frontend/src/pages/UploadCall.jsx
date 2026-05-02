import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip
} from "@mui/material";

export default function UploadCall() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setUploaded(false);
  };

  const onUpload = () => {
    if (!selectedFile) return;
    setUploaded(true);
  };

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          Upload Call
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload audio files for call analysis workflow
        </Typography>

        {/* Upload Section */}
        <Stack spacing={2}>
          <Button variant="outlined" component="label">
            Select Audio File
            <input type="file" accept="audio/*" hidden onChange={onFileChange} />
          </Button>

         

        </Stack>

    
       
      </CardContent>
    </Card>
  );
}