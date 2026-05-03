import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Avatar,
  Stack,
  Button,
  
} from "@mui/material";
import StatCard from './StatCard';
import { useNavigate } from "react-router-dom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import useCallsStore from 'hooks/useCallsStore';
import { useEffect} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function UploadCall() {
  // ---------------- DATA ----------------
const navigate = useNavigate();

const { calls } = useCallsStore();


 const latestCalls = calls.slice(0, 5);

const sentimentColor = {
  positive: 'success',
  negative: 'error',
  neutral: 'default'
};
const priorityColor = {
  high: 'error',
  medium: 'warning',
  low: 'success'
};
const stateColor = {
  pending: 'warning',
  in_progress: 'info',
  completed: 'success',
  rejected: 'error'
};
const statusLabel = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  rejected: 'Rejected'
};

const overviewData = [
  { label: "Neutral Calls", value: 90, color: "secondary" },
  { label: "Positive Calls", value: 20, color: "success" },
  { label: "Negative Calls", value: 45, color: "error" },
  { label: "Follow-up", value: 30, color: "warning" }
];

  const sentimentChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Positive",
        data: [3, 5, 4, 6, 2, 4, 3],
        backgroundColor: "#2ecc71",
        borderRadius: 5,
        barThickness: 14
      },
      {
        label: "Negative",
        data: [2, 3, 5, 2, 4, 3, 2],
        backgroundColor: "#e74c3c",
        borderRadius: 5,
        barThickness: 14
      }
    ]
  };

  const sentimentChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
const topIssues = [
  { issue: "Billing Problem", percent: 45, color: "error" },
  { issue: "Technical Issue", percent: 35, color: "warning" },
  { issue: "Account Access", percent: 25, color: "info" },
  { issue: "Other", percent: 10, color: "success" }
];

  const keywords = ["refund", "delay", "password", "cancel", "support", "error"];
  

  // ---------------- UI ----------------

  return (
    
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>

      {/* ===================== PRIORITY CARDS (TYPE 1 — ANALYTICS CARDS) ===================== */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          '@media (max-width: 900px)': { flexDirection: "column" }
        }}
      >

        {/* HIGH PRIORITY */}
        <Card sx={{ flex: 1, minWidth: 0 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "error.light", width: 48, height: 48 }}>
              <PriorityHighIcon color="error" />
            </Avatar>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                High Priority
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>45</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* MEDIUM PRIORITY */}
        <Card sx={{ flex: 1, minWidth: 0 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "warning.light", width: 48, height: 48 }}>
              <ReportProblemIcon color="warning" />
            </Avatar>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Medium Priority
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>70</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* LOW PRIORITY */}
        <Card sx={{ flex: 1, minWidth: 0 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "success.light", width: 48, height: 48 }}>
              <LowPriorityIcon color="success" />
            </Avatar>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Low Priority
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>120</Typography>
            </Box>
          </CardContent>
        </Card>

      </Box>

      {/* ===================== OVERVIEW + SENTIMENT ===================== */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          '@media (max-width: 900px)': { flexDirection: "column" }
        }}
      >

        {/* OVERVIEW */}


<Card sx={{ flex: 1, minWidth: 0 }}>
  <CardContent>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Overview
    </Typography>

    <Divider sx={{ my: 2 }} />

    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <StatCard data={overviewData} />
    </Box>
  </CardContent>
</Card>

        {/* SENTIMENT */}
        <Card sx={{ flex: 1, minWidth: 0 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Sentiment
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ height: 220, mt: 1 }}>
              <Bar data={sentimentChartData} options={sentimentChartOptions} />
            </Box>
          </CardContent>
        </Card>

      </Box>

      {/* ===================== TABLE ===================== */}
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Latest Calls
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sentiment</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Reviewed</TableCell>
                <TableCell>Uploaded By</TableCell>

                 <TableCell align="right">Actions</TableCell> 
              </TableRow>
            </TableHead>

            <TableBody>
              {latestCalls.map((call) => (
                <TableRow key={call.id}>
    <TableCell>{call.id}</TableCell>
    
    <TableCell>
      <Chip label={call.priority} color={priorityColor[call.priority]} size="small" />
    </TableCell>
     <TableCell> 
     <Chip label={statusLabel[call.status] || call.status}
           color={stateColor[call.status]}
           size="small" />
           </TableCell>
<TableCell>
      <Chip label={call.sentiment} color={sentimentColor[call.sentiment]} size="small" />
    </TableCell>
 <TableCell>{call.duration}</TableCell>

    <TableCell sx={{ direction: 'ltr', textAlign: 'left' }}>
  {call.createdAt}
</TableCell>
  <TableCell>
      <Chip label={call.reviewed} color={call.reviewed === 'Yes' ? 'success' : 'error'} size="small" />
    </TableCell>  

    <TableCell>{call.uploadedBy}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        size="small"
                        variant="outlined"
                       onClick={() =>
                        navigate("/calls", { state: { selectedCallId: call.id } })
                       }
                        sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 2,
                        }}
                      >
                        View
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ===================== TOP ISSUES + KEYWORDS ===================== */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          '@media (max-width: 900px)': { flexDirection: "column" }
        }}
      >
<Card sx={{ flex: 1, minWidth: 0, borderRadius: 3 }}>
  <CardContent>
    <Typography variant="h6" sx={{ fontWeight: 600 }} >
      Top Issues
    </Typography>

    <Divider sx={{ my: 2 }} />
<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
  {topIssues.map((issue) => (
    <Box
      key={issue.issue}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        transition: "0.25s",
          zIndex: 1

      }}
    >
      {/* glow */}
     <Box
  sx={{
    position: "absolute",
    top: -30,
    right: -30,
    width: 140,
    height: 140,

    borderRadius: "50%",

    background: 
      
        issue.percent > 40
          ? "#FCE7F3"
          : issue.percent > 30
          ? "#F3E8FF"
          : issue.percent > 20
          ? "#FEF9C3"
          : "#D1D5DB",

    transform: "translate(40%, -40%)",
    filter: "blur(2px)",

    opacity: 1,
    pointerEvents: "none",
    zIndex: 0
  }}
/>

      {/* header */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
    position: "relative", 
    zIndex: 2 
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Typography sx={{ fontWeight: 600 }}>
      {issue.issue}
    </Typography>

    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: "text.secondary",
        px: 1,
        py: 0.3,
        borderRadius: 1
      }}
    >
      {issue.percent}%
    </Typography>
  </Box>
</Box>

      {/* bar */}
      <Box
        sx={{
          mt: 2,
          height: 6,
          borderRadius: 5,
          backgroundColor: "action.hover",
          overflow: "hidden",
          position: "relative",
           zIndex: 2 
        }}
      >
        <Box
          sx={{
            width: `${issue.percent}%`,
            height: "100%",
            background:
              issue.percent > 40
                ? "#EC4899"
                : issue.percent > 30
                ? "#A855F7"
                : issue.percent > 20
                ? "#FDE047"
                : "#6B7280",
            borderRadius: 5
          }}
        />
      </Box>
    </Box>
  ))}
</Box>
</CardContent>
 </Card>
        {/* KEYWORDS */}
        <Card sx={{ flex: 1, minWidth: 0 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Keywords
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
              {keywords.map((word) => (
                <Chip key={word} label={word} variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </Card>

      </Box>

    </Box>
    
  );

}
