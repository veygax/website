interface Command {
    name: string;
    description: string;
    aliases?: string[];
    execute: (terminal: any, args?: string[]) => Promise<void>;
  }
  
  const writePrompt = (terminal: any, prompt: string): void => {
    terminal.write('\r\n' + prompt);
  };
  
  let commandHistory: string[] = [];
  let historyPosition = -1;
  let tempCommand = '';
  
  export const addToHistory = (command: string): void => {
    // Don't add empty commands or duplicates of the last command
    if (command.trim() !== '' && (commandHistory.length === 0 || commandHistory[0] !== command)) {
      commandHistory.unshift(command);
      if (commandHistory.length > 50) {
        commandHistory.pop();
      }
    }
    historyPosition = -1;
    tempCommand = '';
  };
  
  export const navigateHistory = (direction: 'up' | 'down', currentInput: string): string => {
    if (historyPosition === -1) {
      tempCommand = currentInput;
    }
  
    if (direction === 'up') {
      if (historyPosition < commandHistory.length - 1) {
        historyPosition++;
        return commandHistory[historyPosition];
      }
    } else if (direction === 'down') {
      if (historyPosition > -1) {
        historyPosition--;
        return historyPosition === -1 ? tempCommand : commandHistory[historyPosition];
      }
    }
  
    return historyPosition === -1 ? tempCommand : commandHistory[historyPosition];
  };
  
  const commands: Record<string, Command> = {
    clear: {
      name: 'clear',
      description: 'clear the terminal screen',
      aliases: ['cls'],
      execute: async (terminal, args = []) => {
        terminal.reset();
      }
    },
    whoami: {
      name: 'whoami',
      description: 'print effective user name',
      aliases: ['who'],
      execute: async (terminal, args = []) => {
        try {
          const response = await fetch('/api/whoami', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ args }),
          });
  
          const result = await response.json();
          
          if (result.output) {
            terminal.writeln('\r\n' + result.output);
          }
        } catch (error) {
          console.error('Error executing whoami command:', error);
          terminal.writeln('\r\nError executing whoami command');
        }
      }
    },
    help: {
      name: 'help',
      description: 'list available commands',
      aliases: ['?'],
      execute: async (terminal, args = []) => {
        terminal.writeln('\r\nAvailable commands:');
        Object.values(commands).forEach(cmd => {
          const aliasText = cmd.aliases?.length ? ` (${cmd.aliases.join(', ')})` : '';
          terminal.writeln(`\r\n${cmd.name.padEnd(10)} - ${cmd.description}${aliasText}`);
        });
      }
    },
    history: {
      name: 'history',
      description: 'display command history',
      execute: async (terminal, args = []) => {
        if (commandHistory.length === 0) {
          terminal.writeln('\r\nNo command history');
        } else {
          terminal.writeln('\r\nCommand history:');
          commandHistory.forEach((cmd, index) => {
            terminal.writeln(`\r\n${index + 1}: ${cmd}`);
          });
        }
      }
    },
    'backend': {
      name: 'backend',
      description: 'interact with backend services',
      execute: async (terminal, args = []) => {
        // this should never run
        return;
      }
    }
  };
  
  const aliasMap = new Map<string, string>();
  Object.entries(commands).forEach(([name, cmd]) => {
    cmd.aliases?.forEach(alias => {
      aliasMap.set(alias.toLowerCase(), name);
    });
  });
  
  interface CommandResponse {
    output: string;
    success: boolean;
  }
  
  export const handleCommand = async (command: string, terminal: any, prompt: string): Promise<boolean> => {
    try {
      // Add valid command to history
      if (command.trim() !== '') {
        addToHistory(command);
      }
      
      if (command.startsWith('backend')) {
        const response = await fetch('/api/terminal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ command }),
        });
  
        const result: CommandResponse = await response.json();
        
        if (result.output) {
          terminal.writeln('\r\n' + result.output);
        }
        
        terminal.write('\r\n' + prompt);
        return result.success;
      } else {
        // Handle local commands
        if (command === 'clear' || command === 'cls') {
          terminal.reset();
          terminal.write('\r\n' + prompt);
          return true;
        }
        
        const [cmdName, ...args] = command.trim().split(/\s+/);
        const normalizedCmd = cmdName.toLowerCase();
        
        const cmdKey = commands[normalizedCmd] ? normalizedCmd : aliasMap.get(normalizedCmd);
        
        if (cmdKey && commands[cmdKey]) {
          await commands[cmdKey].execute(terminal, args);
          terminal.write('\r\n' + prompt);
          return true;
        } else {
          terminal.writeln(`\r\nCommand not found: ${cmdName}`);
          terminal.write('\r\n' + prompt);
          return false;
        }
      }
    } catch (error) {
      console.error('Error executing command:', error);
      terminal.writeln('\r\nError executing command');
      terminal.write('\r\n' + prompt);
      return false;
    }
  }; 