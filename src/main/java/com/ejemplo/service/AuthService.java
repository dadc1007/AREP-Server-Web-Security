package com.ejemplo.service;

import com.ejemplo.dto.AuthResponse;
import com.ejemplo.dto.LoginRequest;
import com.ejemplo.dto.SignupRequest;

public interface AuthService {

    AuthResponse signup(SignupRequest request);

    AuthResponse login(LoginRequest request);
}
