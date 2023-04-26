import { Component } from "react";
import styled from "@mui/styled-engine";
import MuiDrawer from "@mui/material/Drawer";

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          student: {},
          courses: [],
          reviews: [],
          currentCourse: null,
          currentIndex: -1,
          searchDepartment: "",
          open: true
        };
        this.drawerWidth = 240;
    }

    render() {
        return (styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
            ({ theme, open }) => ({
              '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: this.state.drawerWidth,
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                  overflowX: 'hidden',
                  transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                  width: theme.spacing(7),
                  [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                  },
                }),
              },
            }),
          ))
    }
}

export default Drawer;