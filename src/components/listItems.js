import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon  sx={{color: "#EBD99F"}}/>
      </ListItemIcon>
      <ListItemText primary="Find a Course" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon sx={{color: "#EBD99F"}} />
      </ListItemIcon>
      <ListItemText primary="Plan a Semester" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon  sx={{color: "#EBD99F"}}/>
      </ListItemIcon>
      <ListItemText primary="Review a Course" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon  sx={{color: "#EBD99F"}}/>
      </ListItemIcon>
      <ListItemText primary="Plan of Study" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon  sx={{color: "#EBD99F"}}/>
      </ListItemIcon>
      <ListItemText primary="Transcript" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon sx={{color: "#EBD99F"}} />
      </ListItemIcon>
      <ListItemText primary="GPA Calculator" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon  sx={{color: "#EBD99F"}} />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon  sx={{color: "#EBD99F"}}/>
      </ListItemIcon>
      <ListItemText primary="Classmates" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon  sx={{color: "#EBD99F"}}/>
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
);