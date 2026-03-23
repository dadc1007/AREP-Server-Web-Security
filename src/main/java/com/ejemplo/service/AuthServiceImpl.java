package com.ejemplo.service;

import com.ejemplo.dto.AuthResponse;
import com.ejemplo.dto.LoginRequest;
import com.ejemplo.dto.SignupRequest;
import com.ejemplo.exception.EmailAlreadyExistsException;
import com.ejemplo.exception.InvalidCredentialsException;
import com.ejemplo.model.User;
import com.ejemplo.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse signup(SignupRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new EmailAlreadyExistsException("El correo ya esta registrado");
        }

        User user = new User(normalizedEmail, passwordEncoder.encode(request.password()));
        userRepository.save(user);

        return new AuthResponse("Usuario creado correctamente", normalizedEmail);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Credenciales invalidas"));

        boolean isPasswordValid = passwordEncoder.matches(request.password(), user.getPasswordHash());
        if (!isPasswordValid) {
            throw new InvalidCredentialsException("Credenciales invalidas");
        }

        return new AuthResponse("Login exitoso", normalizedEmail);
    }
}
