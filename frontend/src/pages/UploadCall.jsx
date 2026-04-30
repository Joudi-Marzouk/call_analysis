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

  const latestCalls = [
    { id: 1, status: "completed", sentiment: "positive", priority: "high", reviewed: "Yes" },
    { id: 2, status: "pending", sentiment: "negative", priority: "medium", reviewed: "No" },
    { id: 3, status: "completed", sentiment: "neutral", priority: "low", reviewed: "Yes" },
    { id: 4, status: "pending", sentiment: "positive", priority: "medium", reviewed: "No" },
    { id: 5, status: "completed", sentiment: "negative", priority: "high", reviewed: "Yes" }
  ];

  const sentimentColor = {
    positive: "success",
    negative: "error",
    neutral: "info"
  };

  const priorityColor = {
    high: "error",
    medium: "warning",
    low: "success"
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

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Selected file
            </Typography>

            <Typography variant="body1">
              {selectedFile ? selectedFile.name : "No file selected"}
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>

          {uploaded && (
            <Alert severity="success">
              File uploaded successfully (mock).
            </Alert>
          )}
        </Stack>

        {/* Table */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Latest Calls
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sentiment</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Reviewed</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {latestCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>{call.id}</TableCell>
                  <TableCell>{call.status}</TableCell>

                  <TableCell>
                    <Chip
                      label={call.sentiment}
                      color={sentimentColor[call.sentiment]}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={call.priority}
                      color={priorityColor[call.priority]}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={call.reviewed}
                      color={call.reviewed === "Yes" ? "success" : "error"}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}