// src/pages/ConfigGenerator.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';

export default function ConfigGenerator() {
  const [vendor, setVendor] = useState('Mikrotik');
  const [ip, setIp] = useState('');
  const [cidr, setCidr] = useState('/30');
  const [generatedConfig, setGeneratedConfig] = useState('');

  const generateConfig = () => {
    let config = `# Configuração para ${vendor}\n`;
    config += `IP: ${ip}${cidr}\n\n`;

    if (vendor === 'Mikrotik') {
      config += `interface ether1\nip address add address=${ip}${cidr} interface=ether1\n`;
    } else if (vendor === 'Huawei') {
      config += `interface GigabitEthernet0/0/1\nip address ${ip} ${cidrToMask(cidr)}\n`;
    }

    setGeneratedConfig(config);
  };

  const cidrToMask = (cidr) => {
    const bits = parseInt(cidr.replace('/', ''));
    return Array(4)
      .fill(0)
      .map((_, i) =>
        bits >= (i + 1) * 8
          ? 255
          : bits > i * 8
          ? 256 - Math.pow(2, 8 - (bits - i * 8))
          : 0
      )
      .join('.');
  };

  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem('config-history') || '[]');
    const newItem = {
      date: new Date().toLocaleString(),
      vendor,
      ip: `${ip}${cidr}`,
      config: generatedConfig,
    };
    localStorage.setItem('config-history', JSON.stringify([newItem, ...history]));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Gerador de Configuração
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Vendor</InputLabel>
          <Select value={vendor} onChange={(e) => setVendor(e.target.value)} label="Vendor">
            <MenuItem value="Mikrotik">Mikrotik</MenuItem>
            <MenuItem value="Huawei">Huawei</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="IP"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="CIDR (ex: /30)"
          value={cidr}
          onChange={(e) => setCidr(e.target.value)}
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={generateConfig} sx={{ mt: 2 }}>
          Gerar Configuração
        </Button>
      </Paper>

      {generatedConfig && (
        <>
          <Box
            sx={{
              backgroundColor: '#ff853e',
              padding: 2,
              borderRadius: 2,
              fontFamily: 'monospace',
              whiteSpace: 'pre-line',
              overflowX: 'auto',
              mb: 2,
            }}
          >
            {generatedConfig}
          </Box>

          <Button variant="outlined" onClick={saveToHistory}>
            Salvar no Histórico
          </Button>
        </>
      )}
    </Box>
  );
}
