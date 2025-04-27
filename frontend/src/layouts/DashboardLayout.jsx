import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, Typography } from '@mui/material';
import SidebarMenu from './SidebarMenu';

const drawerWidth = 220;

export default function DashboardLayout({ children, onMenuClick }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Typography variant="h6" noWrap>
          International Debt Dashboard
        </Typography>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: 0 }}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
          open
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              MDM Demo
            </Typography>
            <SidebarMenu onMenuClick={onMenuClick} />
          </Box>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
