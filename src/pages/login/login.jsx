import React, { useState } from "react";
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
import loginBanner from "../../assets/images/login.png";
import logo from "../../assets/logo/elegant-logo.png";
import IconifyIcon from "../components/IconifyIcon";
import Image from "../components/Image";
import { Login as LoginController } from "../../controller/loginController";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [loginData, setLoginData] = useState("");
  const [password, setPassword] = useState("");
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
        height={560}
        width={{ md: 960 }}
      >
        <Stack width={{ md: 0.5 }} m={2.5} gap={10}>
          <Link href="/" width="fit-content">
            <Image src={logo} width={82.6} />
          </Link>
          <Stack alignItems="center" gap={2.5} width={330} mx="auto">
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              Login
            </Typography>
            <FormControl variant="standard" fullWidth>
              <TextField
                placeholder="Enter your email"
                id="email"
                onChange={(value) => setLoginData(value.target.value)}
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
                onChange={(value) => {
                  setPassword(value.target.value);
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
            <Typography
              variant="body1"
              sx={{
                alignSelf: "flex-end",
              }}
            >
              <Link href="/forgotPassword" underline="hover">
                Forget password
              </Link>
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                LoginController(loginData, password, navigate);
              }}
            >
              Log in
            </Button>
            <Typography variant="body2" color="text.secondary">
              Don't have an account ?{" "}
              <Link
                href="/register"
                underline="hover"
                fontSize={(theme) => theme.typography.body1.fontSize}
              >
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <React.Suspense
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
            alt="Login banner"
            src={loginBanner}
            sx={{
              width: 0.5,
              display: { xs: "none", md: "block" },
            }}
          />
        </React.Suspense>
      </Stack>
    </div>
  );
};
