import { Navigate } from 'react-router-dom';
import { NavigateProps } from 'react-router-dom';
import { store } from '../apollo';

interface ProtectRouteProps extends NavigateProps {
  when: boolean | (() => boolean);
  children: any;
}

export function ProtectRoute({ when, to, children }: ProtectRouteProps) {
  if (typeof when === 'function') when = when();
  return when ? <Navigate to={to} /> : children;
}
