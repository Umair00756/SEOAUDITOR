import { motion } from 'framer-motion';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ImageIcon from '@mui/icons-material/Image';
import SpeedIcon from '@mui/icons-material/Speed';
import ArticleIcon from '@mui/icons-material/Article';
import type { AuditDetails } from '../types/audit';

interface DetailsGridProps {
  details: AuditDetails;
}

/* ── Heuristic: derive a 0–100 "health" score from free-text values ── */
const scoreFromText = (text: string): number => {
  const lower = text.toLowerCase();
  if (/excellent|perfect|great|optimal/i.test(lower)) return 95;
  if (/good|fast|sufficient|adequate/i.test(lower)) return 70;
  if (/average|okay|moderate/i.test(lower)) return 50;
  if (/missing|empty|none|no |lacks|poor|bad/i.test(lower)) return 15;
  if (/needs|could|improvement|without/i.test(lower)) return 35;
  return 50;
};

const statusLabel = (score: number): { text: string; color: string } => {
  if (score >= 80) return { text: 'Excellent', color: '#22c55e' };
  if (score >= 60) return { text: 'Good', color: '#a3e635' };
  if (score >= 40) return { text: 'Needs Work', color: '#facc15' };
  if (score >= 25) return { text: 'Poor', color: '#f97316' };
  return { text: 'Critical', color: '#ef4444' };
};

const detailMeta: {
  key: keyof AuditDetails;
  label: string;
  icon: React.ElementType;
  accentColor: string;
  gradient: string;
}[] = [
  {
    key: 'title_quality',
    label: 'Title Quality',
    icon: TitleIcon,
    accentColor: '#818cf8',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.04) 100%)',
  },
  {
    key: 'meta_quality',
    label: 'Meta Quality',
    icon: DescriptionIcon,
    accentColor: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.04) 100%)',
  },
  {
    key: 'heading_structure',
    label: 'Heading Structure',
    icon: FormatListNumberedIcon,
    accentColor: '#c084fc',
    gradient: 'linear-gradient(135deg, rgba(192,132,252,0.18) 0%, rgba(192,132,252,0.04) 100%)',
  },
  {
    key: 'image_seo',
    label: 'Image SEO',
    icon: ImageIcon,
    accentColor: '#f472b6',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(236,72,153,0.04) 100%)',
  },
  {
    key: 'page_speed',
    label: 'Page Speed',
    icon: SpeedIcon,
    accentColor: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(34,211,153,0.18) 0%, rgba(34,211,153,0.04) 100%)',
  },
  {
    key: 'content_depth',
    label: 'Content Depth',
    icon: ArticleIcon,
    accentColor: '#fbbf24',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0.04) 100%)',
  },
];

export default function DetailsGrid({ details }: DetailsGridProps) {
  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: 4,
          fontSize: '0.65rem',
          fontFamily: 'Inter, sans-serif',
          mb: 2,
          display: 'block',
        }}
      >
        DETAILED ANALYSIS
      </Typography>

      <Grid container spacing={2.5}>
        {detailMeta.map((item, i) => {
          const Icon = item.icon;
          const value = details[item.key];
          const health = scoreFromText(value);
          const status = statusLabel(health);

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.key}>
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
                style={{ height: '100%' }}
              >
                <Box
                  className="glass-card glow-border"
                  sx={{
                    p: 3,
                    height: '100%',
                    background: item.gradient,
                    transition: 'all 0.35s ease',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  {/* ── Header row: icon + label + status badge ── */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* Icon Circle */}
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `${item.accentColor}18`,
                        border: `1px solid ${item.accentColor}30`,
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 22, color: item.accentColor }} />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'rgba(255,255,255,0.45)',
                          fontWeight: 600,
                          letterSpacing: 1.5,
                          fontFamily: 'Inter, sans-serif',
                          textTransform: 'uppercase',
                          fontSize: '0.6rem',
                          lineHeight: 1.2,
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>

                    {/* Status Badge */}
                    <Box
                      sx={{
                        px: 1.2,
                        py: 0.3,
                        borderRadius: '20px',
                        background: `${status.color}18`,
                        border: `1px solid ${status.color}35`,
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          color: status.color,
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: 0.5,
                        }}
                      >
                        {status.text}
                      </Typography>
                    </Box>
                  </Box>

                  {/* ── Description text ── */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.78)',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.65,
                      fontSize: '0.875rem',
                      flex: 1,
                    }}
                  >
                    {value}
                  </Typography>

                  {/* ── Mini health bar ── */}
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.6rem',
                          color: 'rgba(255,255,255,0.3)',
                          fontFamily: 'Inter, sans-serif',
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        Health
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.65rem',
                          color: status.color,
                          fontWeight: 700,
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {health}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={health}
                      sx={{
                        height: 5,
                        borderRadius: 3,
                        background: 'rgba(255,255,255,0.06)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          background: `linear-gradient(90deg, ${item.accentColor}, ${status.color})`,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
