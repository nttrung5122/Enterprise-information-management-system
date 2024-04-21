import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StoreIcon from "@mui/icons-material/Store";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import InventoryIcon from "@mui/icons-material/Inventory";
import SetMealIcon from "@mui/icons-material/SetMeal";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import BadgeIcon from "@mui/icons-material/Badge";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const handleLogout = () => {
  // Add your logout logic here
  console.log("Logged out");
};
const ADMIN_PERMISSION = 101
const BUSINESS_MANAGE_PERMISSION = 102
const USER_MANAGE_PERMISSION = 103
const WAREHOUSE_MANAGE_PERMISSION = 104
const menuItems = [
  { text: "Danh sách chức vụ", icon: <BadgeIcon />, section: "role" , permissionId:USER_MANAGE_PERMISSION},
  { text: "Danh sách nhân viên", icon: <PeopleIcon />, section: "employees", permissionId:USER_MANAGE_PERMISSION },
  {
    text: "Danh sách tài khoản",
    icon: <AccountBoxIcon />,
    section: "accounts",
    permissionId:USER_MANAGE_PERMISSION
  },
  { text: "Nhà cung cấp", icon: <StoreIcon />, section: "supplier" , permissionId:WAREHOUSE_MANAGE_PERMISSION },
  { text: "Nguyên liệu", icon: <SetMealIcon />, section: "ingredient",permissionId:WAREHOUSE_MANAGE_PERMISSION },
  { text: "Quản lý kho", icon: <InventoryIcon />, section: "inventory",permissionId:WAREHOUSE_MANAGE_PERMISSION },
  { text: "Mẫu hủy ", icon: <DeleteSweepIcon />, section: "cancellationForm",permissionId:WAREHOUSE_MANAGE_PERMISSION },
  { text: "Bảng lương", icon: <LocalAtmIcon />, section: "salary", permissionId:USER_MANAGE_PERMISSION },
  { text: "Hóa đơn", icon: <ReceiptLongIcon />, section: "receipt" ,permissionId:WAREHOUSE_MANAGE_PERMISSION},
  {
    text: "Bảng chấm công",
    icon: <CalendarMonthIcon />,
    section: "attendance",
    permissionId:BUSINESS_MANAGE_PERMISSION
  },
];

export default function MiniDrawer({ selectedSection, setSelectedSection }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [permissionsArray, setPermissionsArray] = React.useState([]);
  React.useEffect(() => {
    const accountInfo = JSON.parse(localStorage.getItem("accountInfo"));
    setPermissionsArray(
      accountInfo.permissions.map((value) => {
        return value.account_permission.permissionId;
      })
    );
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (section) => {
    setSelectedSection(section); // Set the selected section
    handleDrawerClose(); // Close the drawer when a menu item is clicked
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.filter((item)=>{
            return !item.permissionId || permissionsArray.includes(ADMIN_PERMISSION) || permissionsArray.includes(item.permissionId)
          }).map((menuItem, index) => (
            <ListItem
              key={menuItem.text}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  bgcolor:
                    selectedSection === menuItem
                      ? theme.palette.primary.dark // Change to your desired color for the selected section
                      : "transparent",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
                selected={selectedSection === menuItem.section}
                onClick={() => {
                  handleItemClick(menuItem.section);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:
                      selectedSection === menuItem.section
                        ? theme.palette.action.primary
                        : theme.palette.text.secondary,
                  }}
                >
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menuItem.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      selectedSection === menuItem.section
                        ? theme.palette.action.selected
                        : theme.palette.text.secondary,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 3 }} /> <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
