import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  
  import DashboardIcon from "@mui/icons-material/Dashboard";
  import TableChartIcon from "@mui/icons-material/TableChart";
  

  export default function SidebarMenu({ onMenuClick }) {
    return (
      <List>
        <ListItemButton onClick={() => onMenuClick("overview")}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItemButton>
  
        <ListItemButton onClick={() => onMenuClick("table_view")}>
          <ListItemIcon><TableChartIcon /></ListItemIcon>
          <ListItemText primary="Table View" />
        </ListItemButton>
      </List>
    );
  }