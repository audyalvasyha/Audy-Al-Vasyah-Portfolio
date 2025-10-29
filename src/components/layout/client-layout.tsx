'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const WebGLBackground = dynamic(
  () => import('@/components/ui/webgl-background'),
  { ssr: false }
);

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WebGLBackground />
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default ClientLayout;
