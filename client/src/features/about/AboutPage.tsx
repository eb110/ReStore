import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    },
    textDecoration: 'none'
}

export default function AboutPage() {
    return (
        <>
            <Typography variant='h2'>
                About page
            </Typography>
            <Typography variant="h6" component={NavLink} to='/error' sx={navStyles}>
                Error Tester
            </Typography>
        </>

    )
}