// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ConfigGenerator from './pages/ConfigGenerator';
import History from './pages/History'; // ✅ agora ativado
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            ConfigNet Tool Knaip.Cloud
          </Typography>

          <Box>
            <Button color="inherit" component={Link} to="/">
              Configurar
            </Button>
            <Button color="inherit" component={Link} to="/history">
              Histórico
            </Button>
            <Button color="inherit" component={Link} to="/about">
              Sobre
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<ConfigGenerator />} />
        <Route path="/history" element={<History />} /> {/* ✅ ativado */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
