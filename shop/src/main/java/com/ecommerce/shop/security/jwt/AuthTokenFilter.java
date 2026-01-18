package com.ecommerce.shop.security.jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// This class is a custom filter to validate the user
// and set the Security Context if the authentication was successful

@Slf4j
@Component
@NoArgsConstructor
public class AuthTokenFilter extends OncePerRequestFilter {
    private JwtUtils jwtUtils;
    private UserDetailsService userDetailsService;

    @Autowired
    public AuthTokenFilter(JwtUtils jwtUtils, UserDetailsService userDetailsService)
    {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.debug("Inside doFilterInternal method (AuthTokenFilter). Called for URI: {}", request.getRequestURI());

        try{
            String jwt = jwtUtils.getJwtFromHeader(request);
            if(jwt != null && jwtUtils.validateJwt(jwt))
            {
                String username = jwtUtils.getUsernameFromJwtToken(jwt);
                UserDetails userDetails =  userDetailsService.loadUserByUsername(username);

                //Create an authentication object with the userDetails inside so that we can then pass it to Security Context
                //Marks the request as authenticated
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.debug("Roles from JWT: {}",userDetails.getAuthorities());
            }
        }catch (Exception e)
        {
            logger.error("Cannot set user authentication: {}", e);
        }
        //Continue to the rest of the filters (if there are any)
        filterChain.doFilter(request, response);
    }
}
