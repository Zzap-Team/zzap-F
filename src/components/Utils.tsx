import { Navigate } from 'react-router-dom';
import { NavigateProps } from 'react-router-dom';

interface ProtectRouteProps extends NavigateProps {
  when: boolean;
  children: any;
}

export function ProtectRoute({ when, to, children }: ProtectRouteProps) {
  return when ? <Navigate to={to} /> : children;
}
