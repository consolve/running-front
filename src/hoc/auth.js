import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function withAuth(SpecificComponent, option, Route = '/login/main') {
    function AuthenticationCheck(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(null);
        const navigate = useNavigate();
        const sessionid = window.localStorage.getItem('sessionid');

        useEffect(() => {
            // 로그인하지 않은 상태
            if (!sessionid) {
                if (option) {
                    // 로그인이 필요한 페이지에 접근 시도
                    navigate(Route);
                } else {
                    // 로그인하지 않아도 되는 페이지
                    setIsAuthenticated(true);
                }
            } else {
                // 로그인된 상태
                if (option === false) {
                    // 로그인한 유저가 접근할 수 없는 페이지 접근 시도
                    navigate(Route);
                } else {
                    // 로그인한 유저가 접근 가능
                    setIsAuthenticated(true);
                }
            }
        }, [navigate, sessionid]);

        if (isAuthenticated === null) {
            // 인증 확인 중에는 아무것도 렌더링하지 않거나 로딩 컴포넌트를 렌더링할 수 있음
            return null; // 또는 로딩 컴포넌트
        }

        return (
            <SpecificComponent {...props} />
        );
    }
    return AuthenticationCheck;
}
