import { getUser } from '@/lib/server/auth';
import NavbarClient from './NavbarClient';
import { cache } from 'react';

export default async function NavbarServer() {
  // No need to fetch user again as it's passed from layout
  return <NavbarClient />;
} 