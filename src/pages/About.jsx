// src/pages/About.jsx
import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

export default function About() {
  const handleRedirect = () => {
    window.open('https://portfolio.knaip.cloud/', '_blank');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Sobre o Projeto
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          Esta ferramenta foi criada para gerar configurações de roteadores e switches de forma prática,
          com suporte a Mikrotik e Huawei.
        </Typography>

        <Typography variant="body1" paragraph>
          Desenvolvido por <strong>Daniel Knaip</strong>.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
        >
          Acessar Portfólio
        </Button>
      </Paper>
    </Box>
  );
}
