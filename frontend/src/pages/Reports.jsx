import { useState,useEffect } from 'react';
import {
  Box, Button, Card, CardContent, Typography, Dialog,
  DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Stack, Chip, Table, TableBody,
  TableCell, TableHead, TableRow, Divider
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [form, setForm] = useState({
    type: 'daily',
    from: '',
    to: ''
  });

  const handleGenerate = () => {
    const newReport = {
      id: Date.now(),
      type: form.type,
      from: form.from,
      to: form.to,
      status: 'draft',
      createdBy: 'QA',
      createdAt: new Date().toISOString(),
      summary: '',
      positives: '',
      recommendations: '',
      sentiment: { positive: 60, neutral: 25, negative: 15 },
      topIssues: ['Delay', 'Bad audio', 'Agent tone', 'Missing info', 'Escalation']
    };

    setReports([newReport, ...reports]);
    setOpenForm(false);
  };

  const handlePublish = () => {
    setReports(reports.map(r =>
      r.id === selectedReport.id ? { ...r, status: 'published' } : r
    ));
    setOpenView(false);
  };

useEffect(() => {
  const saved = localStorage.getItem('reports');
  if (saved) {
    setReports(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem('reports', JSON.stringify(reports));
}, [reports]);

  return (
   <Box p={3}>

  <Card sx={{ borderRadius: 3 }}>
    <CardContent>

      {/* HEADER INSIDE CARD */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" gutterBottom sx={{ padding: '16px 2px' }}>
          Reports
        </Typography>

        <Button
          variant="contained"
          startIcon={<IconPlus />}
          onClick={() => setOpenForm(true)}
        >
          Generate 
        </Button>
      </Stack>

      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "30%" }} >Period</TableCell>
            <TableCell sx={{ width: "25%" }}>Type</TableCell>
            <TableCell sx={{ width: "25%" }}>Status</TableCell>
            <TableCell>Created By</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {[...reports]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(r => (
            <TableRow
              key={r.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setSelectedReport(r);
                setOpenView(true);
              }}
            >
              <TableCell>{r.from} → {r.to}</TableCell>

              <TableCell>
                <Chip label={r.type} size="small" color="primary" variant="outlined" />
              </TableCell>

              <TableCell>
                <Chip
                  label={r.status}
                  color={r.status === 'published' ? 'success' : 'warning'}
                  size="small"
                />
              </TableCell>

              <TableCell>{r.createdBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </CardContent>
  </Card>

      {/* CREATE DIALOG */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>Generate New Report</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={2}>

            <TextField
              select
              label="Report Type"
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              fullWidth
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
            </TextField>

            <Stack direction="row" spacing={2}>
              <TextField
                type="date"
                label="From"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={e => setForm({ ...form, from: e.target.value })}
              />

              <TextField
                type="date"
                label="To"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={e => setForm({ ...form, to: e.target.value })}
              />
            </Stack>

          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGenerate}>
            Generate
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIEW REPORT */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth maxWidth="md">
        <DialogTitle>Report Details</DialogTitle>

        {selectedReport && (
          <DialogContent>
            <Stack spacing={3} mt={1}>

              <TextField
                label="Summary (Issues & Solutions)"
                multiline
                minRows={3}
                value={selectedReport.summary}
                onChange={e =>
                  setSelectedReport({ ...selectedReport, summary: e.target.value })
                }
              />

              <TextField
                label="Positives"
                multiline
                minRows={2}
                value={selectedReport.positives}
                onChange={e =>
                  setSelectedReport({ ...selectedReport, positives: e.target.value })
                }
              />

              <TextField
                label="Recommendations"
                multiline
                minRows={2}
                value={selectedReport.recommendations}
                onChange={e =>
                  setSelectedReport({ ...selectedReport, recommendations: e.target.value })
                }
              />

              <Divider />

              {/* Sentiment */}
              <Typography fontWeight={600}>
                Sentiment Analysis
              </Typography>

              <Stack direction="row" spacing={2}>
                <Chip label={`Positive ${selectedReport.sentiment.positive}%`} color="success" />
                <Chip label={`Neutral ${selectedReport.sentiment.neutral}%`} color="warning" />
                <Chip label={`Negative ${selectedReport.sentiment.negative}%`} color="error" />
              </Stack>

              {/* Issues */}
              <Box>
                <Typography fontWeight={600}>Top Issues</Typography>
                <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                  {selectedReport.topIssues.map((issue, i) => (
                    <Chip key={i} label={issue} />
                  ))}
                </Stack>
              </Box>

            </Stack>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>

          {selectedReport?.status === 'draft' && (
            <Button variant="contained" onClick={handlePublish}>
              Publish 
            </Button>
          )}
        </DialogActions>
      </Dialog>

    </Box>
  );
}