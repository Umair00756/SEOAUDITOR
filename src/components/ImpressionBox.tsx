import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface ImpressionBoxProps {
  impression: string;
}

export default function ImpressionBox({ impression }: ImpressionBoxProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
    >
      <Box
        className="glass-card"
        sx={{
          p: 3,
          background:
            'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative glow */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, position: 'relative' }}>
          <AutoAwesomeIcon
            sx={{
              color: '#a78bfa',
              fontSize: 28,
              mt: 0.25,
              filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.5))',
            }}
          />
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: '#a78bfa',
                letterSpacing: 3,
                fontSize: '0.65rem',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              AI IMPRESSION
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.7,
                mt: 0.5,
              }}
            >
              {impression}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
