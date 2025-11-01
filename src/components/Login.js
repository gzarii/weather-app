import React from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Weather Analytics Dashboard
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Sign in to access your personalized weather dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
