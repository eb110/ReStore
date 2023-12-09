import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface locationState {
  error?: serverError;
}
interface serverError {
  title: string;
  detail?: string;
}

export default function ServerError() {
  const state = useLocation().state as locationState;
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {state.error.title}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {state.error.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography gutterBottom variant="h5">
          Server error
        </Typography>
      )}
      <Button fullWidth component={Link} to="/catalog">
        Go back to shop
      </Button>
    </Container>
  );
}
