import { motion } from 'framer-motion';
import { Box, Typography, CircularProgress } from '@mui/material';

interface ScoreCardProps {
  score: number;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#f59e0b';
  if (score >= 40) return '#f97316';
  return '#ef4444';
};

const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs Work';
  return 'Poor';
};

export default function ScoreCard({ score }: ScoreCardProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
    >
      <Box
        className="glass-card glow-border"
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          position: 'relative',
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: 4,
            fontSize: '0.7rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          SEO SCORE
        </Typography>

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          {/* Background track */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={160}
            thickness={4}
            sx={{ color: 'rgba(255,255,255,0.05)', position: 'absolute' }}
          />
          {/* Animated foreground */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CircularProgress
              variant="determinate"
              value={score}
              size={160}
              thickness={4}
              sx={{
                color,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
          </motion.div>
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontFamily: 'Poppins, sans-serif',
                  color,
                  textShadow: `0 0 20px ${color}40`,
                  lineHeight: 1,
                }}
              >
                {score}
              </Typography>
            </motion.div>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.65rem',
                mt: 0.5,
              }}
            >
              / 100
            </Typography>
          </Box>
        </Box>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color,
              textShadow: `0 0 12px ${color}30`,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {label}
          </Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
}
