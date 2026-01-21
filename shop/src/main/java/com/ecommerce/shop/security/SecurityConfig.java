package com.ecommerce.shop.security;

import com.ecommerce.shop.security.jwt.AuthEntryPointJwt;
import com.ecommerce.shop.security.jwt.AuthTokenFilter;
import com.ecommerce.shop.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private AuthEntryPointJwt unauthorizedHandler;
    private UserDetailsServiceImpl userDetailsService;
    private AuthTokenFilter authTokenFilter;

    @Autowired
    public SecurityConfig(AuthEntryPointJwt unauthorizedHandler, UserDetailsServiceImpl userDetailsService, AuthTokenFilter authTokenFilter) {
        this.unauthorizedHandler = unauthorizedHandler;
        this.userDetailsService = userDetailsService;
        this.authTokenFilter = authTokenFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //An AuthenticationProvider implementation that retrieves user details from a UserDetailsService.
    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder)
    {
        return builder.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception
    {
        http.csrf(AbstractHttpConfigurer::disable)
            // use our custom authentication entry point for unauthorized requests
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            //set session management to stateless
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // mention requests that must be authenticated or not authenticated (like docs/swagger/sign in etc)
            .authorizeHttpRequests(auth ->
                    auth.requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/api/v1/public/**").permitAll()
                        .requestMatchers("/api/v1/test/**").permitAll()
                        .requestMatchers("/images/**").permitAll()
                    .anyRequest().authenticated());
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
