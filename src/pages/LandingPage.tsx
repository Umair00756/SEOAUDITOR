import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Alert,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { startAudit } from '../services/auditApi';

const STEPS = [
  'Fetching page...',
  'Analysing on-page SEO...',
  'Checking technical SEO...',
  'Generating recommendations...',
];

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const mutation = useMutation({
    mutationFn: startAudit,
    onSuccess: (data) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      navigate('/report', { state: data });
    },
    onError: () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setActiveStep(0);
    },
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a URL');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setError('URL must start with http:// or https://');
      return;
    }
    setError('');
    setActiveStep(0);

    // Start progress simulation
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    mutation.mutate(trimmed);
  };

  const isLoading = mutation.isPending;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        px: 2,
      }}
    >
      {/* Hero Content */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 16 }}
      >
        <Typography
          variant="overline"
          sx={{
            color: '#a78bfa',
            letterSpacing: 6,
            fontSize: '0.7rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          AI‑POWERED
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 8 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontFamily: 'Poppins, sans-serif',
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
            lineHeight: 1.1,
          }}
        >
          <span className="shimmer-text">SEO Auditor</span>
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ textAlign: 'center', marginBottom: 40, maxWidth: 500 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
          }}
        >
          Drop in any URL and get an instant, AI-driven SEO analysis with
          actionable insights.
        </Typography>
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
        style={{ width: '100%', maxWidth: 600 }}
      >
        <Box
          className="glass-card"
          sx={{
            p: 3,
            border: '1px solid rgba(139,92,246,0.25)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
              disabled={isLoading}
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(139,92,246,0.4)' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8b5cf6',
                    boxShadow: '0 0 0 2px rgba(139,92,246,0.2)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255,255,255,0.25)',
                },
              }}
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              variant="contained"
              startIcon={<RocketLaunchIcon />}
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                minWidth: 120,
                fontWeight: 700,
                fontFamily: 'Poppins, sans-serif',
                textTransform: 'none',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                  boxShadow: '0 6px 30px rgba(99,102,241,0.5)',
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  background: 'rgba(99,102,241,0.3)',
                  color: 'rgba(255,255,255,0.5)',
                },
              }}
            >
              {isLoading ? 'Scanning...' : 'Go'}
            </Button>
          </Box>

          {/* Error */}
          <AnimatePresence>
            {(error || mutation.isError) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  severity="error"
                  sx={{
                    mt: 2,
                    borderRadius: '10px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: '#fca5a5',
                    '& .MuiAlert-icon': { color: '#f87171' },
                  }}
                >
                  {error || 'Something went wrong. Please try again.'}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </motion.div>

      {/* Stepper */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', maxWidth: 600, marginTop: 40 }}
          >
            <Box className="glass-card" sx={{ p: 3 }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    '&.Mui-active': { color: '#a78bfa' },
                    '&.Mui-completed': { color: '#34d399' },
                  },
                  '& .MuiStepIcon-root': {
                    color: 'rgba(255,255,255,0.1)',
                    '&.Mui-active': {
                      color: '#8b5cf6',
                      filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.5))',
                    },
                    '&.Mui-completed': { color: '#34d399' },
                  },
                  '& .MuiStepConnector-line': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Pulsing dot */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3,
                  gap: 1,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: i * 0.2,
                    }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#8b5cf6',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
