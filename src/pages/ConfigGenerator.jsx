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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';

export default function ConfigGenerator() {
  const [vendor, setVendor] = useState('Mikrotik');
  const [ip, setIp] = useState('');
  const [cidr, setCidr] = useState('/30');
  const [generatedConfig, setGeneratedConfig] = useState('');
  const [enableOSPF, setEnableOSPF] = useState(false);
  const [enableMPLS, setEnableMPLS] = useState(false);
  const [enableNAT, setEnableNAT] = useState(false);
  const [enableDHCP, setEnableDHCP] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const generateConfig = () => {
    if (!validateIP(ip)) {
      alert("IP inválido.");
      return;
    }

    let config = `# Configuração para ${vendor}\n`;
    config += `IP: ${ip}${cidr}\n\n`;

    if (vendor === 'Mikrotik') {
      config += `interface ether1\nip address add address=${ip}${cidr} interface=ether1\n`;
    } else if (vendor === 'Huawei') {
      config += `interface GigabitEthernet0/0/1\nip address ${ip} ${cidrToMask(cidr)}\n`;
    }

    if (enableOSPF) {
      config += vendor === 'Mikrotik'
        ? `routing ospf instance add name=default router-id=${ip}\n`
        : `ospf 1\n router-id ${ip}\n quit\n`;
    }

    if (enableMPLS) {
      config += vendor === 'Mikrotik'
        ? `mpls ldp set enabled=yes\n`
        : `mpls\n mpls ldp\n quit\n`;
    }

    if (enableNAT) {
      config += vendor === 'Mikrotik'
        ? `ip firewall nat add chain=srcnat action=masquerade out-interface=ether1\n`
        : `nat address-group 1 192.168.1.1 192.168.1.254\n`;
    }

    if (enableDHCP) {
      config += vendor === 'Mikrotik'
        ? `ip dhcp-server add interface=ether1 lease-time=1d\n`
        : `dhcp enable\n`;
    }

    setGeneratedConfig(config);
  };

  const validateIP = (ip) => {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
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
      options: {
        OSPF: enableOSPF,
        MPLS: enableMPLS,
        NAT: enableNAT,
        DHCP: enableDHCP,
      },
      config: generatedConfig,
    };
    localStorage.setItem('config-history', JSON.stringify([newItem, ...history]));
    setAlertOpen(true);
  };

  const clearFields = () => {
    setIp('');
    setCidr('/30');
    setEnableOSPF(false);
    setEnableMPLS(false);
    setEnableNAT(false);
    setEnableDHCP(false);
    setGeneratedConfig('');
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
          placeholder="Ex: 192.168.0.1"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>CIDR</InputLabel>
          <Select value={cidr} onChange={(e) => setCidr(e.target.value)} label="CIDR">
            {['/30', '/29', '/28', '/27', '/26', '/25', '/24'].map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>Opções adicionais</Typography>

        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={enableOSPF} onChange={(e) => setEnableOSPF(e.target.checked)} />}
            label="OSPF"
          />
          <FormControlLabel
            control={<Checkbox checked={enableMPLS} onChange={(e) => setEnableMPLS(e.target.checked)} />}
            label="MPLS"
          />
          <FormControlLabel
            control={<Checkbox checked={enableNAT} onChange={(e) => setEnableNAT(e.target.checked)} />}
            label="NAT"
          />
          <FormControlLabel
            control={<Checkbox checked={enableDHCP} onChange={(e) => setEnableDHCP(e.target.checked)} />}
            label="DHCP"
          />
        </FormGroup>

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" color="primary" onClick={generateConfig}>
            Gerar Configuração
          </Button>
          <Button variant="outlined" onClick={clearFields}>
            Limpar Campos
          </Button>
        </Box>
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

          <Box display="flex" gap={2}>
            <Button variant="outlined" onClick={saveToHistory}>
              Salvar no Histórico
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                const blob = new Blob([generatedConfig], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `config-${vendor.toLowerCase()}-${Date.now()}.txt`;
                link.click();
              }}
            >
              Exportar como .txt
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
          Configuração salva no histórico!
        </Alert>
      </Snackbar>
    </Box>
  );
}
