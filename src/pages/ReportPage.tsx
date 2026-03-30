import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ScoreCard from '../components/ScoreCard';
import ImpressionBox from '../components/ImpressionBox';
import IssuesFixesList from '../components/IssuesFixesList';
import DetailsGrid from '../components/DetailsGrid';
import type { AuditResponse } from '../types/audit';

export default function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as AuditResponse | null;

  if (!data || !data.report) {
    return <Navigate to="/" replace />;
  }

  const { score, impression, issues, fixes, details } = data.report;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: '#a78bfa',
              letterSpacing: 6,
              fontSize: '0.65rem',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            AUDIT COMPLETE
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontFamily: 'Poppins, sans-serif',
              mt: 0.5,
            }}
          >
            <span className="shimmer-text">Your SEO Report</span>
          </Typography>
        </motion.div>

        {/* Score */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <ScoreCard score={score} />
        </Box>

        {/* Impression */}
        <Box sx={{ mb: 4 }}>
          <ImpressionBox impression={impression} />
        </Box>

        {/* Issues & Fixes side by side */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
            mb: 4,
          }}
        >
          <IssuesFixesList items={issues} variant="issues" />
          <IssuesFixesList items={fixes} variant="fixes" />
        </Box>

        {/* Details Grid */}
        <Box sx={{ mb: 6 }}>
          <DetailsGrid details={details} />
        </Box>

        {/* Run Another Audit */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="outlined"
            startIcon={<ReplayIcon />}
            sx={{
              borderRadius: '12px',
              px: 4,
              py: 1.5,
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'none',
              fontSize: '0.95rem',
              borderColor: 'rgba(139,92,246,0.4)',
              color: '#a78bfa',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#8b5cf6',
                background: 'rgba(139,92,246,0.1)',
                boxShadow: '0 0 20px rgba(139,92,246,0.2)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Run Another Audit
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
