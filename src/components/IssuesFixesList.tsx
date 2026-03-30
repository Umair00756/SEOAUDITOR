import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface IssuesFixesListProps {
  items: string[];
  variant: 'issues' | 'fixes';
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function IssuesFixesList({ items, variant }: IssuesFixesListProps) {
  const isIssues = variant === 'issues';
  const color = isIssues ? '#f87171' : '#34d399';
  const Icon = isIssues ? ErrorOutlineIcon : CheckCircleOutlineIcon;
  const title = isIssues ? 'ISSUES FOUND' : 'RECOMMENDED FIXES';

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: isIssues ? 0.5 : 0.7, duration: 0.6 }}
    >
      <Box className="glass-card glow-border" sx={{ p: 3, height: '100%' }}>
        <Typography
          variant="overline"
          sx={{
            color,
            letterSpacing: 3,
            fontSize: '0.65rem',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <Icon sx={{ fontSize: 16, filter: `drop-shadow(0 0 4px ${color}60)` }} />
          {title}
        </Typography>

        <List dense disablePadding>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {items.map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ListItem
                  sx={{
                    py: 1,
                    px: 1.5,
                    mb: 0.5,
                    borderRadius: '10px',
                    background: isIssues
                      ? 'rgba(248,113,113,0.06)'
                      : 'rgba(52,211,153,0.06)',
                    border: `1px solid ${isIssues ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.12)'}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: isIssues
                        ? 'rgba(248,113,113,0.12)'
                        : 'rgba(52,211,153,0.12)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Icon sx={{ fontSize: 18, color, opacity: 0.8 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      sx: {
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '0.875rem',
                        fontFamily: 'Inter, sans-serif',
                      },
                    }}
                  />
                </ListItem>
              </motion.div>
            ))}
          </motion.div>
        </List>
      </Box>
    </motion.div>
  );
}
