import React from "react";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";

function StatCard({ data }) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Paper
      sx={{
        width: 400,
        height:350,
        p: 3,
        borderRadius: 3,
        background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}
    >
      {/* 🔥 Header — Total Calls + Number بنفس السطر */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Total Calls:
        </Typography>

        <Typography variant="h5" fontWeight={600}>
          {total}
        </Typography>
      </Box>

      {/* 📊 List */}
      {data.map((item, index) => {
        const percent = total ? (item.value / total) * 100 : 0;

        return (
          <Box key={index} sx={{ mb: 2 }}>
            {/* label + value */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2.5
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>

              <Typography variant="body2" fontWeight={600}>
                {item.value}
              </Typography>
            </Box>

            {/* progress */}
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{
                height: 6,
                borderRadius: 5,
                backgroundColor: "#EEF2F6",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: item.color,
                  borderRadius: 5
                }
              }}
            />
          </Box>
        );
      })}
    </Paper>
  );
}

export default StatCard;
