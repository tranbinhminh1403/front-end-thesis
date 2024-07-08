import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const BasicInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/get-user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  };

  const userId = getUserIdFromToken(token);

  const handleEmailChange = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/auth/update-info', {
        userId: userId,
        email: newEmail
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserInfo(prev => ({ ...prev, email: newEmail }));
      setShowEmailInput(false);
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/v1/auth/update-info', {
        userId: userId,
        newPassword: newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewPassword('');
      setConfirmNewPassword('');
      setShowPasswordInputs(false);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left', // Align items to the left
        }}
      >
        <Typography component="h1" variant="h5">
          Thông tin cá nhân
        </Typography>
        <Box component="form" sx={{ mt: 1, width: '100%', textAlign: 'left' }}>
          <TextField
            variant='standard'
            margin="normal"
            fullWidth
            label="Tên đăng nhập"
            value={userInfo.username || ''}
            disabled
          />
          {!showEmailInput ? (
            <React.Fragment>
              <TextField
                variant='standard'
                margin="normal"
                fullWidth
                label="Email"
                value={userInfo.email || ''}
                disabled
              />
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowEmailInput(true)}
                sx={{ mt: 2 }}
              >
                Thay đổi email
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TextField
                variant='standard'
                margin="normal"
                fullWidth
                label="Email mới"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleEmailChange}
                sx={{ mt: 2 }}
              >
                Xác nhận
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowEmailInput(false)}
                sx={{ mt: 1 }}
                color='error'
              >
                Hủy
              </Button>
            </React.Fragment>
          )}
          {!showPasswordInputs ? (
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setShowPasswordInputs(true)}
              sx={{ mt: 2 }}
            >
              Thay đổi mật khẩu
            </Button>
          ) : (
            <React.Fragment>
              <TextField
                variant='standard'
                margin="normal"
                fullWidth
                label="Mật khẩu mới"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                variant='standard'
                margin="normal"
                fullWidth
                label="Nhập lại mật khẩu mới"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handlePasswordChange}
                sx={{ mt: 2 }}
              >
                Xác nhận
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowPasswordInputs(false)}
                sx={{ mt: 1 }}
                color='error'
              >
                Hủy
              </Button>
            </React.Fragment>
          )}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

export default BasicInfo;
