import React, { useState, Suspense } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import signupBanner from "../../assets/images/signup.png";
import IconifyIcon from "../components/IconifyIcon";
import logo from "../../assets/logo/elegant-logo.png";
import Image from "../components/Image";
import { useNavigate } from "react-router-dom";
import { Register as RegisterController } from "../../controller/loginController";
import "../../assets/css/style.css";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#ffeaea",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        bgcolor="background.paper"
        boxShadow={(theme) => theme.shadows[3]}
        height={591}
        width={{ md: 960 }}
      >
        <Stack width={{ md: 0.5 }} m={2.5} gap={10}>
          <Link href="/" width="fit-content">
            <Image src={logo} width={82.6} />
          </Link>
          <Stack alignItems="center" gap={2.5} width={330} mx="auto">
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              Signup
            </Typography>
            <FormControl variant="standard" fullWidth>
              <TextField
                placeholder="Enter your full name"
                id="name"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconifyIcon
                        icon="mdi:user"
                        width={"20px"}
                        height={"20px"}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <TextField
                placeholder="Enter your email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconifyIcon
                        icon="ic:baseline-email"
                        width={"20px"}
                        height={"20px"}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <TextField
                placeholder="********"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        {showPassword ? (
                          <IconifyIcon
                            icon="ic:baseline-key-off"
                            width={"20px"}
                            height={"20px"}
                          />
                        ) : (
                          <IconifyIcon
                            icon="ic:baseline-key"
                            width={"20px"}
                            height={"20px"}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <div
              style={{
                display: "flex",
                width: "100%",
                border: "1px solid #e0dada",
                borderRadius: "5px",
              }}
            >
              <button
                className={
                  type == "customer"
                    ? "type-select-button signup-button active"
                    : "type-select-button signup-button"
                }
                onClick={() => {
                  setType("customer");
                }}
              >
                Customer
              </button>
              <button
                className={
                  type == "saler"
                    ? "type-select-button signup-button active"
                    : "type-select-button signup-button"
                }
                onClick={() => {
                  setType("saler");
                }}
              >
                Saler
              </button>
            </div>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                RegisterController(username, email, password, type, navigate);
              }}
            >
              Sign up
            </Button>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                href="/"
                underline="hover"
                fontSize={(theme) => theme.typography.body1.fontSize}
              >
                Log in
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              height={1}
              width={1}
              sx={{ bgcolor: "primary.main" }}
            />
          }
        >
          <Image
            alt="Signup banner"
            src={signupBanner}
            sx={{
              width: 0.5,
              display: { xs: "none", md: "block" },
            }}
          />
        </Suspense>
      </Stack>
    </div>
  );
};
