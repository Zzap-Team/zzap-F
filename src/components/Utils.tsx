import { Navigate } from 'react-router-dom';

type ProtectRouteProps = {
  when: boolean;
  to: string;
  children: React.ReactNode;
};

export function ProtectRoute({ when, to, children }: ProtectRouteProps) {
  return when ? <Navigate to={to} /> : children;
}
