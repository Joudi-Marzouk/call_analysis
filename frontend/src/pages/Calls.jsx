import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconEye, IconEdit, IconTrash, IconUsers,IconX, IconDots,IconRefresh, IconUpload } from '@tabler/icons-react';
import { Menu, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import useAuth from 'hooks/useAuth';

const calls = [
  {
    id: 'C-1001',
    status: 'pending',
    sentiment: 'positive',
    priority: 'high',
    reviewed: 'No',
    transcript: 'Customer requested an urgent callback regarding delayed delivery and billing mismatch.',
    issue: 'Delivery delay and invoice mismatch'
  },
  {
    id: 'C-1002',
    status: 'completed',
    sentiment: 'negative',
    priority: 'high',
    reviewed: 'Yes',
    transcript: 'Caller was frustrated due to repeated service interruption and asked for escalation.',
    issue: 'Service interruption complaint'
  },
  {
    id: 'C-1003',
    status: 'pending',
    sentiment: 'neutral',
    priority: 'medium',
    reviewed: 'No',
    transcript: 'Customer asked about subscription details and follow-up pricing confirmation.',
    issue: 'Subscription clarification'
  },
  {
    id: 'C-1004',
    status: 'completed',
    sentiment: 'negative',
    priority: 'low',
    reviewed: 'Yes',
    transcript: 'Caller provided feedback about app usability issues and requested minor UI updates.',
    issue: 'Usability feedback'
  },
  {
    id: 'C-1005',
    status: 'pending',
    sentiment: 'positive',
    priority: 'medium',
    reviewed: 'No',
    transcript: 'Client appreciated quick response and asked for a feature walkthrough next week.',
    issue: 'Feature onboarding request'
  },
  {
    id: 'C-1006',
    status: 'completed',
    sentiment: 'neutral',
    priority: 'low',
    reviewed: 'Yes',
    transcript: 'General inquiry call resolved after sharing setup instructions and account verification.',
    issue: 'General support inquiry'
  },
  {
    id: 'C-1007',
    status: 'pending',
    sentiment: 'negative',
    priority: 'high',
    reviewed: 'No',
    transcript: 'Customer reported payment retry failures and requested immediate support assistance.',
    issue: 'Payment processing failure'
  },
  {
    id: 'C-1008',
    status: 'completed',
    sentiment: 'positive',
    priority: 'low',
    reviewed: 'Yes',
    transcript: 'Follow-up confirmation call completed successfully with no pending concerns.',
    issue: 'Follow-up confirmation'
  }
];

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
const employees = [
  'Ahmad Ali',
  'Sara Mohamed',
  'Omar Khaled',
  'Lina Hassan',
  'Yousef Nasser'
];

export default function Calls() {


const [usersMenuAnchor, setUsersMenuAnchor] = useState(null);
const [userSearch, setUserSearch] = useState('');
const [selectedUsers, setSelectedUsers] = useState([]);


const openUsersMenu = (event) => {
  setUsersMenuAnchor(event.currentTarget);
};

const closeUsersMenu = () => {
  setUsersMenuAnchor(null);
  setUserSearch('');
};
const filteredEmployees = useMemo(() => {
  return employees.filter((name) =>
    name.toLowerCase().includes(userSearch.toLowerCase())
  );
}, [userSearch]);

const [activeCallId, setActiveCallId] = useState(null);
const [anchorEl, setAnchorEl] = useState(null);
const [menuCallId, setMenuCallId] = useState(null);

const openMenu = (event, callId) => {
  setAnchorEl(event.currentTarget);
  setMenuCallId(callId);
};
const closeMenu = () => {
  setAnchorEl(null);
  setMenuCallId(null);
};

const [callsData, setCallsData] = useState(() => {
  const saved = localStorage.getItem('calls');
  return saved ? JSON.parse(saved) : calls;
});
const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
const [callToDelete, setCallToDelete] = useState(null);
const handleDelete = (id) => {
  const updated = callsData.filter((c) => c.id !== id);
  setCallsData(updated);
  localStorage.setItem('calls', JSON.stringify(updated));
};
const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const role = (user?.role || '').toLowerCase();
  const isManager = role === 'manager';
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [reviewedFilter, setReviewedFilter] = useState('all');
  const [selectedCall, setSelectedCall] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editableTranscript, setEditableTranscript] = useState('');
  const [editableSentiment, setEditableSentiment] = useState('neutral');
  const [editablePriority, setEditablePriority] = useState('medium');
  const [editableKeywords, setEditableKeywords] = useState('');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [search, statusFilter, sentimentFilter, reviewedFilter]);

  const filteredCalls = useMemo(() => {
   return callsData.filter((call) => {
      const matchesSearch =
        call.id.toLowerCase().includes(search.toLowerCase()) ||
        call.status.toLowerCase().includes(search.toLowerCase()) ||
        call.sentiment.toLowerCase().includes(search.toLowerCase()) ||
        call.priority.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
      const matchesSentiment = sentimentFilter === 'all' || call.sentiment === sentimentFilter;
      const matchesReviewed = reviewedFilter === 'all' || call.reviewed === reviewedFilter;

      return matchesSearch && matchesStatus && matchesSentiment && matchesReviewed;
    });
  }, [search, statusFilter, sentimentFilter, reviewedFilter, callsData]);

  const openCallDrawer = (call) => {
    setSelectedCall(call);
    setEditableTranscript(call.transcript);
    setEditableSentiment(call.sentiment);
    setEditablePriority(call.priority);
    setEditableKeywords('billing, escalation, callback');
    setOpenDrawer(true);
  };

  const closeCallDrawer = () => {
    setOpenDrawer(false);
    setSelectedCall(null);
  };

  return (
    
    <>
    <input
  type="file"
  accept="audio/*"
  ref={fileInputRef}
  style={{ display: 'none' }}
 onChange={(e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const audioUrl = URL.createObjectURL(file);

  const newCall = {
    id: `C-${Date.now()}`,
    status: 'pending',
    sentiment: 'neutral',
    priority: 'medium',
    reviewed: 'No',
    issue: 'Uploaded audio call',
    transcript: 'Auto-generated call from uploaded audio file',
    audio: audioUrl
  };

  const updated = [newCall, ...callsData];

  setCallsData(updated);
  localStorage.setItem('calls', JSON.stringify(updated));

  e.target.value = '';
}}
/>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Calls Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Search, view and manage all calls
          </Typography>

 <Grid container spacing={2} sx={{ mb: 3 }}>

  {/* Search */}
  <Grid item xs={12} md={3}>
    <TextField
      fullWidth
      size="small"
      placeholder="Search calls..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {loading ? (
              <CircularProgress size={16} />
            ) : search ? (
              <IconButton size="small" onClick={() => setSearch('')}>
                <IconX size={14} />
              </IconButton>
            ) : null}
          </InputAdornment>
        )
      }}
    />
  </Grid>

  {/* Status */}
  <Grid item xs={12} md={3} sx={{ minWidth: 80 }}>
    <FormControl fullWidth size="small">
      <InputLabel>Status</InputLabel>
      <Select
        value={statusFilter}
        label="Status"
        sx={{ borderRadius: 2 }}
        onChange={(event) => setStatusFilter(event.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Sentiment */}
  <Grid item xs={12}  md={3} sx={{ minWidth: 80 }}>
    <FormControl fullWidth size="small">
      <InputLabel>Sentiment</InputLabel>
      <Select
        value={sentimentFilter}
        label="Sentiment"
        sx={{ borderRadius: 2 }}
        onChange={(event) => setSentimentFilter(event.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="positive">Positive</MenuItem>
        <MenuItem value="negative">Negative</MenuItem>
        <MenuItem value="neutral">Neutral</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Reviewed */}
  <Grid item xs={12} md={3} sx={{ minWidth: 80 }}>
    <FormControl fullWidth size="small">
      <InputLabel>Reviewed</InputLabel>
      <Select
        value={reviewedFilter}
        label="Reviewed"
        sx={{ borderRadius: 2 }}
        onChange={(event) => setReviewedFilter(event.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Reset Button */}
  <Grid item xs={12} md={2} sx={{ minWidth: 80 }}>
    <Button
      fullWidth
      variant="outlined"
      startIcon={<IconRefresh size={18} />}
      onClick={() => {
        setStatusFilter('all');
        setSentimentFilter('all');
        setReviewedFilter('all');
      }}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 500
      }}
    >
      Reset
    </Button>
  </Grid>

{/* Upload Button */}
<Grid item xs={12} md={2} sx={{ ml: 'auto' , minWidth: 80 }}>
  <Button

    fullWidth
    variant="contained"
    startIcon={<IconUpload size={18} />}
    sx={{
      borderRadius: 2,
      textTransform: 'none',
      fontWeight: 500,
      backgroundColor: 'primary.main',
      '&:hover': {
        backgroundColor: 'primary.dark'
      }
    }}
      onClick={() => fileInputRef.current?.click()}
  >
    Upload
  </Button>
</Grid>

</Grid>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Sentiment</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Reviewed</TableCell>
                  <TableCell align="center" sx={{ width: 160 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>{call.id}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{call.status}</TableCell>
                    <TableCell>
                      <Chip label={call.sentiment} color={sentimentColor[call.sentiment]} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip label={call.priority} color={priorityColor[call.priority]} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip label={call.reviewed} color={call.reviewed === 'Yes' ? 'success' : 'error'} size="small" variant="outlined" />
                    </TableCell>
                  <TableCell align="center">
  <Stack direction="row" spacing={1} justifyContent="center">

    {/* View (always visible) */}
    <IconButton size="small" onClick={() => openCallDrawer(call)}>
      <IconEye size={18} />
    </IconButton>

    {/* 3 dots menu */}
   <IconButton size="small" onClick={(e) => openMenu(e, call.id)}>
  <IconDots size={18} />
</IconButton>
  </Stack>
</TableCell>
                  </TableRow>
                  
                ))}
               
               
                {filteredCalls.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box sx={{ py: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No results found
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={closeMenu}
>
  <MenuItem onClick={() => { console.log('edit', menuCallId); closeMenu(); }}>
    <ListItemIcon>
      <IconEdit size={16} />
    </ListItemIcon>
    <ListItemText>Edit</ListItemText>
  </MenuItem>

 <MenuItem onClick={() => {
  setActiveCallId(menuCallId);
  setUsersMenuAnchor(anchorEl);
  closeMenu();
}}>
  <ListItemIcon>
    <IconUsers size={16} />
  </ListItemIcon>
  <ListItemText>Users</ListItemText>
</MenuItem>

<MenuItem onClick={() => {
   setCallToDelete(menuCallId); 
   setOpenDeleteDialog(true);// نفس زر الـ 3 dots
  closeMenu();
}}>
    <ListItemIcon>
      <IconTrash size={16} />
    </ListItemIcon>
    <ListItemText>Delete</ListItemText>
  </MenuItem>
</Menu>

<Menu
  anchorEl={usersMenuAnchor}
  open={Boolean(usersMenuAnchor)}
  onClose={closeUsersMenu}
  disableAutoFocusItem
  disableEnforceFocus
  PaperProps={{ sx: { width: 280, p: 1 } }}
>
  {/* Search */}
  <Box sx={{ px: 1, py: 1 }}>
    <TextField
    onKeyDown={(e) => e.stopPropagation()}
  size="small"
  fullWidth
  placeholder="Search employees..."
  value={userSearch}
  autoFocus
  onChange={(e) => setUserSearch(e.target.value)}
/>
  </Box>

  <Divider />

  {/* List */}
  {filteredEmployees.map((name) => (
    <MenuItem
      key={name}
      onClick={() => {
        setSelectedUsers((prev) =>
          prev.includes(name)
            ? prev.filter((n) => n !== name)
            : [...prev, name]
        );
      }}
    >
      <Checkbox checked={selectedUsers.includes(name)} />
      <ListItemText>{name}</ListItemText>
    </MenuItem>
  ))}

  <Divider />

  {/* OK Button */}
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
    <Button
      variant="contained"
      size="small"
      onClick={() => {
        console.log('Selected Users:', selectedUsers);
        closeUsersMenu();
      }}
    >
      send
    </Button>
  </Box>
</Menu>

{/* DELETE DIALOG */}
      <Dialog 
         open={openDeleteDialog}
  onClose={() => setOpenDeleteDialog(false)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 3,
      p: 1
    }
  }}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {callToDelete}?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button  onClick={() => setOpenDeleteDialog(false)}
    variant="outlined"
    sx={{
      color: 'text.secondary',
      borderColor: 'grey.400',
      '&:hover': {
        borderColor: 'grey.600',
        backgroundColor: 'grey.100'
      }
    }}>
      Cancel
      </Button>
 <Button
            onClick={() => {
              handleDelete(callToDelete);
              setOpenDeleteDialog(false);
            }}
             variant="contained"
    color="error"
    sx={{
      backgroundColor: 'error.dark',
      '&:hover': {
        backgroundColor: 'error.main'
      }
    }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      
    
    <Drawer anchor="right" open={openDrawer} onClose={closeCallDrawer}>
  <Box sx={{ width: { xs: 320, sm: 420 }, p: 3 }}>
    {selectedCall && (
      <>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">
              Call Details - {selectedCall.id}
            </Typography>

            <IconButton
              size="small"
              onClick={() => console.log('edit', selectedCall.id)}
            >
              <IconEdit size={18} />
            </IconButton>
          </Box>

          <IconButton onClick={closeCallDrawer} size="small">
            <IconX size={18} />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Review workflow for selected call
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Main Issue */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Main Issue
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {selectedCall.issue}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Analysis
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`${editablePriority} Priority`} color={priorityColor[editablePriority]} size="small" />
          <Chip label={`${editableSentiment}`} color={sentimentColor[editableSentiment]} size="small" />
        </Stack>

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Keywords
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          {editableKeywords.split(',').map((k, i) => (
            <Chip key={i} label={k.trim()} size="small" />
          ))}
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Transcript
        </Typography>

        <TextField
          fullWidth
          multiline
          minRows={4}
          value={editableTranscript}
          onChange={(event) => setEditableTranscript(event.target.value)}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Audio
        </Typography>

        <Box sx={{ mb: 2 }}>
{selectedCall.audio && (
  <audio controls style={{ width: '100%' }}>
    <source src={selectedCall.audio} type="audio/mpeg" />
  </audio>
)}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Actions
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Button
            size="small"
            variant="text"
            onClick={() =>
              navigate('/followups', {
                state: { openCreateFollowup: true, callId: selectedCall.id }
              })
            }
          >
            {isManager ? 'Assign Follow-up' : 'Needs Follow-up'}
          </Button>
        </Stack>
      </>
    )}
  </Box>
</Drawer>
    </>
  );
}
