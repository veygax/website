"use client"

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { handleCommand, navigateHistory } from '@/utils/commands';

// hacky dynamic import since the terminal component tries to use the document object
const Terminal = dynamic(() => import('./components/Terminal'), { ssr: false });

const PROMPT = 'veyga@archlinux ~ # ';

export default function IndexPage() {
  const currentLineRef = useRef('');
  const cursorPosRef = useRef(0);
  
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      <div className="flex-1 h-full overflow-hidden">
        <Terminal 
          prompt={PROMPT}
          currentLineRef={currentLineRef}
          cursorPosRef={cursorPosRef}
          handleCommand={handleCommand}
          navigateHistory={navigateHistory}
        />
      </div>
    </div>
  );
}