"use client"

import Image from "next/image";
import { useXTerm } from 'react-xtermjs'
import { useEffect, useRef } from 'react'
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { handleCommand, navigateHistory } from '@/utils/commands';

const PROMPT = 'veyga@archlinux ~ # ';

export default function IndexPage() {
  
  const currentLineRef = useRef('');
  const cursorPosRef = useRef(0);
  const { instance, ref } = useXTerm();

  useEffect(() => {
      if (instance) {
        instance.write('\r\n' + PROMPT);
        
        const fitAddon = new FitAddon();
        const webLinksAddon = new WebLinksAddon();
        instance.loadAddon(webLinksAddon);
        instance.loadAddon(fitAddon);
        fitAddon.fit();
        
        instance.onData(async (data) => {
          const key = data.charCodeAt(0);
          
          if (data === '\x1b[A') { // Up arrow
            const historyCommand = navigateHistory('up', currentLineRef.current);
            // Clear current line
            instance.write('\x1b[2K\r' + PROMPT);
            currentLineRef.current = historyCommand;
            cursorPosRef.current = historyCommand.length;
            instance.write(historyCommand);
          } 
          else if (data === '\x1b[B') { // Down arrow
            const historyCommand = navigateHistory('down', currentLineRef.current);
            // Clear current line
            instance.write('\x1b[2K\r' + PROMPT);
            currentLineRef.current = historyCommand;
            cursorPosRef.current = historyCommand.length;
            instance.write(historyCommand);
          }
          else if (data === '\x1b[C') { // Right arrow
            if (cursorPosRef.current < currentLineRef.current.length) {
              cursorPosRef.current++;
              instance.write(data);
            }
          }
          else if (data === '\x1b[D') { // Left arrow
            if (cursorPosRef.current > 0) {
              cursorPosRef.current--;
              instance.write(data);
            }
          }
          else if (data === '\r') { // Enter key
            const command = currentLineRef.current.trim();
            currentLineRef.current = '';
            cursorPosRef.current = 0;
            await handleCommand(command, instance, PROMPT);
          } else if (data === '\x7F') { // Backspace character
            if (cursorPosRef.current > 0) {
              const before = currentLineRef.current.substring(0, cursorPosRef.current - 1);
              const after = currentLineRef.current.substring(cursorPosRef.current);
              currentLineRef.current = before + after;
              cursorPosRef.current--;
              
              // Redraw the line
              instance.write('\x1b[2K\r' + PROMPT + currentLineRef.current);
              
              // Move cursor to correct position
              if (cursorPosRef.current < currentLineRef.current.length) {
                instance.write(`\x1b[${PROMPT.length + cursorPosRef.current}G`);
              }
            }
          } else if (!data.startsWith('\x1b')) { // Ignore other escape sequences
            const before = currentLineRef.current.substring(0, cursorPosRef.current);
            const after = currentLineRef.current.substring(cursorPosRef.current);
            currentLineRef.current = before + data + after;
            cursorPosRef.current += data.length;
            
            // Redraw the line
            instance.write('\x1b[2K\r' + PROMPT + currentLineRef.current);
            
            // Move cursor to correct position
            if (cursorPosRef.current < currentLineRef.current.length) {
              instance.write(`\x1b[${PROMPT.length + cursorPosRef.current}G`);
            }
          }
        });
      }

  }, [instance]); 

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      <div className="flex-1 h-full overflow-hidden">
        <div ref={ref} className="h-full w-full overflow-hidden" />
      </div>
    </div>
  );
}