package com.ecommerce.shop.security.jwt;

import com.ecommerce.shop.security.services.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    @Value("${spring.app.jwtExpirationInMs}")
    private int jwtExpirationMs;
    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;
    @Value("${spring.app.jwtCookieName}")
    private String jwtCookie;


//    public String getJwtFromHeader(HttpServletRequest request){
//        String bearerToken = request.getHeader("Authorization");
//        log.debug("Inside getJwtFromHeader method with header {}",bearerToken);
//        if(bearerToken != null && bearerToken.startsWith("Bearer "))
//            //remove bearer prefix
//            return bearerToken.substring(7);
//        return null;
//    }
    public String getJwtFromCookie(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, jwtCookie);
        log.debug("Inside getJwtFromCookie method with cookie {}",cookie);
        if(cookie != null){
            return cookie.getValue();
        }
        else
            return null;

    }
    public ResponseCookie generateJwtCookie(UserDetailsImpl userDetailsImpl){
        log.debug("Inside generateJwtCookie method for username {}", userDetailsImpl.getUsername());
        String jwt = generateJwtFromUsername(userDetailsImpl);
        return ResponseCookie.from(jwtCookie, jwt)
                .path("/api")
                .maxAge(jwtExpirationMs)
                .httpOnly(true)
                .build();
    }

    public ResponseCookie getCleanJwtCookie(){
        log.debug("Inside getCleanJwtCookie method");
        return ResponseCookie.from(jwtCookie, null)
                .path("/api")
                .build();
    }

    public String generateJwtFromUsername(UserDetails userDetails)
    {
        String username = userDetails.getUsername();
        log.debug("Inside generateJwtFromUsername method with username {}", username);
        return Jwts
                .builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(Date.from(Instant.now().plus(jwtExpirationMs, ChronoUnit.MILLIS)))
                .signWith(key())
                .compact();
    }

    public String getUsernameFromJwtToken(String token){
        log.debug("Inside getUsernameFromJwtToken method with token {}",token);
        return Jwts
                .parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public Key key()
    {
        log.debug("Inside key method");
        return Keys.hmacShaKeyFor(
                Decoders
                        .BASE64
                        .decode(jwtSecret)
        );
    }

    public boolean validateJwt(String authToken)
    {
        log.debug("Inside validateJwt method with token {}",authToken);
        try{
            Jwts
                .parser()
                    .verifyWith((SecretKey) key())
                    .build()
                    .parseSignedClaims(authToken);

            return true;
        }catch (MalformedJwtException e)
        {
            log.error("Invalid JWT token: {}", e.getMessage());
        }catch (ExpiredJwtException e)
        {
            log.error("JWT token is expired: {}", e.getMessage());
        }catch (UnsupportedJwtException e)
        {
            log.error("JWT token is unsupported: {}", e.getMessage());
        }catch (IllegalArgumentException e)
        {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
