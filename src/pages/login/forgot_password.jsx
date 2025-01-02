import React, { Suspense, useState } from "react";
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
import Image from "../components/Image";
import forgotPassword from "../../assets/images/forgot-password.png";
import IconifyIcon from "../components/IconifyIcon";
import logo from "../../assets/logo/elegant-logo.png";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../../controller/loginController";

export const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [loginData, setLoginData] = useState();
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
          <Stack alignItems="center" gap={6.5} width={330} mx="auto">
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              Forgot Password
            </Typography>
            <FormControl variant="standard" fullWidth>
              <TextField
                placeholder="Enter Email"
                id="email"
                onChange={(e) => {
                  setLoginData(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        edge="end"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        <IconifyIcon
                          icon="ic:baseline-email"
                          width={"20px"}
                          height={"20px"}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="mt-4"
                placeholder="Enter new password"
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
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
            <Button variant="contained" fullWidth>
              Change Password
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              onClick={() => {
                ChangePassword(password, loginData).then(() => {
                  navigate("/");
                });
              }}
            >
              Back to{" "}
              <Link
                style={{
                  cursor: "pointer",
                }}
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
            src={forgotPassword}
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
