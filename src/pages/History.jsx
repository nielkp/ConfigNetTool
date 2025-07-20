// src/pages/History.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('config-history') || '[]');
    setHistory(data);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Histórico de Configurações
      </Typography>

      {history.length === 0 ? (
        <Typography>Nenhuma configuração salva ainda.</Typography>
      ) : (
        <List>
          {history.map((item, index) => (
            <Paper key={index} sx={{ mb: 2, p: 2 }}>
              <Typography variant="h6">
                {item.vendor} — {item.ip}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.date}
              </Typography>

              <Box mt={1} mb={1}>
                <Typography variant="subtitle2">Opções Ativadas:</Typography>
                <ul>
                  {item.options
                    ? Object.entries(item.options)
                        .filter(([_, enabled]) => enabled)
                        .map(([key]) => <li key={key}>{key}</li>)
                    : <li>Nenhuma</li>}
                </ul>
              </Box>

              <Divider sx={{ my: 1 }} />
              <Typography component="pre" sx={{ fontFamily: 'monospace' }}>
                {item.config}
              </Typography>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}
